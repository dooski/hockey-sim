import React, {useState, useEffect, useRef} from "react";
import GameBox from "../components/GameBox"
import Symbol from "../components/TeamEmojis"
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
    const [ab1, setAB1] = useState("")
    const [ab2, setAB2] = useState("")
    const [sym1, setSYM1] = useState()
    const [sym2, setSYM2] = useState()
    const [psym, setPSYM] = useState()
    const [per, setPer] = useState(1)
    const [pos, setPos] = useState("Nobody")
    const [mes, setMes] = useState("Hello!")
    const [goal1, setGoal1] = useState(<Symbol abrv="MSC"/>)
    const [side1, setSide1] = useState(<Symbol abrv="MSC"/>)
    const [center, setCenter] = useState(<Symbol abrv="MSC"/>)
    const [side2, setSide2] = useState(<Symbol abrv="MSC"/>)
    const [goal2, setGoal2] = useState(<Symbol abrv="MSC"/>)

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
                setAB1(data.ab1)
                setAB2(data.ab2)
                setSYM1(symbolPicker(data.ab1))
                setSYM2(symbolPicker(data.ab2))
                setPer(data.per)
                setMes(data.mes)
                if (data.pos == 1) {setPos(t1C)} else if (data.pos == 2) {setPos(t2C)} else setPos("Nobody"); setPSYM("_")
                if (data.st == 0) {resetMap()}
                else if (data.st == 1) {
                    resetMap()
                    let sym = posSymbolPicker(data.pos)
                    setGoal1(sym)
                } else if (data.st == 2) {
                    resetMap()
                    let sym = posSymbolPicker(data.pos)
                    setSide1(sym)
                } else if (data.st == 3) {
                    resetMap()
                    let sym = posSymbolPicker(data.pos)
                    setCenter(sym)
                } else if (data.st == 4) {
                    resetMap()
                    let sym = posSymbolPicker(data.pos)
                    setSide2(sym)
                } else if (data.st == 5) {
                    resetMap()
                    let sym = posSymbolPicker(data.pos)
                    setGoal2(sym)
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
        setGoal1(<Symbol abrv="MSC"/>)
        setSide1(<Symbol abrv="MSC"/>)
        setCenter(<Symbol abrv="MSC"/>)
        setSide2(<Symbol abrv="MSC"/>)
        setGoal2(<Symbol abrv="MSC"/>)
    }

    function symbolPicker(team){
      return <Symbol abrv={team}/>
    }
    function posSymbolPicker(p){
      if (p == 1) {return sym1} else if (p == 2) {return sym2} else {return "_"}
    }
    useInterval(() => {
        UpdateGame();
      }, 2500);

    return (
        <div className="App">
            {t1 ? (
            <div className="game-box-container">
            <GameBox t1={t1} t2={t2} t1C={t1C} t2C={t2C} t1S={t1S} t2S={t2S} ab1={ab1} ab2={ab2} sym1={sym1} sym2={sym2} pos={pos} per={per} mes={mes} goal1={goal1} side1={side1} center={center} side2={side2} goal2={goal2}/>
            </div>
            ):(<div><i>loading. . . </i></div>)}</div>
    )
}

export default Home