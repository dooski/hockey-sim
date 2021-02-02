import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom"
import Home from "./pages/Home.js"
import Teams from "./pages/Teams.js"
import './App.css';

function App() {
  return (
    
    <Router>
      <div className="nav-spot">
        <div className="columns is-mobile">
      <div className="column">
        <p className="nav-title">Plond Hockey</p>
        <div className="nav-button-bar"><Link to="/" className="nav-button">The Plond</Link> <Link to="/teams" className="nav-button">Teams</Link></div>
        </div>
      </div>
      </div>
      <div className="App">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/teams" component={Teams}/>
      </Switch>
      </div>
      <div className="footer"></div>
    </Router>
    
  );
}

export default App;
