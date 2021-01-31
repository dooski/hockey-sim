const fs = require("fs")

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
function game(teams, timing) {
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
    beginning()
    periodPlay()
    async function periodPlay(){
        for (i = 0; i < 61; i++) {
        if (i == 60 && period !== 3) {
            endOfPeriod(period)
        } else if (i == 60 && period == 3) {
            finalScore()
        } else {
        onePlay()
        console.log(message)}
        packager() 
        await timer(timing)
    }}
    function beginning(){
        console.log(`

        AND NOW: The ${t1.info.team} host the ${t2.info.full} here in ${t1.info.city}!
        ------------
        ------------
        ---- ${t1.info.full}: ${t1.info.desc}
            LINEUP:
                LW: ${LW1.full}
                C: ${CE1.full}
                RW: ${RW1.full}
                LD: ${LD1.full}
                RD: ${RD1.full}
                GK: ${GK1.full}
        ------------
        ---- ${t2.info.full}: ${t2.info.desc}
            LINEUP:
                LW: ${LW2.full}
                C: ${CE2.full}
                RW: ${RW2.full}
                LD: ${LD2.full}
                RD: ${RD2.full}
                GK: ${GK2.full}
        ------------
        ------------
        TIME FOR PUCKDROP!
        
        `)
    }
    async function endOfPeriod(x){
        let periodName = "FIRST"
        if (x === 2) {periodName = "SECOND"}
        message = `END OF ${periodName} PERIOD.`
        period = period + 1
        possession = 0
        carrier = null
        stage = 0
        await timer(timing*1.1)
        periodPlay()
    }
    function finalScore(){
        message = `END OF THIRD PERIOD. GAME OVER. Final Score: ${t1.info.city} ${t1Score} - ${t2Score} ${t2.info.city}`
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
            message = `${target.full} gets it for ${t2.info.city}.`
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
            message = `${target.full} gets it for ${t1.info.city}.`
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
            message = `${carrier.full} loses the puck!`
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
            message = `${carrier.full} loses the puck!`
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
function packager () {
    if (carrier == null) {carrier = {full: ""}}
    let package = {
        t1: teams[0].info.full,
        t2: teams[1].info.full,
        t1C: teams[0].info.city,
        t2C: teams[1].info.city,
        t1S: t1Score,
        t2S: t2Score,
        per: period,
        st: stage,
        pos: possession,
        car: carrier.full,
        mes: message
    }
    var json = JSON.stringify(package)
    fs.writeFile('./gens/currentGame.json', json, 'utf8', function(err) {
        if (err) throw err;
        console.log(json)
    });
}
}


module.exports = {
    game
}