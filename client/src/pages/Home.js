import React, {useState, useEffect, useRef} from "react";
import GameBox from "../components/GameBox"
import API from '../utils/API'
import "../App.css"

function Home() {

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

    const [t1, setT1] = useState("")
    const [t2, setT2] = useState("")
    const [t1C, setT1C] = useState("")
    const [t2C, setT2C] = useState("")
    const [t1S, setT1S] = useState(0)
    const [t2S, setT2S] = useState(0)
    const [per, setPer] = useState(1)
    const [pos, setPos] = useState("Nobody")
    const [mes, setMes] = useState("Hello!")
    const [goal1, setGoal1] = useState("_")
    const [side1, setSide1] = useState("_")
    const [center, setCenter] = useState("_")
    const [side2, setSide2] = useState("_")
    const [goal2, setGoal2] = useState("_")

    function UpdateGame() {
         API.checkGame()
            .then((res) => {
                console.log(res)
                let data = res.data    
                setT1(data.t1)
                setT2(data.t2)
                setT1C(data.t1C)
                setT2C(data.t2C)
                setT1S(data.t1S)
                setT2S(data.t2S)
                setPer(data.per)
                setMes(data.mes)
                if (data.pos == 1) {setPos(t1C)} else if (data.pos == 2) {setPos(t2C)} else setPos("Nobody")
                if (data.st == 0) {resetMap()}
                else if (data.st == 1) {
                    resetMap()
                    setGoal1("x")
                } else if (data.st == 2) {
                    resetMap()
                    setSide1("x")
                } else if (data.st == 3) {
                    resetMap()
                    setCenter("x")
                } else if (data.st == 4) {
                    resetMap()
                    setSide2("x")
                } else if (data.st == 5) {
                    resetMap()
                    setGoal2("x")
                }
                if (data.mes.includes("GOAL") == true){
                  setGoal1("!!")
                  setSide1("!!")
                  setCenter("!!")
                  setSide2("!!")
                  setGoal2("!!")}
            })

    }

    function resetMap(){
        setGoal1("_")
        setSide1("_")
        setCenter("_")
        setSide2("_")
        setGoal2("_")
    }

    useInterval(() => {
        UpdateGame();
      }, 2500);

    return (
        <div className="App">
            {t1 ? (
            <GameBox t1={t1} t2={t2} t1C={t1C} t2C={t2C} t1S={t1S} t2S={t2S} pos={pos} per={per} mes={mes} goal1={goal1} side1={side1} center={center} side2={side2} goal2={goal2}/>
            ):(<div><i>loading. . . </i></div>)}</div>
    )
}

export default Home