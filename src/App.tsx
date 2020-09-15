import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';


const Button = styled.button`
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  height:30px; 
  width:100px;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  ${props => props.primary && css`
    background: palevioletred;
    color: white;
  `}
`;

const Input = styled.input`
  height:30px; 
  width:350px;
  margin: 0;
  position: absolute;
  top: 45%;
  left: 52%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  ${props => props.text}
`;


function App() {
  return (
    <div>
      <p class="welcomeTxt">Hi there! Welcome to your education showcase.</p>
      <p class="namePromptTxt">Type your name and click "Enter" below to begin!</p>
      <Input placeholder="Your name" class="nameInput"></Input>
      <Button>Enter</Button>
    </div>
  );
}

export default App;
