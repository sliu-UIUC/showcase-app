import React  from 'react';
import './App.css';
import { BrowserRouter, Route} from "react-router-dom";
import Home from './home';
import Education from './edu_info';

function App() {
    return (
      <BrowserRouter>
        <Route path='/' exact component={Home}></Route>
        <Route path='/education' exact component={Education}></Route>
      </BrowserRouter>
    );
}

export default App;
