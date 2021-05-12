import React from "react"
import Emoji from "react-emoji-render"

function ModalRoster(props) {
    let players = props.props
    function calculateStat(stats, type) {
        let y = 0
        if (type === "off") {
            let x = stats.offense.snipe + stats.offense.snap + stats.offense.slap + (stats.offense.sauce * 2) + stats.offense.silk 
            y = Math.round((x*100)/6)
        } if (type === "def") {
            let x = stats.defense.annoy + stats.defense.rascal + stats.defense.thump + (stats.defense.choreography * 2) + stats.defense.blubber
            y = Math.round((x*100)/6)
        } if (type === "gk") {
            let x = stats.goalkeeping.swat + stats.goalkeeping.squish + stats.goalkeeping.sweetness + stats.goalkeeping.swallow + stats.goalkeeping.scream
            y = Math.round((x*100)/5)
        } if (type === "phy") {
            let x = (stats.physical.zoom * 2.5) + stats.physical.spinach + (stats.physical.tricks * 1.5) + stats.physical.darkness + stats.physical.love
            y = Math.round((x*100)/7)
        }
        return y
    }

    return (
        <section class="modal-card-body" style={{maxWidth:"1000px"}}>
            <div className="columns roster-list is-mobile">
                <div className="column is-6 is-mobile">
                    <p className="position-title">LINE 1</p>
                    <p style={{backgroundColor:"#202020"}}>{players.l1.a.name}</p>
                    <p>{players.l1.b.name}</p>
                    <p style={{backgroundColor:"#202020"}}>{players.l1.c.name}</p>
                    <br />
                    <p className="position-title">LINE 2</p>
                    <p style={{backgroundColor:"#202020"}}>{players.l2.a.name}</p>
                    <p>{players.l2.b.name}</p>
                    <p style={{backgroundColor:"#202020"}}>{players.l2.c.name}</p>
                    <br />
                    <p className="position-title">GOALIE</p>
                    <p style={{backgroundColor:"#202020"}}>{players.g.a.name}</p>
                    <br />
                    <p className="position-title">BENCH</p>
                    <p style={{backgroundColor:"#202020"}}>{players.b.a.name}</p>
                    <p>{players.b.b.name}</p>
                    <p style={{backgroundColor:"#202020"}}>{players.b.c.name}</p>
                </div>
                <div className="column is-2 is-mobile">
                    <p className="position-title">OFF</p>
                    <p style={{backgroundColor:"#202020"}}><b>{calculateStat(players.l1.a.stats, "off")}</b></p>
                    <b>{calculateStat(players.l1.b.stats, "off")}</b>
                    <p style={{backgroundColor:"#202020"}}><b>{calculateStat(players.l1.c.stats, "off")}</b></p>
                    <br />
                    <p className="position-title">OFF</p>
                    <p style={{backgroundColor:"#202020"}}><b>{calculateStat(players.l2.a.stats, "off")}</b></p>
                    <b>{calculateStat(players.l2.b.stats, "off")}</b>
                    <p style={{backgroundColor:"#202020"}}><b>{calculateStat(players.l2.c.stats, "off")}</b></p>
                    <br />
                    <p className="position-title">GK</p>
                    <p style={{backgroundColor:"#202020"}}><b>{calculateStat(players.g.a.stats, "gk")}</b></p>
                    <br />
                    <p className="position-title">OFF</p>
                    <p style={{backgroundColor:"#202020"}}><b>{calculateStat(players.b.a.stats, "off")}</b></p>
                    <b>{calculateStat(players.b.b.stats, "off")}</b>
                    <p style={{backgroundColor:"#202020"}}><b>{calculateStat(players.b.c.stats, "off")}</b></p>
                </div>
                <div className="column is-2 is-mobile">
                    <p className="position-title">DEF</p>
                    <b>
                    <p style={{backgroundColor:"#202020"}}>{calculateStat(players.l1.a.stats, "def")}</p>
                    <p>{calculateStat(players.l1.b.stats, "def")}</p>
                    <p style={{backgroundColor:"#202020"}}> {calculateStat(players.l1.c.stats, "def")}</p>
                    </b>
                    <br />
                    <p className="position-title">DEF</p>
                    <b><p style={{backgroundColor:"#202020"}}>{calculateStat(players.l2.a.stats, "def")}</p>
                    <b>{calculateStat(players.l2.b.stats, "def")}</b>
                    <p style={{backgroundColor:"#202020"}}><b>{calculateStat(players.l2.c.stats, "def")}</b></p>
                    </b><br />
                    <p className="position-title">DEF</p>
                    <p style={{backgroundColor:"#202020"}}><b>{calculateStat(players.g.a.stats, "def")}</b></p>
                    <br />
                    <p className="position-title">DEF</p>
                    <b><p style={{backgroundColor:"#202020"}}>{calculateStat(players.b.a.stats, "def")}</p>
                    <b>{calculateStat(players.b.b.stats, "def")}</b>
                    <p style={{backgroundColor:"#202020"}}><b>{calculateStat(players.b.c.stats, "def")}</b></p>
                    </b>
                    
                </div>
                <div className="column is-2 is-mobile">
                    <p className="position-title">GOALS</p>
                    <b>
                    <p style={{backgroundColor:"#202020"}}>{players.l1.a.stats.history.goals}</p>
                    <p>{players.l1.b.stats.history.goals}</p>
                    <p style={{backgroundColor:"#202020"}}> {players.l1.c.stats.history.goals}</p>
                    </b>
                    <br />
                    <p className="position-title">GOALS</p>
                    <b><p style={{backgroundColor:"#202020"}}>{players.l2.a.stats.history.goals}</p>
                    <b>{players.l2.b.stats.history.goals}</b>
                    <p style={{backgroundColor:"#202020"}}><b>{players.l2.c.stats.history.goals}</b></p>
                    </b><br />
                    <p className="position-title">SAVES</p>
                    <p style={{backgroundColor:"#202020"}}><b>{players.g.a.stats.history.saves}</b></p>
                    <br />
                    <p className="position-title">GOALS</p>
                    <b><p style={{backgroundColor:"#202020"}}>{players.b.a.stats.history.goals}</p>
                    <b>{players.b.b.stats.history.goals}</b>
                    <p style={{backgroundColor:"#202020"}}><b>{players.b.c.stats.history.goals}</b></p>
                    </b>
                </div>
            </div>
            <br />



            <br />


        </section>
    )
}

export default ModalRoster