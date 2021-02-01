import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom"
import Home from "./pages/Home.js"
import Teams from "./pages/Teams.js"
import './App.css';
import API from "./utils/API"

function App() {
  return (
    
    <Router>
      <div className="nav-spot">
        <div className="columns is-mobile">
      <div className="column is-5 is-two-thirds-mobile">
        <p className="nav-title">Plond Hockey</p>
        </div>
      <div className="column is-7 is-one-third-mobile nav-button-wrapper">
      <Link to="/" className="nav-button">Game</Link> <Link to="/teams" className="nav-button">Teams</Link>
      </div>
      </div>
      </div>
      <div className="App">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/teams" component={Teams}/>
      </Switch>
      </div>
    </Router>
    
  );
}

export default App;
