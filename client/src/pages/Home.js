import React, {useState, useEffect, useRef} from "react";
import GameBox from "../components/GameBox"
import API from '../utils/API'
import "../App.css"

function Home() {
  const [games, setGames] = useState([])

    function useInterval(callback, delay) {
        const savedCallback = useRef();
      
        // Remember the latest callback.
        useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);
      
        // Set up the interval.
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
              setGames(data)})}

    useInterval(() => {
        UpdateGame();
      }, 2000);

    return (
        <div>
            {games !== null ? (
              games.map((game) => 
            <div className="game-box-container">
            <GameBox props={game}/>
            </div>)
            ):(<div><i>loading . . .</i></div>)}
        </div>
    )
}


export default Home