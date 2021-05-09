const gameHandler = require("./gameManagement")
const handleGame = gameHandler.handleGame


let endOfGame = gameHandler.endOfGame

function rngWhole(z) {
    let x = Math.floor(Math.random() * z)
    return x
}

function rng(z) {
    let x = ((Math.random() * z) + z)
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
    let t1 = {
        info: {
            full: teams[0].info.full,
            city: teams[0].info.city,
            team: teams[0].info.team,
            abrv: teams[0].info.abrv
        },
        lines: {
            0: teams[0].players.l1,
            1: teams[0].players.l2,
            2: teams[0].players.g.a
        },
        zz: 0,
        score: 0,
        mod: 0.5,
        firedUp: {
            status: false,
            time: 99
        },
        iced: {
            status: false,
            player: null,
            time: 99
        }

    }
    let t2 = {
        info: {
            full: teams[1].info.full,
            city: teams[1].info.city,
            team: teams[1].info.team,
            abrv: teams[1].info.abrv
        },
        lines: {
            0: teams[1].players.l1,
            1: teams[1].players.l2,
            2: teams[1].players.g.a
        },
        zz: 0,
        score: 0,
        mod: 0.5,
        firedUp: {
            status: false,
            time: 99
        },
        iced: {
            status: false,
            player: null,
            time: 99
        }
    }
    var posT = t1
    var nosT = t2
    let period = 1
    let stage = 0
    let takingShot = false
    let havingFight = false
    let possession = null
    let carrier = null
    let message = ""
    var i = 0
    var oti = null
    periodPlay()
    async function periodPlay() {
        for (i = 0; i < 61; i++) {
            let fightChance = rngWhole(80)
            if (posT.firedUp.status === true) {
                posT.firedUp.time++
                fireCheck(posT.firedUp.time, posT)
            }
            if (nosT.firedUp.status === true) {
                nosT.firedUp.time++
                fireCheck(nosT.firedUp.time, nosT)
            }
            if (havingFight === true) {
                i--
            }
             else if (i == 60 && period !== 3) {
                endOfPeriod(period)
            } else if (i == 60 && period == 3 && t1.score !== t2.score) {
                finalScore("THIRD PERIOD")
            } else if (i == 60 && period == 3 && t1.score === t2.score) {
                endOfPeriod(period)
                overtime()
            } else if (fightChance === 1 && havingFight === false && stage !== 1 && stage !== 5 && stage !== 0 && takingShot === false && posT.firedUp.status === false && nosT.firedUp.status === false) {
                fight()
            } else {
                pressure(i)
                onePlay()
            }
            packager()
            if (stage == 0) {
                await timer(timing)
            }
            await timer(timing)
        }
    }
    async function overtime() {
        for (oti = 0; oti < 1; oti) {
            if (t1.score !== t2.score) {
                finalScore("OVERTIME")
                oti = 1
            } else {
                onePlay()
            }
            packager()
            await timer(timing * 0.08)
        }
    }
    async function endOfPeriod(x) {
        let periodName = "FIRST"
        t1.zz = 0
        t2.zz = 0
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
        message = `END OF ${x}. GAME OVER. Final Score: ${t1.info.city} ${t1.score} - ${t2.score} ${t2.info.city}`
        endOfGame(t1, t2, t1.score, t2.score)
    }
    async function fight() {
        havingFight = true
        carrier = null
        possession = 0
        stage = 0
        let fighter1 = targetPicker("pos")
        let fighter2 = targetPicker("nos")
        let punch1 = rng((fighter1.stats.physical.darkness * 4) + (nosT.score - posT.score))
        let punch2 = rng((fighter2.stats.physical.darkness * 4) + (posT.score - nosT.score))
        let winner = null
        let loser = null
        message = `Gloves are off! ${fighter1.name} and ${fighter2.name} are playing rock, paper, scissors!`
        if (punch1 <= punch2) {
            winner = fighter1
            loser = fighter2
            await timer(timing * 1)
            message = `${posT.info.city}'s ${winner.name} beats ${loser.name}! The ${posT.info.team} are fired up!`
            await timer(timing * 1)
            message = `Back to the hockey.`
            fireUp("posT")
            await timer(timing * 1)
            havingFight = false
        } else {
            winner = fighter2
            loser = fighter1
            await timer(timing * 1)
            message = `${nosT.info.city}'s ${winner.name} beats ${loser.name}! The ${nosT.info.team} are fired up!`
            await timer(timing * 1)
            message = `Back to the hockey.`
            fireUp("nosT")
            await timer(timing * 1)
            havingFight = false
        }
    }
    function onePlay() {
        switch (stage) {
            case 0:
                puckdrop()
                break;
            case 1:
                crash(1)
                break;
            case 2:
                third(1)
                break;
            case 3:
                let change1 = rngWhole(20)
                let change2 = rngWhole(20)
                if (change1 === 0 && change2 === 0) {
                    changeLinesBoth()
                    message = `Both teams switch lines.`
                } else if (change1 === 0) {
                    changeLinesHome()
                    message = `The ${t1.info.full} switch lines.`
                } else if (change2 === 0) {
                    changeLinesAway()
                    message = `The ${t2.info.full} switch lines.`
                } else center()
                break;
            case 4:
                third(2)
                break;
            case 5:
                crash(2)
                break;
        }
        function changeLinesBoth() {
            changeLinesHome()
            changeLinesAway()
        }
        function changeLinesHome() {
            switch (t1.zz) {
                case 0:
                    t1.zz = 1
                    break;
                case 1:
                    t1.zz = 0
                    break;
            }
        }
        function changeLinesAway() {
            switch (t2.zz) {
                case 0:
                    t2.zz = 1
                    break;
                case 1:
                    t2.zz = 0
                    break;
            }
        }
        async function puckdrop() {
            let taker1 = targetPicker("t1")
            let taker2 = targetPicker("t2")
            let p1 = rng(taker1.stats.physical.tricks + t1.mod)
            let p2 = rng(taker2.stats.physical.tricks + t2.mod)
            let winner = null
            if (p2 <= p1) {
                posT = t1
                nosT = t2
                possession = 1
                winner = taker1
            } else {
                posT = t2
                nosT = t1
                possession = 2
                winner = taker2
            }
            message = `${t1.info.city}'s ${taker1.name} and ${t2.info.city}'s ${taker2.name} line up for the faceoff.`
            await timer(timing * 1)
            carrier = posT.lines[posT.zz].a
            message = `${winner.name} wins the puck for the ${posT.info.full}.`
            stage = 3
            packager()
        }
        function center() {
            let off = rng((carrier.stats.offense.sauce * 2) + (posT.lines[posT.zz].b.stats.offense.silk) +
                (posT.lines[posT.zz].a.stats.offense.silk) + (posT.lines[posT.zz].c.stats.offense.silk) + posT.mod)
            let def = rng((nosT.lines[nosT.zz].c.stats.defense.annoy) + (nosT.lines[nosT.zz].a.stats.defense.annoy) +
                (nosT.lines[nosT.zz].b.stats.defense.annoy) + nosT.mod)
            if (def <= off) {
                let target = targetPicker("pos")
                message = `${carrier.name} passes it up to ${target.name} in ${nosT.info.city}'s third.`
                if (possession === 1) { stage = 4 } else if (possession === 2) { stage = 2 }
                carrier = target
                endPlay("same")
            }
            else {
                let target = targetPicker("nos")
                message = `${nosT.info.city} has the puck.`
                carrier = target
                endPlay("switch")
            }
        }
        function third() {
            if (stage === 4 && possession === 1 || stage === 2 && possession === 2) {
                if (takingShot === true) {
                    let shot = rng(carrier.stats.offense.slap * 3)
                    let def = rng((nosT.lines[2].stats.goalkeeping.sweetness * 2) +
                        (nosT.lines[nosT.zz].c.stats.defense.blubber) + (nosT.lines[nosT.zz].b.stats.defense.blubber) + nosT.mod)
                    if (def <= shot) {
                        message = `GOAL: ${posT.info.city}'s ${carrier.name} takes the shot and rockets it past ${nosT.lines[2].name}!`
                        posT.score++
                        setScore()
                        possession = 0
                        stage = 0
                        carrier = null
                        takingShot = false
                    } else {
                        message = `${nosT.lines[2].name} saves ${carrier.name}'s slapshot!`
                        if (stage === 4) { stage = 5 } else if (stage === 2) { stage = 1 }
                        carrier = nosT.lines[2]
                        takingShot = false
                        endPlay("switch")
                        return
                    }
                } else {
                    let z = rngWhole(12)
                    if (z > 1) {
                        let off = rng((carrier.stats.offense.sauce) +
                            (posT.lines[posT.zz].a.stats.physical.zoom) + (posT.lines[posT.zz].c.stats.physical.zoom) + (posT.lines[posT.zz].b.stats.physical.zoom) + posT.mod)
                        let def = rng((nosT.lines[nosT.zz].c.stats.defense.choreography) + (nosT.lines[nosT.zz].c.stats.defense.rascal) +
                            (nosT.lines[nosT.zz].b.stats.defense.choreography) + (nosT.lines[nosT.zz].b.stats.defense.rascal) + (nosT.lines[2].stats.goalkeeping.scream * 2) + nosT.mod)
                        if (def <= off) {
                            let target = targetPicker("pos")
                            message = `${carrier.name} throws it to ${target.name} near the net!`
                            carrier = target
                            if (stage === 4) { stage = 5 } else if (stage === 2) { stage = 1 }
                            endPlay("same")
                        }
                        else {
                            let target = targetPicker("nos")
                            message = `The defense recovers the puck.`
                            carrier = target
                            endPlay("switch")
                        }
                    } else {
                        let target = targetPicker("pos")
                        message = `${carrier.name} passes it to ${target.name} at the point!`
                        carrier = target
                        takingShot = true
                        endPlay("same")
                    }
                }
            }
            else {
                let off = rng((carrier.stats.offense.sauce) + (posT.lines[posT.zz].c.stats.offense.silk) +
                    (posT.lines[posT.zz].c.stats.physical.zoom) + (posT.lines[posT.zz].b.stats.offense.silk) +
                    (posT.lines[posT.zz].b.stats.physical.zoom) + (posT.lines[posT.zz].a.stats.offense.silk) + posT.mod)
                let def = rng((nosT.lines[nosT.zz].b.stats.defense.annoy) + (nosT.lines[nosT.zz].a.stats.defense.annoy) +
                    (nosT.lines[nosT.zz].c.stats.defense.annoy) + nosT.mod)
                if (def <= off) {
                    let target = targetPicker("pos")
                    message = `${carrier.name} passes it up to ${target.name} in the neutral zone.`
                    stage = 3
                    carrier = target
                    endPlay("same")
                }
                else {
                    let target = targetPicker("nos")
                    message = `${target.name} gets the puck back for ${nosT.info.city}.`
                    carrier = target
                    endPlay("switch")
                }
            }
        }
        function crash() {
            if (stage === 5 && possession === 1 || stage === 1 && possession === 2) {
                let shotType = rngWhole(2)
                let shot = 0
                let def = 0
                if (shotType === 0) {
                    shot = rng((carrier.stats.offense.snipe * 3) + posT.mod)
                    def = rng((nosT.lines[2].stats.goalkeeping.swat * 2) + (nosT.lines[2].stats.physical.zoom) + nosT.mod) + nosT.lines[2].stats.goalkeeping.swat
                }
                else {
                    shot = rng((carrier.stats.offense.snap * 3) + posT.mod)
                    def = (rng((nosT.lines[2].stats.goalkeeping.squish * 2) + (nosT.lines[2].stats.physical.zoom) + nosT.mod)) + nosT.lines[2].stats.goalkeeping.squish
                }
                if (def <= shot) {
                    if (shotType === 0) { message = `GOAL: ${posT.info.city}'s ${carrier.name} picks out the top corner to score on ${nosT.lines[2].name}!` }
                    else { message = `GOAL: ${posT.info.city}'s ${carrier.name} scores with a snap shot on ${nosT.lines[2].name}!` }
                    posT.score++
                    setScore()
                    let z = rngWhole(3)
                    if (z ==! 0) {
                        changeLinesBoth()
                    }
                    possession = 0
                    stage = 0
                    carrier = null
                }
                else {
                    message = `${nosT.lines[2].name} saves ${carrier.name}'s shot!`
                    carrier = nosT.lines[2]
                    endPlay("switch")
                }
            }
            else {
                let off = rng((carrier.stats.goalkeeping.swallow * 2) + (carrier.stats.offense.sauce) +
                    (posT.lines[posT.zz].c.stats.physical.spinach) + (posT.lines[posT.zz].b.stats.physical.spinach) + (posT.lines[posT.zz].a.stats.offense.silk) + posT.mod)
                let def = rng((nosT.lines[nosT.zz].b.stats.physical.zoom) + (nosT.lines[nosT.zz].a.stats.physical.zoom) + (nosT.lines[nosT.zz].c.stats.physical.zoom) + nosT.mod)
                if (def <= off) {
                    let target = targetPicker("pos")
                    message = `${carrier.name} gives it to ${target.name} who looks to break out.`
                    if (stage === 1) { stage = 2 } else if (stage === 5) { stage = 4 }
                    carrier = target
                    endPlay("same")
                }
                else {
                    let target = targetPicker("nos")
                    message = `${target.name} gets the puck back for ${nosT.info.city}.`
                    if (stage === 1) { stage = 2 } else if (stage === 5) { stage = 4 }
                    carrier = target
                    endPlay("switch")
                }
            }
        }
        function endPlay(result) {
            switch (result) {
                case "same":
                    if (possession === 1) {
                        posT = t1
                        nosT = t2
                    } else if (possession === 2) {
                        posT = t2
                        nosT = t1
                    }
                    break
                case "switch":
                    if (possession === 1) {
                        posT = t2
                        nosT = t1
                        possession = 2
                    }
                    else if (possession === 2) {
                        posT = t1
                        nosT = t2
                        possession = 1
                    }
                    break
            }
        }
        function setScore() {
            if (possession === 1) {
                t1.score = posT.score
                t2.score = nosT.score
            } else if (possession === 2) {
                t1.score = nosT.score
                t2.score = posT.score
            }
        }
    }

    function targetPicker(x) {
        let line = []
        switch (x) {
            case "pos":
                line = [posT.lines[posT.zz].b, posT.lines[posT.zz].a, posT.lines[posT.zz].c]
                break
            case "nos":
                line = [nosT.lines[nosT.zz].b, nosT.lines[nosT.zz].a, nosT.lines[nosT.zz].c]
                break
            case "t1":
                line = [t1.lines[t1.zz].a, t1.lines[t1.zz].b, t1.lines[t1.zz].c]
                break
            case "t2":
                line = [t2.lines[t2.zz].a, t2.lines[t2.zz].b, t2.lines[t2.zz].c]
                break
        }
        let targets = line.filter(player => player !== carrier)
        let z = rngWhole(targets.length)
        return targets[z]
    }
    function icePlayer(player) {

    }
    function fireUp(team) {
        switch (team) {
            case "posT":
                posT.firedUp.status = true;
                posT.firedUp.time = 47;
                posT.mod = posT.mod + 0.5
                break;
            case "nosT":
                nosT.firedUp.status = true;
                nosT.firedUp.time = 47;
                nosT.mod = nosT.mod + 0.5
                break;
        }
    }
    function fireCheck(x, team) {
        if (x > 61) {
            team.firedUp.status = false;
            team.firedUp.time = 99;
            team.mod = team.mod - 0.5
        }
    }
    function pressure(i){
        if (posT.score + 1 < nosT.score && period === 3 && i > 30){
            posT.mod = posT.mod + 0.2
        }
        if (posT.score < nosT.score && period === 3 && i > 45){
            posT.mod = posT.mod + 0.3
        }
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
        else if (x == 47) { return "04:20" }
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
        else if (x == 99) { return "" }
        else { return "??:??" }
    }
    function packager() {
        if (carrier == null) { carrier = { full: "" } }
        let package = {
            t1: teams[0].info.full,
            t2: teams[1].info.full,
            t1C: teams[0].info.city,
            t2C: teams[1].info.city,
            t1S: t1.score,
            t2S: t2.score,
            t1L: [t1.lines[t1.zz].a.name, t1.lines[t1.zz].b.name, t1.lines[t1.zz].c.name],
            t2L: [t2.lines[t2.zz].a.name, t2.lines[t2.zz].b.name, t2.lines[t2.zz].c.name],
            t1f: timeConvert(t1.firedUp.time),
            t2f: timeConvert(t2.firedUp.time),
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