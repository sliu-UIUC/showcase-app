import React , {Component} from 'react';
import './style.css';
// import styled from 'styled-components';



class Edu_info extends Component<{}, { name: string }> {
  constructor(props:any) {
    super(props); 
    this.state = {
      name: this.props.location.name
    }
  }

  render() {

    return (
      <div>
        <p>Welcome to {this.state.name}'s education page</p>
        <button>Add new education</button>
      </div>
    );
  }
}

export default Edu_info;