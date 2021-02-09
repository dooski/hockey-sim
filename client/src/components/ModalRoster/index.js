import React from "react"
import Emoji from "react-emoji-render"

function ModalRoster(props) {
    let players = props.props
    let symbol = ["🟢⚪⚪⚪⚪", "🟢🟢⚪⚪⚪", "🟢🟢🟢⚪⚪", "🟢🟢🟢🟢⚪", "🟢🟢🟢🟢🟢"]
    function calculateStat(stats, position) {
        let y = 0
        if (position === "winger") {
            let x = (stats.offense.passing * 2) + (stats.offense.lowShot) + (stats.offense.highShot) + (stats.offense.handling) + (stats.defense.forecheck)
            y = Math.round(x / 6) - 1
        } if (position === "center") {
            let x = (stats.physical.faceoff * 2) + (stats.offense.passing * 2) + (stats.offense.lowShot) + (stats.offense.highShot) + (stats.offense.handling) + (stats.defense.forecheck)
            y = Math.round(x / 8) - 1
        } if (position === "defender") {
            let x = (stats.defense.positioning * 2) + (stats.defense.blocking) + (stats.defense.stick) + (stats.defense.forecheck) + (stats.defense.checking) + (stats.offense.longShot) + (stats.physical.fighting)
            y = Math.round(x / 8) - 1
        } if (position === "goalie") {
            let x = (stats.goalkeeping.lowBlock) + (stats.goalkeeping.highBlock) + (stats.goalkeeping.longBlock) + (stats.goalkeeping.aura)
            y = Math.round(x / 4) - 1
        }
        return symbol[y]
    }

    return (
        <section class="modal-card-body">
            <div className="columns roster-list is-mobile">
                <div className="column is-6 is-mobile">
                    <p className="position-title">Forwards</p>
                    <p>{players.LW.name}</p>
                    <p>{players.CE.name}</p>
                    <p>{players.RW.name}</p>
                    <br/>
                    <p className="position-title">Defenders</p>
                    <p>{players.LD.name}</p>
                    <p>{players.RD.name}</p>
                    <br/>
                    <p className="position-title">Goalies</p>
                    <p>{players.GK.name}</p>
                </div>
                <div className="column is-6 is-mobile">
                    <br />
                    <p>{calculateStat(players.LW.stats, "winger")}</p>
                    <p>{calculateStat(players.CE.stats, "center")}</p>
                    <p> {calculateStat(players.RW.stats, "winger")}</p>
                    <br />
                    <br/>
                    <p> {calculateStat(players.LD.stats, "defender")}</p>
                    <p> {calculateStat(players.RD.stats, "defender")}</p>
                    <br />
                    <br/>
                    <p> {calculateStat(players.GK.stats, "goalie")}</p>
                </div>
            </div>
            <br />



            <br />


        </section>
    )
}

export default ModalRoster