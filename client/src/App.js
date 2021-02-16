import React, {useEffect, useState, useRef} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import Home from "./pages/Home.js"
import Games from "./pages/Games.js"
import Teams from "./pages/Teams.js"
import API from './utils/API'
import './App.css';


function App() {
  const [games, setGames] = useState([])

  function useInterval(callback, delay) {
    const savedCallback = useRef();
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  function UpdateGame() {
    API.checkGame()
      .then((res) => {
        let data = res.data[0]
        setGames(data)
      })
  }


  useInterval(() => {
    UpdateGame();
  }, 1000);

  
  return (
    <Router>
      <nav className="nav-spot">
        <div className="columns is-mobile">
          <div className="column">
            <Link to="/"><p className="nav-title">Plond Hockey</p></Link>
            <div className="nav-button-bar"><Link to="/plond" className="nav-button">The Plond</Link> <Link to="/teams" className="nav-button">The League</Link></div>
          </div>
        </div>
      </nav>
      <div className="nav-break"> </div>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
            </Route>
          <Route exact path="/plond">
            <Games props={games}/>
            </Route>
          <Route exact path="/teams">
            <Teams/>
            </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
