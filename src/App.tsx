import React  from 'react';
import './App.css';
import styled from 'styled-components';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from './Home/';


function App() {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Home}></Route>
    </BrowserRouter>

  );
}

export default App;
