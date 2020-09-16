import React , {Component} from 'react';
import './style.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

class Edu_info extends Component<{}, 
  { name: string, showModal: boolean, showSchoolList: boolean, 
      educations: string[], edu_details: any[], schoolNames:string[] }> {
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
      educations: [], 
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

    this.state.educations.push(data.schoolName);
    this.state.edu_details.push(data);
    this.handleCloseModal();
  }

  render() {

    return (
      <div id="main">
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
                            {this.state.schoolNames.map(name => {
                              return <option value={name}></option>
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
                Start Year: <input type="date" name="startY" min="2010-01-01" max="2020-9-16" required />
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
                Description: <input type="text" name="description"/>
              </label>
            </div>

            <div>
              <input type="submit" value="Save" />
            </div>
          </form>
        </Modal>

        {/* Side Panel */}
        <ul>
          {this.state.educations.map(value => {
            return <li key={value}>{value}</li> 
          })}
        </ul>

        {/* Main Panel */}
      </div>
    );
  }
}

export default Edu_info;