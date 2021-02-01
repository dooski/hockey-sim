import React, { useState } from 'react';


function GameBox(props) {
let goal1 = "_"
    

    return (
        <div className="game-box">
            <div className="columns">
                <div className="column game-box-card center is-7">
                <p className="game-box-team-name">
                    <div className="columns is-mobile game-box-team-name-a">
                    <div className="column is-2">{props.sym1} </div>
                    <div className="column is-8">{props.t1}: </div>
                    <div className="column is-2">{props.t1S} </div>
                    </div>
                    </p>            
                    <p className="game-box-team-name">
                    <div className="columns is-mobile">
                    <div className="column is-2">{props.sym2} </div>
                    <div className="column is-8">{props.t2}: </div>
                    <div className="column is-2">{props.t2S} </div>
                    </div>
                    </p> 
                    </div>
                    
                

                <div className="column is-half-tablet is-5 game-box-info" size={5}>
                    <p className="minor-text"><b>PERIOD {props.per}</b></p>
                    <mark className="clock"> {props.time} </mark>
                    <hr className="game-box-line"/>
                    <p className="minor-text">Possession: {props.pos}</p>
                    <br/>
                <div className="columns is-mobile">
                    <div className="column" size={2}>
                    <p className="minor-text right"> <b>{props.ab1}</b> </p>
                    </div>
                    <div className="column" size={8}>
                    <b className="game-box-rink">  [ {props.goal1} {props.side1} | {props.center} | {props.side2} {props.goal2} ]  </b>
                    </div>
                    <div className="column" size={2}>
                    <p className="minor-text left"> <b>{props.ab2}</b> </p>
                </div> 
                </div>
                
                </div>
            </div>
            <div className="game-box-message game-box-card"><h3>{props.mes}</h3></div>
            
        </div>
    )
}

export default GameBox