import React , {Component} from 'react';
import './style.css';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Input = styled.input`
  height:30px; 
  width:350px;
  margin: 0;
  position: absolute;
  top: 45%;
  left: 52%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;


class Home extends Component<{}, { name: string }> {
  constructor(props:any) {
    super(props); 
    this.updateName = this.updateName.bind(this);
    this.state = {
      name: ""
    }
  }

  updateName(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({name:e.target.value});
  }

  render() {
    return (
      <div>
        <p className="welcomeTxt">Hi there! Welcome to your education showcase.</p>
        <p className="namePromptTxt">Type your name and click "Enter" below to begin!</p>
        <Input placeholder="Your name"
               className="nameInput" 
               onChange={this.updateName}>  
        </Input>

        <Link to = {{ pathname: '/education', name: this.state.name}}>
          <button className="enterButton">Enter</button>
        </Link>
      </div>
    );
  }
}

export default Home;