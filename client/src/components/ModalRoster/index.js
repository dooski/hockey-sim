import React from "react"
import Emoji from "react-emoji-render"

function ModalRoster(props) {
    let players = props.props
    let symbol = ["⚪⚫⚫⚫⚫", "⚪⚪⚫⚫⚫", "⚪⚪⚪⚫⚫", "⚪⚪⚪⚪⚫", "⚪⚪⚪⚪⚪"]
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
                <div className="column is-7 is-mobile">
                    <p className="position-title">Forwards</p>
                    <p>{players.line1.LW.name}</p>
                    <p>{players.line1.CE.name}</p>
                    <p>{players.line1.RW.name}</p>
                    <p>{players.line2.LW.name}</p>
                    <p>{players.line2.CE.name}</p>
                    <p>{players.line2.RW.name}</p>
                    <br />
                    <p className="position-title">Defenders</p>
                    <p>{players.line1.LD.name}</p>
                    <p>{players.line1.RD.name}</p>
                    <p>{players.line2.LD.name}</p>
                    <p>{players.line2.RD.name}</p>
                    <br />
                    <p className="position-title">Goalies</p>
                    <p>{players.line1.GK.name}</p>
                    <p>{players.line2.GK.name}</p>
                </div>
                <div className="column is-5 is-mobile">
                    <br />
                    <p>{calculateStat(players.line1.LW.stats, "winger")}</p>
                    <p>{calculateStat(players.line1.CE.stats, "center")}</p>
                    <p> {calculateStat(players.line1.RW.stats, "winger")}</p>
                    <p>{calculateStat(players.line2.LW.stats, "winger")}</p>
                    <p>{calculateStat(players.line2.CE.stats, "center")}</p>
                    <p> {calculateStat(players.line2.RW.stats, "winger")}</p>
                    <br />
                    <br />
                    <p> {calculateStat(players.line1.LD.stats, "defender")}</p>
                    <p> {calculateStat(players.line1.RD.stats, "defender")}</p>
                    <p> {calculateStat(players.line2.LD.stats, "defender")}</p>
                    <p> {calculateStat(players.line2.RD.stats, "defender")}</p>
                    <br />
                    <br />
                    <p> {calculateStat(players.line1.GK.stats, "goalie")}</p>
                    <p> {calculateStat(players.line2.GK.stats, "goalie")}</p>
                </div>
            </div>
            <br />



            <br />


        </section>
    )
}

export default ModalRoster