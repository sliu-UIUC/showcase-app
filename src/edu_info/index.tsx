import React , {Component} from 'react';
import './style.css';
import Modal from 'react-modal';
import { sortBy } from 'sort-by-typescript';


Modal.setAppElement('#root');

let monthMap = new Map([
  ['01', "January"], 
  ['02', "February"], 
  ['03', "Match"], 
  ['04', "April"], 
  ['05', "May"], 
  ['06', "June"], 
  ['07', "July"], 
  ['08', "August"], 
  ['09', "September"], 
  ['10', "October"], 
  ['11', "November"], 
  ['12', "December"]
]);

class Edu_info extends Component<{}, 
  { name: string, showModal: boolean, showSchoolList: boolean, edu_details: Array<any>, schoolNames:string[]}> {
  constructor(props:any) {
    super(props);
    
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.updateSchoolList = this.updateSchoolList.bind(this);
    this.submitForm = this.submitForm.bind(this);

    this.state = {
      name: this.props.location.name,
      showModal: false, 
      showSchoolList:false,
      edu_details: [], 
      schoolNames: []
    }
  }


  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  updateSchoolList(e: React.ChangeEvent<HTMLInputElement>) {
    var curr_text = e.target.value;
    this.setState({showSchoolList: false});
    this.setState({schoolNames:[]});
    fetch("http://universities.hipolabs.com/search?name="+curr_text)
      .then( function(response) {
        return response.json();
      })
      .then(myJson => {
        for(var i=0;i<Math.min(myJson.length, 10);++i) {
          let curSchool = myJson[i];
          this.state.schoolNames.push(curSchool.name+","+curSchool.country);
        }
        this.setState({showSchoolList:true});
    });
  }

  submitForm(e: React.SyntheticEvent) {
    e.preventDefault();
    const edu = e.target as typeof e.target & {
      schoolName: {value: string}; 
      degree: {value: string}; 
      major: {value: string}; 
      startY: {value: string}; 
      endY: {value: string}; 
      gpa: {value: string};
      description: {value: string};  
    }
    let data = {
      schoolName: edu.schoolName.value, 
      degree: edu.degree.value, 
      major: edu.major.value, 
      startY: edu.startY.value, 
      endY: edu.endY.value, 
      gpa: edu.gpa.value, 
      description : edu.description.value
    }
    this.state.edu_details.unshift(data);
    this.state.edu_details.sort(sortBy('endY'))
    this.state.edu_details.reverse();
    this.handleCloseModal();
  }

  parseDate(date:string) {
    let year = date.substring(0, 4);
    let month = date.substring(5,7)
    if(month==='09' && year==="2020") return "Present";
    return monthMap.get(month)+" "+date.substring(0, 4);
  }

  render() {

    return (
      <div>
        <p className="greetingTxt">Welcome to {this.state.name}'s education page</p>
        <button
          onClick={this.handleOpenModal}
          className="addEducationButton">
            Add new education
        </button>
        
        <Modal
          style={{
            overlay: { backgroundColor: 'rgba(102, 102, 102, 0.75)' },
            content: {top: '25%', left: '25%', right: '25%', bottom: '15%'}
          }}
          isOpen = {this.state.showModal}
        > 
          {/* Education Form */}
          <button className="exitButton" onClick={this.handleCloseModal}>X</button>  
          <form
            onSubmit={this.submitForm}
          >
            <div className="formDiv">
              <label>
                Name of School: <input 
                onChange ={this.updateSchoolList}
                
                type="text" name="schoolName" list="schools" required/>
              </label>
              <datalist id="schools">
                            <option value="DEFAULT" disabled></option>
                            {this.state.schoolNames.map((name, index) => {
                              return <option key={name+index} value={name} />
                            })}
              </datalist>
            </div>

            <div className="formDiv">
              <label>
                Degree: <input type="text" name="degree" required/>
              </label>
            </div>

            <div className="formDiv">
              <label>
                Field of Study: <input type="text" name="major" required/>
              </label>
            </div>

            <div className="formDiv">
              <label>
                Start Year: <input type="date" name="startY"  min="2010-01-01" max="2020-9-16" required />
              </label>
            </div>

            <div className="formDiv">
              <label>
                End Year (OR expected): <input type="date"  name="endY" min="2010-01-01" max="2024-12-31" required/>
              </label>
            </div>

            <div className="formDiv">
              <label>
                GPA: <input type="text" name="gpa" required/>
              </label>
            </div>

            <div className="formDiv">
              <label>
                Description: <textarea name="description"/>
              </label>
            </div>

            <div>
              <input type="submit" value="Save" />
            </div>
          </form>
        </Modal>

        {/* Side Panel */}
        <ul>
          {this.state.edu_details.map(value => {
            return <div key={value.schoolName}>{value.schoolName}</div> 
          })}
        </ul>

        {/* Main Panel */}
        <div>
          { this.state.edu_details.map((data, index)=> {
              return (
              <div className="eduDetail" key={data.schoolName+index}>
                <h3>{data.degree} {data.major} @ {data.schoolName}</h3>
                <h4>Cumulative GPA: {data.gpa}</h4>
                <p> {this.parseDate(data.startY)} - {this.parseDate(data.endY)} </p>
                <textarea rows={4} value={data.description} readOnly/>
              </div>
              )
          })
          }
        
        </div>
      </div>
    );
  }
}

export default Edu_info;