import React, { useState, useEffect, useRef } from 'react';
import Symbol from "../TeamEmojis"

function TeamPage(props) {
    let players = props.players
    let team = props.team
    
    return (
        <div>
            {t1 !== "" ? (
                <div className="game-box">
                    <div className="columns no-margin">
                        <div className="column game-box-score-card is-6">
                            <Symbol abrv={team.abrv} alt="true"/>
                        </div>

                        <div className="column is-half no-margin">
                            <div className="game-box-rink-wrapper">
                                <div className="game-box-rink columns no-margin is-mobile">
                                    <p className="rink-abrv-right">{ab1}</p>
                                    <div className="rink-home-net right">
                                        [
                                        </div>
                                    <div className="rink-home-zone">
                                        {goal1}{side1}
                                    </div>
                                    <div className="rink-center">
                                        {center}
                                    </div>
                                    <div className="rink-away-zone">
                                        {side2}{goal2}
                                    </div>
                                    <div className="rink-away-net left">
                                        ]
                                    </div>
                                    <p className="rink-abrv-left">{ab2}</p>
                                </div>
                            </div>
                            <div className="game-box-message game-box-card"><h3>{mes}</h3></div>

                        </div>
                    </div>
                </div>) : (<div></div>)}
        </div>
    )
}

export default TeamPage