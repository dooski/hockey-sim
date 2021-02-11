const records = require("./seasonManagement")
const gameHandler = require("./gameManagement")
const handleGame = gameHandler.handleGame
const fs = require("fs")

let endOfGame = records.endOfGame

function rngWhole(z) {
    let x = Math.floor(Math.random() * z)
    return x
}

function rng(z) {
    let x = (Math.random() * z)
    return x
}

const timer = ms => new Promise(res => setTimeout(res, ms))

//stages represent where on the ice the play is taking place
// 0 = puck drop
// 1 = home net
// 2 = home third
// 3 = neutral zone
// 4 = away third
// 5 = away net
// possession:
// 0 = no one
// 1 = team 1
// 2 = team 2
function game(teams, timing, whichGame) {
    let t1 = teams[0]
    let t2 = teams[1]
    let t1Score = 0
    let t2Score = 0
    let currentLine1 = "line1"
    let currentLine2 = "line1"
    let LW1 = eval("t1.players." + currentLine1 + ".LW")
    let CE1 = eval("t1.players." + currentLine1 + ".CE")
    let RW1 = eval("t1.players." + currentLine1 + ".RW")
    let LD1 = eval("t1.players." + currentLine1 + ".LD")
    let RD1 = eval("t1.players." + currentLine1 + ".RD")
    let GK1 = eval("t1.players." + currentLine1 + ".GK")
    let LW2 = eval("t2.players." + currentLine2 + ".LW")
    let CE2 = eval("t2.players." + currentLine2 + ".CE")
    let RW2 = eval("t2.players." + currentLine2 + ".RW")
    let LD2 = eval("t2.players." + currentLine2 + ".LD")
    let RD2 = eval("t2.players." + currentLine2 + ".RD")
    let GK2 = eval("t2.players." + currentLine2 + ".GK")
    let offLine1 = [LW1, CE1, RW1]
    let defLine1 = [LD1, RD1]
    let offLine2 = [LW2, CE2, RW2]
    let defLine2 = [LD2, RD2]
    let period = 1
    let stage = 0
    let takingShot = false
    let havingFight = false
    let possession = null
    let carrier = null
    let message = ""
    var i = 0
    var oti = null
    console.log(offLine1)
    periodPlay()
    async function periodPlay() {
        for (i = 0; i < 61; i++) { 
            let fightChance = rngWhole(120)
            if (havingFight === true) {
                i--
            } else if (i == 60 && period !== 3) {
                endOfPeriod(period)
            } else if (i == 60 && period == 3 && t1Score !== t2Score) {
                finalScore("THIRD PERIOD")
            } else if (i == 60 && period == 3 && t1Score === t2Score) {
                endOfPeriod(period)
                overtime()
            } else if (fightChance === 69 && havingFight === false) {
                fight()
            } else {
                onePlay()
            }
            packager()
            await timer(timing)
        }
    }
    async function overtime() {
        for (oti = 0; oti < 1; oti) {
            if (t1Score !== t2Score) {
                finalScore("OVERTIME")
                oti = 1
            } else {
                onePlay()
            }
            packager()
            await timer(timing * 0.8)
        }
    }
    async function endOfPeriod(x) {
        let periodName = "FIRST"
        if (x === 2) { periodName = "SECOND" }
        if (x === 3) { periodName = "THIRD" }
        message = `END OF ${periodName} PERIOD.`
        period = period + 1
        if (period === 4) { period = "OVERTIME" }
        possession = 0
        carrier = null
        stage = 0
        await timer(timing * 1.4)
        if (period !== "OVERTIME") {
            periodPlay()
        }
    }
    function finalScore(x) {
        message = `END OF ${x}. GAME OVER. Final Score: ${t1.info.city} ${t1Score} - ${t2Score} ${t2.info.city}`
        endOfGame(t1, t2, t1Score, t2Score)
    }
    async function fight(){
        havingFight = true
        carrier = null
        possession = 0
        stage = 0
        let fighter1 = targetPicker(defLine1)
        let fighter2 = targetPicker(defLine2)
        let punch1 = rng((fighter1.stats.physical.fighting * 4) + (fighter2.stats.mental.respect))
        let punch2 = rng((fighter2.stats.physical.fighting * 4) + (fighter2.stats.mental.discipline))
        let winner = null
        let loser = null
        message = `Here we go, folks! ${fighter1.name} and ${fighter2.name} have thrown down the gloves for a fight!`
        if (punch1 <= punch2){
            console.log(RW1.stats.physical.speed)
            winner = fighter1
            loser = fighter2
            await timer(timing*1.1)
            message = `${t1.info.city}'s ${winner.name} beats ${loser.name}! The ${t1.info.team} are fired up!`
            RW1.stats.physical.speed++
            CE1.stats.physical.speed++
            LW1.stats.physical.speed++
            LD1.stats.offense.passing++
            RD1.stats.offense.passing++
            GK1.stats.goalkeeping.aura++
            console.log(RW1.stats.physical.speed)

        } else {
            console.log(RW2.stats.defense.forecheck)
            winner = fighter2
            loser = fighter1
            await timer(timing*1)
            message = `${t2.info.city}'s ${winner.name} beats ${loser.name}! The ${t2.info.team} are fired up!`
            RW2.stats.defense.forecheck++
            CE2.stats.defense.forecheck++
            LW2.stats.defense.forecheck++
            LD2.stats.offense.longShot++
            RD2.stats.offense.longShot++
            GK2.stats.goalkeeping.aura++
            console.log(RW2.stats.defense.forecheck)
        } await timer(timing*1)        
        message = `Back to the hockey.`
        await timer(timing*1)
        havingFight = false


    }
    function onePlay() {
        if (stage == 0) {
            puckdrop()
        } else if
            (stage == 1) {
            crash(1)
        } else if
            (stage == 2) {
            third(1)
        } else if
            (stage == 3) {
            let change1 = rngWhole(20)
            let change2 = rngWhole(20)
            if (change1 === 0 && change2 === 0) {
                changeLinesBoth()
                message = `Both teams switch lines.`
            } else if (change1 === 0) {
                changeLinesHome()
                message = `The ${t1.info.full} switch lines.`
            } else if(change2 === 0) {
                changeLinesAway()
                message = `The ${t2.info.full} switch lines.`
            } else 
            center()
        } else if
            (stage == 4) {
            third(2)
        } else if
            (stage == 5) {
            crash(2)
        }
        function changeLinesBoth(){
            changeLinesHome()
            changeLinesAway()
        }
        function changeLinesHome(){
            if (currentLine1 = "line1") {currentLine1 = "line2"} else (currentLine1 = "line1")
        }
        function changeLinesAway(){
            if (currentLine2 = "line1") {currentLine2 = "line2"} else (currentLine2 = "line1")
        }
        function puckdrop() {
            let p1 = rng(CE1.stats.physical.faceoff + 8)
            let p2 = rng(CE2.stats.physical.faceoff + 8)
            if (p2 <= p1) {
                possession = 1
                message = `${CE1.name} wins the face off for the ${t1.info.full}.`
                carrier = CE1
            }
            else {
                possession = 2
                message = `${CE2.name} wins the face off for the ${t2.info.full}.`
                carrier = CE2
            }
            stage = 3
        }
        function center() {
            if (possession == 1) {
                let off = rng((carrier.stats.offense.passing * 2) + (LW1.stats.offense.handling) + (CE1.stats.offense.handling) + (RW1.stats.offense.handling) + 30)
                let def = rng((LD2.stats.defense.forecheck) + (CE2.stats.defense.forecheck ) + (RD2.stats.defense.forecheck) + 30)
                if (def <= off) {
                    let target = targetPicker(offLine1)
                    message = `${carrier.name} passes it up to ${target.name} in ${t2.info.city}'s third.`
                    stage = 4
                    carrier = target
                }
                else {
                    let target = targetPicker(offLine2)
                    message = `${t2.info.city} has the puck.`
                    possession = 2
                    carrier = target
                }
            }
            else if (possession == 2) {
                let off = rng((carrier.stats.offense.passing * 2) + (LW2.stats.offense.handling) + (CE2.stats.offense.handling) + (RW2.stats.offense.handling) + 30)
                let def = rng((LD1.stats.defense.forecheck) + (CE1.stats.defense.forecheck) + (RD1.stats.defense.forecheck) + 30)
                if (def <= off) {
                    let target = targetPicker(offLine2)
                    message = `${carrier.name} passes it up to ${target.name} in ${t1.info.city}'s third.`
                    stage = 2
                    carrier = target
                }
                else {
                    let target = targetPicker(offLine1)
                    message = `${t1.info.city} has the puck.`
                    possession = 1
                    carrier = target
                }
            }
        }
        function third(side) {
            if (side == 2) {
                if (possession == 1) {
                    if (takingShot === true) {
                        let shot = rng(carrier.stats.offense.longShot * 3)
                        let def = rng((GK2.stats.goalkeeping.longBlock * 2) + (GK2.stats.mental.vision) + (LD2.stats.defense.blocking) + (RD2.stats.defense.blocking) + (t1Score))
                        if (def <= shot) {
                            message = `GOAL: ${t1.info.city}'s ${carrier.name} takes the shot and rockets it past ${GK2.name}!`
                            t1Score = t1Score + 1
                            possession = 0
                            stage = 0
                            carrier = null
                            takingShot = false
                        } else {
                            message = `${GK2.name} saves ${carrier.name}'s slapshot!`
                            possession = 2
                            stage = 5
                            carrier = GK2
                            takingShot = false
                            return
                        }
                    } else {
                        let z = rngWhole(12)
                        if (z > 1) {
                            let off = rng((carrier.stats.mental.vision * 2) + (carrier.stats.offense.passing) + (CE1.stats.physical.speed) + (RW1.stats.physical.speed) + (LW1.stats.physical.speed) + 30)
                            let def = rng((LD2.stats.defense.positioning) + (LD2.stats.defense.stick) + (RD2.stats.defense.positioning) + (RD2.stats.defense.stick) + (GK2.stats.goalkeeping.aura) + 30)
                            if (def <= off) {
                                let target = targetPicker(offLine1)
                                message = `${carrier.name} throws it to ${target.name} near the net!`
                                carrier = target
                                stage = 5
                                possession = 1
                            }
                            else {
                                let target = targetPicker(defLine2)
                                message = `The defense recovers the puck.`
                                possession = 2
                                carrier = target
                            }
                        } else {
                            let target = targetPicker(defLine1)
                            message = `${carrier.name} passes it to ${target.name} at the point!`
                            carrier = target
                            takingShot = true
                        }
                    }
                }
                else if (possession == 2) {
                    let off = rng((carrier.stats.offense.passing) + (LD2.stats.offense.handling) + (LD2.stats.physical.speed) + (RD2.stats.offense.handling) + (RD2.stats.physical.speed) + (CE2.stats.offense.handling) + 30)
                    let def = rng((LW1.stats.defense.forecheck) + (CE1.stats.defense.forecheck) + (RW1.stats.defense.forecheck) + 30)
                    if (def <= off) {
                        let target = targetPicker(offLine2)
                        message = `${carrier.name} passes it up to ${target.name} in the neutral zone.`
                        stage = 3
                        carrier = target
                    }
                    else {
                        let target = targetPicker(offLine1)
                        message = `${target.name} gets the puck back for ${t1.info.city}.`
                        possession = 1
                        carrier = target
                    }
                }}
                else if (side == 1) {
                    if (possession == 2) {
                        if (takingShot === true) {
                            let shot = rng(carrier.stats.offense.longShot * 3)
                            let def = rng((GK1.stats.goalkeeping.longBlock * 2) + (GK1.stats.mental.vision) + (LD1.stats.defense.blocking) + (RD1.stats.defense.blocking) + (t2Score))
                            if (def <= shot) {
                                message = `GOAL: ${t2.info.city}'s ${carrier.name} takes the shot and rockets it past ${GK1.name}!`
                                t2Score = t2Score + 1
                                possession = 0
                                stage = 0
                                carrier = null
                                takingShot = false
                            } else {
                                message = `${GK1.name} saves ${carrier.name}'s slapshot!`
                                possession = 1
                                stage = 1
                                carrier = GK2
                                takingShot = false
                                return
                            }
                        } else {
                            let z = rngWhole(12)
                            if (z > 2) {
                                let off = rng((carrier.stats.mental.vision * 2) + (carrier.stats.offense.passing) + (CE2.stats.physical.strength) + (RW2.stats.physical.strength) + (LW2.stats.physical.strength) + 30)
                                let def = rng((LD1.stats.defense.positioning) + (LD1.stats.physical.strength) + (RD1.stats.defense.positioning * 2) + (RD1.stats.physical.strength) + (GK1.stats.goalkeeping.aura) + 30)
                                if (def <= off) {
                                    let target = targetPicker(offLine2)
                                    message = `${carrier.name} throws it to ${target.name} near the net!`
                                    carrier = target
                                    stage = 1 
                                    possession = 2
                                }
                                else {
                                    let target = targetPicker(defLine1)
                                    message = `The defense recovers the puck.`
                                    possession = 1
                                    carrier = target
                                }
                            } else {
                                let target = targetPicker(defLine2)
                                message = `${carrier.name} passes it back to ${target.name} at the point!`
                                carrier = target
                                takingShot = true
                            }
                        }
                    }
                    else if (possession == 1) {
                        let off = rng((carrier.stats.offense.passing) + (LD1.stats.offense.handling) + (LD1.stats.physical.speed) + (RD1.stats.offense.handling) + (RD1.stats.physical.speed) + (CE1.stats.offense.handling) + 30)
                        let def = rng((LW2.stats.defense.forecheck) + (CE2.stats.defense.forecheck) + (RW2.stats.defense.forecheck) + 30)
                        if (def <= off) {
                            let target = targetPicker(offLine1)
                            message = `${carrier.name} passes it up to ${target.name} in the neutral zone.`
                            stage = 3
                            carrier = target
                        }
                        else {
                            let target = targetPicker(defLine2)
                            message = `${target.name} gets the puck back for ${t2.info.city}.`
                            possession = 2
                            carrier = target
                        }
                    }
                }
            }
            function crash(side) {
                if (side == 2) {
                    if (possession == 1) {
                        let shotType = rngWhole(2)
                        let shot = 0
                        let def = 0
                        if (shotType === 0) {
                            shot = rng((carrier.stats.offense.highShot * 2) + (carrier.stats.mental.memory) - (carrier.stats.mental.fear * 0.5) + 30)
                            def = rng((GK2.stats.goalkeeping.highBlock * 3) + (GK2.stats.physical.strength) + (t1Score) + 30)
                        }
                        else {
                            shot = rng((carrier.stats.offense.lowShot * 2) + (carrier.stats.mental.discipline) - (carrier.stats.mental.fear * 0.5) + 30)
                            def = rng((GK2.stats.goalkeeping.lowBlock * 3) + (GK2.stats.physical.speed) + (t1Score) + 30)

                        }
                        if (def <= shot) {
                            if (shotType === 0) { message = `GOAL: ${t1.info.city}'s ${carrier.name} scores top corner on ${GK2.name}!` }
                            else { message = `GOAL: ${t1.info.city}'s ${carrier.name} scores with a low shot on ${GK2.name}!` }
                            t1Score = t1Score + 1
                            possession = 0
                            stage = 0
                            carrier = null
                        }
                        else {
                            message = `${GK2.name} saves ${carrier.name}'s shot!`
                            possession = 2
                            carrier = GK2
                            return
                        }
                    }
                    else if (possession == 2) {
                        let off = rng((carrier.stats.goalkeeping.catching * 2) + (carrier.stats.offense.passing) + (LD2.stats.physical.strength) + (RD2.stats.physical.strength) + (CE2.stats.offense.handling) + 30)
                        let def = rng((LW1.stats.physical.speed) + (CE1.stats.physical.speed) + (RW1.stats.physical.speed) + 30)
                        if (def <= off) {
                            let target = targetPicker(defLine2)
                            message = `${carrier.name} gives it to ${target.name} who looks to break out.`
                            stage = 4
                            carrier = target
                        }
                        else {
                            let target = targetPicker(offLine1)
                            message = `${target.name} gets the puck back for ${t1.info.city}.`
                            possession = 1
                            stage = 4
                            carrier = target
                        }
                    }
                }
                else if (side == 1) {
                    if (possession == 2) {
                        let shotType = rngWhole(2)
                        let shot = 0
                        let def = 0
                        if (shotType === 0) {
                            shot = rng((carrier.stats.offense.highShot * 2) + (carrier.stats.offense.handling) - (carrier.stats.mental.fear * 0.5) + 30)
                            def = rng((GK1.stats.goalkeeping.highBlock * 3) + (GK1.stats.mental.discipline) + (t2Score) + 30)
                        }
                        else {
                            shot = rng((carrier.stats.offense.lowShot * 2) + (carrier.stats.physical.speed) - (carrier.stats.mental.fear * 0.5) + 30)
                            def = rng((GK1.stats.goalkeeping.lowBlock * 3) + (GK1.stats.mental.memory) + (t2Score) + 30)
                        }
                        if (def <= shot) {
                            if (shotType === 0) { message = `GOAL: ${t2.info.city}'s ${carrier.name} scores top corner on ${GK1.name}!` }
                            else { message = `GOAL: ${t2.info.city}'s ${carrier.name} scores with a low shot on ${GK1.name}!` }
                            t2Score = t2Score + 1
                            possession = 0
                            stage = 0
                            carrier = null
                        }
                        else {
                            message = `${GK1.name} saves ${carrier.name}'s shot!`
                            possession = 1
                            carrier = GK1
                            return
                        }
                    }
                    else if (possession == 1) {
                        let off = rng((carrier.stats.goalkeeping.catching * 2) + (carrier.stats.offense.passing) + (LD1.stats.physical.strength) + (RD1.stats.physical.strength) + (CE1.stats.offense.handling) + 30)
                        let def = rng((LW2.stats.physical.speed) + (CE2.stats.physical.speed) + (RW2.stats.physical.speed) + 30)
                        if (def <= off) {
                            let target = targetPicker(defLine1)
                            message = `${carrier.name} gives it to ${target.name} who looks to break out.`
                            stage = 2
                            carrier = target
                        }
                        else {
                            let target = targetPicker(offLine2)
                            message = `${target.name} gets the puck back for ${t2.info.city}.`
                            possession = 2
                            stage = 2
                            carrier = target
                        }
                    }
                }
            }
        }            
        
        function targetPicker(line) {
                let targets = line.filter(player => player !== carrier)
                let z = rngWhole(targets.length)
                return targets[z]
            }
        function timeConvert(x, y) {
            if (x === 0) { return "20:00" }
            else if (x == 1) { return "19:40" }
            else if (x == 2) { return "19:20" }
            else if (x == 3) { return "19:00" }
            else if (x == 4) { return "18:40" }
            else if (x == 5) { return "18:20" }
            else if (x == 6) { return "18:00" }
            else if (x == 7) { return "17:40" }
            else if (x == 8) { return "17:20" }
            else if (x == 9) { return "17:00" }
            else if (x == 10) { return "16:40" }
            else if (x == 11) { return "16:20" }
            else if (x == 12) { return "16:00" }
            else if (x == 13) { return "15:40" }
            else if (x == 14) { return "15:20" }
            else if (x == 15) { return "15:00" }
            else if (x == 16) { return "14:40" }
            else if (x == 17) { return "14:20" }
            else if (x == 18) { return "14:00" }
            else if (x == 19) { return "13:40" }
            else if (x == 20) { return "13:20" }
            else if (x == 21) { return "13:00" }
            else if (x == 22) { return "12:40" }
            else if (x == 23) { return "12:20" }
            else if (x == 24) { return "12:00" }
            else if (x == 25) { return "11:40" }
            else if (x == 26) { return "11:20" }
            else if (x == 27) { return "11:00" }
            else if (x == 28) { return "10:40" }
            else if (x == 29) { return "10:20" }
            else if (x == 30) { return "10:00" }
            else if (x == 31) { return "09:40" }
            else if (x == 32) { return "09:20" }
            else if (x == 33) { return "09:00" }
            else if (x == 34) { return "08:40" }
            else if (x == 35) { return "08:20" }
            else if (x == 36) { return "08:00" }
            else if (x == 37) { return "07:40" }
            else if (x == 38) { return "07:20" }
            else if (x == 39) { return "07:00" }
            else if (x == 40) { return "06:40" }
            else if (x == 41) { return "06:20" }
            else if (x == 42) { return "06:00" }
            else if (x == 43) { return "05:40" }
            else if (x == 44) { return "05:20" }
            else if (x == 45) { return "05:00" }
            else if (x == 46) { return "04:40" }
            else if (x == 47) { return "BLAZE" }
            else if (x == 48) { return "04:00" }
            else if (x == 49) { return "03:40" }
            else if (x == 50) { return "03:20" }
            else if (x == 51) { return "03:00" }
            else if (x == 52) { return "02:40" }
            else if (x == 53) { return "02:20" }
            else if (x == 54) { return "02:00" }
            else if (x == 55) { return "01:40" }
            else if (x == 56) { return "01:20" }
            else if (x == 57) { return "01:00" }
            else if (x == 58) { return "00:40" }
            else if (x == 59) { return "00:20" }
            else if (x == 60 || y == 1) { return "00:00" }
            else if (y == 0) { return "XX:XX" }
            else { return "??:??" }
        }
        function packager() {
            if (carrier == null) { carrier = { full: "" } }
            let package = {
                t1: teams[0].info.full,
                t2: teams[1].info.full,
                t1C: teams[0].info.city,
                t2C: teams[1].info.city,
                t1S: t1Score,
                t2S: t2Score,
                ab1: teams[0].info.abrv,
                ab2: teams[1].info.abrv,
                per: period,
                st: stage,
                pos: possession,
                car: carrier.name,
                mes: message,
                time: timeConvert(i, oti)
            }
            handleGame(package, whichGame)
        }
    }


    module.exports = {
        game
    }