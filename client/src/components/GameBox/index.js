import React, { useState } from 'react';


function GameBox(props) {

    

    return (
        <div className="game-box">
            <h2>{props.t2}: {props.t2S}</h2>
            <i>@</i>
            <h2>{props.t1}: {props.t1S}</h2>
            <h3>Period {props.per}</h3>
            <br></br>
            <p>{props.pos} has the puck.</p>
            <br></br>
            <p><i>{props.t1C}</i> [ {props.goal1} {props.side1} | {props.center} | {props.side2} {props.goal2} ] <i>{props.t2C}</i></p>
            <br></br>
            <h2>{props.mes}</h2>
        </div>
    )
}

export default GameBox