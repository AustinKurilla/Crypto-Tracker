import React from 'react';
import './App.css';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import Home from './Home'
function App() {
  
  return (
    <Router>
      <Route path='/' component={Home}></Route>
    </Router>
  );   
}

export default App;
