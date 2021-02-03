import React, {useState, useEffect, useRef} from "react";
import GameBox from "../components/GameBox"
import API from '../utils/API'
import "../App.css"

function Home() {

  const [game1, setGame1] = useState(null)
  const [game2, setGame2] = useState(null)
  const [game3, setGame3] = useState(null)
  const [game4, setGame4] = useState(null)
  const [game5, setGame5] = useState(null)
  const [game6, setGame6] = useState(null)
  const [game7, setGame7] = useState(null)
  const [game8, setGame8] = useState(null)
  const [game9, setGame9] = useState(null)

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
              setGame1(data[0])
              setGame2(data[1])
              setGame3(data[2])
              setGame4(data[3])
              setGame5(data[4])
              setGame6(data[5])
              setGame7(data[6])
              setGame8(data[7])
              setGame9(data[8])})}


    useInterval(() => {
        UpdateGame();
      }, 2000);

    return (
        <div>
            {game1 !== null ? (
            <div className="game-box-container">
            <GameBox props={game1}/>
            </div>
            ):(<div><i>loading. . . </i></div>)}
            {game2 !== null ? (
            <div className="game-box-container">
            <GameBox props={game2}/>
            </div>
            ):(<div></div>)}
            {game3 !== null ? (
            <div className="game-box-container">
            <GameBox props={game3}/>
            </div>
            ):(<div></div>)}
            {game4 !== null ? (
            <div className="game-box-container">
            <GameBox props={game4}/>
            </div>
            ):(<div></div>)}
            {game5 !== null ? (
            <div className="game-box-container">
            <GameBox props={game5}/>
            </div>
            ):(<div></div>)}
            {game6 !== null ? (
            <div className="game-box-container">
            <GameBox props={game6}/>
            </div>
            ):(<div></div>)}
            {game7 !== null ? (
            <div className="game-box-container">
            <GameBox props={game7}/>
            </div>
            ):(<div></div>)}
            {game8 !== null ? (
            <div className="game-box-container">
            <GameBox props={game8}/>
            </div>
            ):(<div></div>)}
            {game9 !== null ? (
            <div className="game-box-container">
            <GameBox props={game9}/>
            </div>
            ):(<div></div>)}

        </div>
    )
}


export default Home