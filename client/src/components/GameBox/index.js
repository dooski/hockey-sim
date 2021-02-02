import React, { useState, useEffect, useRef } from 'react';
import Symbol from "../TeamEmojis"

function GameBox(props) {
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
    const [per, setPer] = useState(1)
    const [pos, setPos] = useState()
    const [mes, setMes] = useState()
    const [time, setTime] = useState("00:00")
    const [goal1, setGoal1] = useState(<Symbol abrv="MSC"/>)
    const [side1, setSide1] = useState(<Symbol abrv="MSC"/>)
    const [center, setCenter] = useState(<Symbol abrv="MSC"/>)
    const [side2, setSide2] = useState(<Symbol abrv="MSC"/>)
    const [goal2, setGoal2] = useState(<Symbol abrv="MSC"/>)

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

    useInterval(() => {
        UpdateScores();
    }, 2000)

    function UpdateScores(){
    let data = props.props
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
    console.log(data)
    setTime(data.time)
    if (data.pos === 1) {setPos(t1C)} else if (data.pos === 2) {setPos(t2C)} else setPos("Nobody");
    if (data.st === 0) {resetMap()}
    else if (data.st === 1) {
        resetMap()
        let sym = posSymbolPicker(data.pos)
        setGoal1(sym)
    } else if (data.st === 2) {
        resetMap()
        let sym = posSymbolPicker(data.pos)
        setSide1(sym)
    } else if (data.st === 3) {
        resetMap()
        let sym = posSymbolPicker(data.pos)
        setCenter(sym)
    } else if (data.st === 4) {
        resetMap()
        let sym = posSymbolPicker(data.pos)
        setSide2(sym)
    } else if (data.st === 5) {
        resetMap()
        let sym = posSymbolPicker(data.pos)
        setGoal2(sym)
    }
    if (data.mes.includes("GOAL") === true){
      setGoal1("!!")
      setSide1("!!")
      setCenter("!!")
      setSide2("!!")
      setGoal2("!!")}
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
if (p === 1) {return sym1} else if (p === 2) {return sym2} else {return "_"}
}

    return (
        <div>
        {t1 !== "" ? (
        <div className="game-box">
            <div className="columns">
                <div className="column game-box-card center is-7">
                <p className="game-box-team-name">
                    <div className="columns is-mobile game-box-team-name-a">
                    <div className="column is-2">{sym1} </div>
                    <div className="column is-8">{t1}: </div>
                    <div className="column is-2">{t1S} </div>
                    </div>
                    </p>            
                    <p className="game-box-team-name">
                    <div className="columns is-mobile">
                    <div className="column is-2">{sym2} </div>
                    <div className="column is-8">{t2}: </div>
                    <div className="column is-2">{t2S} </div>
                    </div>
                    </p> 
                    </div>
                    
                

                <div className="column is-half-tablet is-5 game-box-info" size={5}>
                    <p className="minor-text"><b>PERIOD {per}</b></p>
                    <mark className="clock"> {time} </mark>
                    <hr className="game-box-line"/>
                    <p className="minor-text">Possession: {pos}</p>
                    <br/>
                <div className="columns is-mobile">
                    <div className="column" size={2}>
                    <p className="minor-text right"> <b>{ab1}</b> </p>
                    </div>
                    <div className="column" size={8}>
                    <b className="game-box-rink">  [ {goal1} {side1} | {center} | {side2} {goal2} ]  </b>
                    </div>
                    <div className="column" size={2}>
                    <p className="minor-text left"> <b>{ab2}</b> </p>
                </div> 
                </div>
                
                </div>
            </div>
            <div className="game-box-message game-box-card"><h3>{mes}</h3></div>    
        </div> ) : (<div></div>)}
        </div>
    )
}

export default GameBox