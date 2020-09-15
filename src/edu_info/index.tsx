import React , {Component} from 'react';
import './style.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

class Edu_info extends Component<{}, 
  { name: string, showModal: boolean, educations: string[], edu_details: any[] }> {
  constructor(props:any) {
    super(props);
    
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

    this.state = {
      name: this.props.location.name,
      showModal: false, 
      educations: [], 
      edu_details: []
    }
  }

  
  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
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
          <form
            onSubmit={(e: React.SyntheticEvent) => {
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
              console.log(this.state.educations);
              this.handleCloseModal();
            }}
          >
            <div>
              <label>
                Name of School: <input type="text" name="schoolName" />
              </label>
            </div>

            <div>
              <label>
                Degree: <input type="text" name="degree" />
              </label>
            </div>

            <div>
              <label>
                Field of Study: <input type="text" name="major" />
              </label>
            </div>

            <div>
              <label>
                Start Year: <input type="text" name="startY" />
              </label>
            </div>

            <div>
              <label>
                End Year (OR expected): <input type="text" name="endY" />
              </label>
            </div>

            <div>
              <label>
                GPA: <input type="text" name="gpa" />
              </label>
            </div>

            <div>
              <label>
                Description: <input name="description"/>
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
            return <li>{value}</li> 
          })}
        </ul>

        {/* Main Panel */}
      </div>
    );
  }
}

export default Edu_info;