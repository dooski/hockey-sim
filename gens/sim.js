const records = require("./seasonManagement")
const gameHandler = require("./gameHandler")
const handleGame = gameHandler.handleGame
const fs = require("fs")

let endOfGame = records.endOfGame

function rng(z) {
    return Math.floor(Math.random() * z)
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
    let LW1 = t1.players.LW
    let CE1 = t1.players.C
    let RW1 = t1.players.RW
    let LD1 = t1.players.LD
    let RD1 = t1.players.RD
    let GK1 = t1.players.G
    let LW2 = t2.players.LW
    let CE2 = t2.players.C
    let RW2 = t2.players.RW
    let LD2 = t2.players.LD
    let RD2 = t2.players.RD
    let GK2 = t2.players.G
    let offLine1 = [LW1, CE1, RW1]
    let defLine1 = [LD1, RD1]
    let offLine2 = [LW2, CE2, RW2]
    let defLine2 = [LD2, RD2]
    let period = 1
    let stage = 0
    let possession = null
    let carrier = null
    let message = ""
    var i = 0
    var oti = null
    periodPlay()
    async function periodPlay(){
        for (i = 60; i < 61; i++) {
        if (i == 60 && period !== 3) {
            endOfPeriod(period)
        } else if (i == 60 && period == 3 && t1Score !== t2Score) {
            finalScore("THIRD PERIOD")
        } else if (i == 60 && period == 3 && t1Score === t2Score) {
            endOfPeriod(period)
            overtime()
        } else {
        onePlay()
        }
        packager() 
        await timer(timing)
    }}
    async function overtime(){
        for (oti = 0; oti < 1; oti) {
            if (t1Score !==  t2Score) {
                finalScore("OVERTIME")
                oti = 1
            } else {
                onePlay()
            }
            packager()
            await timer(timing*0.8)
        }
    }
    async function endOfPeriod(x){
        let periodName = "FIRST"
        if (x === 2) {periodName = "SECOND"}
        if (x === 3) {periodName = "THIRD"}
        message = `END OF ${periodName} PERIOD.`
        period = period + 1
        if (period === 4){period = "OVERTIME"}
        possession = 0
        carrier = null
        stage = 0
        await timer(timing*1.4)
        if (period !== "OVERTIME"){
        periodPlay()}
    }
    function finalScore(x){
        message = `END OF ${x}. GAME OVER. Final Score: ${t1.info.city} ${t1Score} - ${t2Score} ${t2.info.city}`
        endOfGame(t1, t2, t1Score, t2Score)
    }
    function onePlay(){
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
        center()
    } else if
    (stage == 4) {
        third(2)
    } else if
    (stage == 5){
        crash(2)
}
function puckdrop() {
    let p1 = CE1.stats.handling*10
    let p2 = CE2.stats.handling*10
    let z = rng((p1+p2))
    if (z <= p1){
        possession = 1
        message = `${CE1.full} wins the face off for the ${t1.info.full}.`
        carrier = CE1
    }
    else {
        possession = 2
        message = `${CE2.full} wins the face off for the ${t2.info.full}.`
        carrier = CE2
        }
    stage = 3
    }
function center() {
    if (possession == 1) {
        let off = (carrier.stats.passing*10) + (LW1.stats.handling*9) + (CE1.stats.handling*9) + (RW1.stats.handling*9)
        let def = (LW2.stats.positioning*10) + (CE2.stats.positioning*10) + (RW2.stats.positioning*10)
        let z = rng((off+def)*1.2)
        if (z <= off) {
            let target = targetPicker(offLine1)
            message = `${carrier.full} passes it up to ${target.full} in ${t2.info.city}'s third.`
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
        let off = (carrier.stats.passing*10) + (LW2.stats.handling*9) + (CE2.stats.handling*9) + (RW2.stats.handling*9)
        let def = (LW1.stats.positioning*10) + (CE1.stats.positioning*10) + (RW1.stats.positioning*10)
        let z = rng((off+def)*1.2)
        if (z <= off) {
            let target = targetPicker(offLine2)
            message = `${carrier.full} passes it up to ${target.full} in ${t1.info.city}'s third.`
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
        let off = (carrier.stats.passing*10) +(LW1.stats.handling*7) + (CE1.stats.handling*7) + (RW1.stats.shooting*7)
        let def = (LD2.stats.positioning*10) + (LD2.stats.checking*5) + (RD2.stats.blocking*8) + (RD2.stats.checking*6)
        let z = rng((off+def)*1)
            if (z <= off) {
            let target = targetPicker(offLine1)
            message = `${carrier.full} throws it to ${target.full} near the net!`
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
    } 
    else if (possession == 2) {
        let off = (carrier.stats.passing*10) + (LD2.stats.handling*7) + (RD2.stats.handling*7) + (CE2.stats.handling*7)
        let def = (LW1.stats.checking*10) + (CE1.stats.positioning*10) + (RW1.stats.checking*10)
        let z = rng((off+def)*1.2)
        if (z <= off) {
            let target = targetPicker(offLine2)
            message = `${carrier.full} passes it up to ${target.full} in the neutral zone.`
            stage = 3
            carrier = target
        }
        else {
            let target = targetPicker(offLine1)
            message = `${target.full} gets the puck back for ${t1.info.city}.`
            possession = 1
            carrier = target
        }
    }
    }
    else if (side == 1)
    {if (possession == 2) {
        let off = (carrier.stats.passing*10) + (LW2.stats.handling*7) + (CE2.stats.handling*7) + (RW2.stats.shooting*7)
        let def = (LD1.stats.positioning*10) + (LD1.stats.checking*5) + (RD1.stats.blocking*8) + (RD1.stats.checking*6)
        let z = rng((off+def)*1)
        if (z <= off) {
        let target = targetPicker(offLine2)
        message = `${carrier.full} throws it to ${target.full} near the net!`
        stage = 1
        possession = 2
        carrier = target
    }
        else {
            let target = targetPicker(defLine1)
            message = `The defense recovers the puck.`
            possession = 1
            carrier = target
        }
    } 
    else if (possession == 1) {
        let off = (carrier.stats.passing*10) + (LD1.stats.handling*7) + (RD1.stats.handling*7) + (CE1.stats.handling*7)
        let def = (LW2.stats.checking*10) + (CE2.stats.positioning*10) + (RW2.stats.checking*10)
        let z = rng((off+def)*1.2)
        if (z <= off) {
            let target = targetPicker(offLine1)
            message = `${carrier.full} passes it up to ${target.full} in the neutral zone.`
            stage = 3
            carrier = target
        }
        else {
            let target = targetPicker(defLine2)
            message = `${target.full} gets the puck back for ${t2.info.city}.`
            possession = 2
            carrier = target
        }
    }}
}
function crash(side) {
    if (side == 2) {
    if (possession == 1) {
        let shot = (carrier.stats.shooting*25) + (carrier.stats.speed*5)
        let def = GK2.stats.goalkeeping*30
        let z = rng((shot+def)*1.2)
        if (z <= shot) {
            message = `GOAL: ${t1.info.city}'s ${carrier.full} scores on ${GK2.full}!`
            t1Score = t1Score + 1
            possession = 0
            stage = 0
            carrier = null
        }
        else {
            message = `${GK2.full} saves ${carrier.full}'s shot!`
            possession = 2
            carrier = GK2
            return
        }
    } 
    else if (possession == 2) {
        let off = (carrier.stats.passing*10) + (LD2.stats.handling*7) + (RD2.stats.handling*7) + (CE2.stats.handling*7)
        let def = (LW1.stats.speed*10) + (CE1.stats.positioning*10) + (RW1.stats.speed*10)
        let z = rng((off+def)*0.8)
        if (z <= off) {
            let target = targetPicker(defLine2)
            message = `${carrier.full} gives it to ${target.full} who looks to break out.`
            stage = 4
            carrier = target
        }
        else {
            let target = targetPicker(offLine1)
            message = `${target.full} gets the puck back for ${t1.info.city}.`
            possession = 1
            stage = 4
            carrier = target
        }
    }
    }
    else if (side == 1)
    {
        if (possession == 2) {
            let shot = (carrier.stats.shooting*25) + (carrier.stats.speed*5)
            let def = GK1.stats.goalkeeping*30
            let z = rng((shot+def)*1.2)
            if (z <= shot) {
                message = `GOAL: ${t2.info.city}'s ${carrier.full} scores on ${GK1.full}!`
                t2Score = t2Score + 1
                possession = 0
                stage = 0
                carrier = null
            }
            else {
                message = `${GK1.full} saves ${carrier.full}'s shot!`
                possession = 1
                carrier = GK1
                return
            }
        } 
        else if (possession == 1) {
            let off = (carrier.stats.passing*10) + (LD1.stats.handling*7) + (RD1.stats.handling*7) + (CE1.stats.handling*7)
            let def = (LW2.stats.speed*10) + (CE2.stats.positioning*10) + (RW2.stats.speed*10)
            let z = rng((off+def)*0.8)
            if (z <= off) {
                let target = targetPicker(defLine1)
                message = `${carrier.full} gives it to ${target.full} who looks to break out.`
                stage = 2
                carrier = target
            }
            else {
                let target = targetPicker(offLine2)
                message = `${target.full} gets the puck back for ${t2.info.city}.`
                possession = 2
                stage = 2
                carrier = target
            }
        }
        }
    }

        function targetPicker(line){
    let targets = line.filter(player => player !== carrier)
    let z = rng(targets.length)
    return targets[z]
}
}
function timeConvert(x, y){
    if (x === 0){return "20:00"}
    else if (x == 1){return "19:40"}
    else if (x == 2){return "19:20"}
    else if (x == 3){return "19:00"}
    else if (x == 4){return "18:40"}
    else if (x == 5){return "18:20"}
    else if (x == 6){return "18:00"}
    else if (x == 7){return "17:40"}
    else if (x == 8){return "17:20"}
    else if (x == 9){return "17:00"}
    else if (x == 10){return "16:40"}
    else if (x == 11){return "16:20"}
    else if (x == 12){return "16:00"}
    else if (x == 13){return "15:40"}
    else if (x == 14){return "15:20"}
    else if (x == 15){return "15:00"}
    else if (x == 16){return "14:40"}
    else if (x == 17){return "14:20"}
    else if (x == 18){return "14:00"}
    else if (x == 19){return "13:40"}
    else if (x == 20){return "13:20"}
    else if (x == 21){return "13:00"}
    else if (x == 22){return "12:40"}
    else if (x == 23){return "12:20"}
    else if (x == 24){return "12:00"}
    else if (x == 25){return "11:40"}
    else if (x == 26){return "11:20"}
    else if (x == 27){return "11:00"}
    else if (x == 28){return "10:40"}
    else if (x == 29){return "10:20"}
    else if (x == 30){return "10:00"}
    else if (x == 31){return "09:40"}
    else if (x == 32){return "09:20"}
    else if (x == 33){return "09:00"}
    else if (x == 34){return "08:40"}
    else if (x == 35){return "08:20"}
    else if (x == 36){return "08:00"}
    else if (x == 37){return "07:40"}
    else if (x == 38){return "07:20"}
    else if (x == 39){return "07:00"}
    else if (x == 40){return "06:40"}
    else if (x == 41){return "06:20"}
    else if (x == 42){return "06:00"}
    else if (x == 43){return "05:40"}
    else if (x == 44){return "05:20"}
    else if (x == 45){return "05:00"}
    else if (x == 46){return "04:40"}
    else if (x == 47){return "BLAZE"}
    else if (x == 48){return "04:00"}
    else if (x == 49){return "03:40"}
    else if (x == 50){return "03:20"}
    else if (x == 51){return "03:00"}
    else if (x == 52){return "02:40"}
    else if (x == 53){return "02:20"}
    else if (x == 54){return "02:00"}
    else if (x == 55){return "01:40"}
    else if (x == 56){return "01:20"}
    else if (x == 57){return "01:00"}
    else if (x == 58){return "00:40"}
    else if (x == 59){return "00:20"}
    else if (x == 60){return "00:00"}
    else if (y == 0){return "XX:XX"}
    else {return "??:??"}
}
function packager () {
    if (carrier == null) {carrier = {full: ""}}
    let fileName = "./gens/games/" + whichGame + ".json"
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
        car: carrier.full,
        mes: message,
        time: timeConvert(i, oti)
    }
    // var json = JSON.stringify(package)
    // fs.writeFile(fileName, json, 'utf8', function(err) {
    //     if (err) throw err;
    // });
    handleGame(package, whichGame)
}
}


module.exports = {
    game
}