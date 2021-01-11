const playmaker = require("./playmaker.js")

function zp(z) {
    return Math.floor(Math.random() * z)
}
//stages represent where on the ice the play is taking place
// 0 = puck drop
// 1 = home net
// 2 = home third
// 3 = center ice
// 4 = away third
// 5 = away net
// possession:
// 0 = no one
// 1 = team 1
// 2 = team 2
function game(teams) {
    let t1 = teams[0]
    let t1Score = 0
    let t2 = teams[1]
    let t2Score = 0
    let lineup = {
            LW0: t1.players.LW,
            CE0: t1.players.C,
            RW0: t1.players.RW,
            LD0: t1.players.LD,
            RD0: t1.players.RD,
            GK0: t1.players.GK,
            LW1: t2.players.LW,
            CE1: t2.players.C,
            RW1: t2.players.RW,
            LD1: t2.players.LD,
            RD1: t2.players.RD,
            GK1: t2.players.GK
        }
    let stage = 0
    let possession = null
    let carrier = "CE0"
    let involved = ["LW0", "RW0", "CE1", "LW1", "RW1"]
        for (i = 0; i < 90; i++) {
        let length = (i*5000)
        if (i == 0) {
            setTimeout(beginning, length)
        }
        else if (i == 29) {
            setTimeout(endOfFirst, length)
        } else if (i === 59) {
            setTimeout(endOfSecond, length)
        } else if (i == 89) {
            setTimeout(finalScore, length)
        } else
        setTimeout(onePlay, length)
    }
    function onePlay(){
    console.log(`${t1.info.full} ${t1Score} - ${t2Score} ${t2.info.full}`)
    let involvedList = listMaker(involved, carrier)
    let play = `000${stage}${involvedList}`
    playmaker.playmaker(play, lineup)
    console.log(play)
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
    let p1 = t1.players.C.stats.handling*10
    let p2 = t2.players.C.stats.handling*10
    let z = zp((p1+p2))
    if (z <= p1){
        possession = 1
        console.log(`${t1.players.C.full} wins the face off for the ${t1.info.full}`)}
    else {
        possession = 2
        console.log(`${t2.players.C.full} wins the face off for the ${t2.info.full}`)}
    stage = 3
    }
function center() {
    if (possession == 1) {
        let off = (t1.players.LW.stats.passing*10) + (t1.players.C.stats.passing*10) + (t1.players.RW.stats.passing*10)
        let def = (t2.players.LW.stats.positioning*10) + (t2.players.C.stats.positioning*10) + (t2.players.RW.stats.positioning*10)
        let z = zp((off+def)*1.2)
        if (z <= off) {
            console.log(`${t1.players.C.full} passes it up to ${t1.players.LW.full} in ${t2.info.full}'s third!`)
            stage = 4
        }
        else {
            console.log(`${t2.players.C.full} steals the puck from ${t1.players.C.full}!`)
            possession = 2
        }
    } 
    else if (possession == 2) {
        let off = (t2.players.LW.stats.passing*10) + (t2.players.C.stats.passing*10) + (t2.players.RW.stats.passing*10)
        let def = (t1.players.LW.stats.positioning*10) + (t1.players.C.stats.positioning*10) + (t1.players.RW.stats.positioning*10)
        let z = zp((off+def)*1.2)
        if (z <= off) {
            console.log(`${t2.players.C.full} passes it up to ${t2.players.LW.full} in ${t1.info.full}'s third!`)
            stage = 2
        }
        else {
            console.log(`${t1.players.C.full} steals the puck from ${t2.players.C.full}!`)
            possession = 1
        }
    }
}
function third(side) {
    if (side == 2) {
    if (possession == 1) {
        let off = (t1.players.LW.stats.passing*10) + (t1.players.C.stats.passing*10) + (t1.players.RW.stats.shooting*10)
        let def = (t2.players.LD.stats.positioning*10) + (t2.players.LD.stats.checking*5) + (t2.players.RD.stats.blocking*8) + (t2.players.RD.stats.checking*6)
        let z = zp((off+def)*1)
            if (z < off*0.3) {
                console.log(`${t1.players.LW.full} passes to ${t1.players.RW.full} who takes the shot and scores!`)
                possession = 0
                stage = 0
                t1Score = t1Score + 1
            } else if (z <= off) {
            console.log(`${t1.players.LW.full} throws it towards the net!`)
            stage = 5
            possession == 1
        }
        else {
            console.log(`${t2.players.LD.full} steals the puck from ${t1.players.LW.full}!`)
            possession = 2
        }
    } 
    else if (possession == 2) {
        let off = (t2.players.LD.stats.passing*10) + (t2.players.RD.stats.passing*10) + (t2.players.C.stats.passing*10)
        let def = (t1.players.LW.stats.checking*10) + (t1.players.C.stats.positioning*10) + (t1.players.RW.stats.checking*10)
        let z = zp((off+def)*1.2)
        if (z <= off) {
            console.log(`${t2.players.LD.full} passes it up to ${t2.players.C.full} in the neutral zone!`)
            stage = 3
        }
        else {
            console.log(`${t1.players.LW.full} steals the puck from ${t2.players.LD.full}!`)
            possession = 1
        }
    }
    }
    else if (side == 1)
    {if (possession == 2) {
        let off = (t2.players.LW.stats.passing*10) + (t2.players.C.stats.passing*10) + (t2.players.RW.stats.shooting*10)
        let def = (t1.players.LD.stats.positioning*10) + (t1.players.LD.stats.checking*5) + (t1.players.RD.stats.blocking*8) + (t1.players.RD.stats.checking*6)
        let z = zp((off+def)*1)
        if (z < off*0.3) {
            console.log(`${t2.players.LW.full} passes to ${t2.players.RW.full} who takes the shot and scores!`)
            possession = 0
            stage = 0
            t2Score = t2Score + 1
        } else if (z <= off) {
        console.log(`${t2.players.LW.full} throws it towards the net!`)
        stage = 1
        possession == 2
    }
        else {
            console.log(`${t1.players.LD.full} steals the puck from ${t2.players.LW.full}!`)
            possession = 1
        }
    } 
    else if (possession == 1) {
        let off = (t1.players.LD.stats.passing*10) + (t1.players.RD.stats.passing*10) + (t1.players.C.stats.passing*10)
        let def = (t2.players.LW.stats.checking*10) + (t2.players.C.stats.positioning*10) + (t2.players.RW.stats.checking*10)
        let z = zp((off+def)*1.2)
        if (z <= off) {
            console.log(`${t1.players.LD.full} passes it up to ${t1.players.C.full} in the neutral zone!`)
            stage = 3
        }
        else {
            console.log(`${t2.players.LW.full} steals the puck from ${t1.players.LD.full}!`)
            possession = 2
        }
    }}
}
function crash(side) {
    if (side == 2) {
    if (possession == 1) {
        let zShoot = zp(3)
        let shooters = [t1.players.LW.full, t1.players.C.full, t1.players.RW.full]
        let shooter = shooters[zShoot]
        let off = (t1.players.LW.stats.speed*10) + (t1.players.C.stats.shooting*10) + (t1.players.RW.stats.shooting*10)
        let def = t2.players.G.stats.goalkeeping*30
        let z = zp((off+def)*0.9)
        if (z <= off) {
            console.log(`${t1.info.full}'s ${shooter} scores on ${t2.players.G.full}!`)
            t1Score = t1Score + 1
            possession = 0
            stage = 0
        }
        else {
            console.log(`${t2.players.G.full} saves ${shooter}'s shot!`)
            possession = 2
        }
    } 
    else if (possession == 2) {
        let off = (t2.players.LD.stats.passing*10) + (t2.players.RD.stats.passing*10) + (t2.players.C.stats.passing*10)
        let def = (t1.players.LW.stats.speed*10) + (t1.players.C.stats.positioning*10) + (t1.players.RW.stats.speed*10)
        let z = zp((off+def)*1.2)
        if (z <= off) {
            console.log(`${t2.players.G.full} gives it to ${t2.players.LD.full} who looks to break out.`)
            stage = 2
        }
        else {
            console.log(`${t1.players.LW.full} gets the puck back for ${t1.info.full}!`)
            possession = 1
            stage = 2
        }
    }
    }
    else if (side == 1)
    {
        if (possession == 2) {
            let zShoot = zp(3)
            let shooters = [t2.players.LW.full, t2.players.C.full, t2.players.RW.full]
            let shooter = shooters[zShoot]
            let off = (t2.players.LW.stats.speed*10) + (t2.players.C.stats.shooting*10) + (t2.players.RW.stats.shooting*10)
            let def = t1.players.G.stats.goalkeeping*30
            let z = zp((off+def)*0.9)
            if (z <= off) {
                console.log(`${t2.info.full}'s ${shooter} scores on ${t1.players.G.full}!`)
                t2Score = t2Score + 1
                possession = 0
                stage = 0
            }
            else {
                console.log(`${t1.players.G.full} saves ${shooter}'s shot!`)
                possession = 2
            }
        } 
        else if (possession == 1) {
            let off = (t1.players.LD.stats.passing*10) + (t1.players.RD.stats.passing*10) + (t1.players.C.stats.passing*10)
            let def = (t2.players.LW.stats.speed*10) + (t2.players.C.stats.positioning*10) + (t2.players.RW.stats.speed*10)
            let z = zp((off+def)*1.2)
            if (z <= off) {
                console.log(`${t1.players.G.full} gives it to ${t1.players.LD.full} who looks to break out.`)
                stage = 4
            }
            else {
                console.log(`${t2.players.LW.full} gets the puck back for ${t2.info.full}!`)
                possession = 2
                stage = 4
            }
        }
        }
}
}
    function beginning(){
        console.log(`

        AND NOW: The ${t1.info.team} host the ${t2.info.full} here in ${t1.info.city}!
        ------------
        ------------
        ---- ${t1.info.full}: ${t1.info.desc}
            LINEUP:
                LW: ${t1.players.LW.full}
                C: ${t1.players.C.full}
                RW: ${t1.players.RW.full}
                LD: ${t1.players.LD.full}
                RD: ${t1.players.RD.full}
                GK: ${t1.players.G.full}
        ------------
        ---- ${t2.info.full}: ${t2.info.desc}
            LINEUP:
                LW: ${t2.players.LW.full}
                C: ${t2.players.C.full}
                RW: ${t2.players.RW.full}
                LD: ${t2.players.LD.full}
                RD: ${t2.players.RD.full}
                GK: ${t2.players.G.full}
        ------------
        ------------
        TIME FOR PUCKDROP!
        
        `)
    }
    function endOfFirst(){
        console.log(`END OF FIRST PERIOD. Score: ${t1.info.city} ${t1Score} - ${t2Score} ${t2.info.city}`)
    }
    function endOfSecond(){
        console.log(`END OF SECOND PERIOD. Score: ${t1.info.city} ${t1Score} - ${t2Score} ${t2.info.city}`)
    }
    function finalScore(){
        console.log(`END OF THIRD PERIOD. GAME OVER. Final Score: ${t1.info.city} ${t1Score} - ${t2Score} ${t2.info.city}`)
    }
}

function fastGame(teams) {
    let t1 = teams[0]
    let t1Score = 0
    let t2 = teams[1]
    let t2Score = 0
    let stage = 0
    let possession = 0
    for (i = 0; i < 90; i++) {
        if (i == 89) {
            if (t1Score > t2Score) {return "home"} 
            else if (t2Score > t1Score) {return "away"} 
            else if (t1Score == t2Score ) {
                let coin = zp(2)
                if (coin == 0) {return "home"}
                else if (coin == 1) {return "away"}
            }
        }
        play()
    }
    function play()         
{
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
    let p1 = t1.players.C.stats.handling*10
    let p2 = t2.players.C.stats.handling*10
    let z = zp((p1+p2))
    if (z < p1){
        possession = 1}
    else {
        possession = 2}
    stage = 3
    }
function center() {
    if (possession == 1) {
        let off = (t1.players.LW.stats.passing*10) + (t1.players.C.stats.passing*10) + (t1.players.RW.stats.passing*10)
        let def = (t2.players.LW.stats.positioning*10) + (t2.players.C.stats.positioning*10) + (t2.players.RW.stats.positioning*10)
        let z = zp((off+def)*1.2)
        if (z <= off) {
            stage = 4
        }
        else {
            possession = 2
        }
    } 
    else if (possession == 2) {
        let off = (t2.players.LW.stats.passing*10) + (t2.players.C.stats.passing*10) + (t2.players.RW.stats.passing*10)
        let def = (t1.players.LW.stats.positioning*10) + (t1.players.C.stats.positioning*10) + (t1.players.RW.stats.positioning*10)
        let z = zp((off+def)*1.2)
        if (z <= off) {
            stage = 2
        }
        else {
            possession = 1
        }
    }
}
function third(side) {
     if (side == 2) {
    if (possession == 1) {
        let off = (t1.players.LW.stats.passing*10) + (t1.players.C.stats.passing*10) + (t1.players.RW.stats.shooting*10)
        let def = (t2.players.LD.stats.positioning*10) + (t2.players.LD.stats.checking*5) + (t2.players.RD.stats.blocking*8) + (t2.players.RD.stats.checking*6)
        let z = zp((off+def)*1)
            if (z < off*0.1) {
                possession = 0
                stage = 0
                t1Score = t1Score + 1
            } else if (z <= off) {
            stage = 5
            possession = 1
        }
        else {
            possession = 2
        }
    } 
    else if (possession == 2) {
        let off = (t2.players.LD.stats.passing*10) + (t2.players.RD.stats.passing*10) + (t2.players.C.stats.passing*10)
        let def = (t1.players.LW.stats.checking*10) + (t1.players.C.stats.positioning*10) + (t1.players.RW.stats.checking*10)
        let z = zp((off+def)*1.4)
        if (z <= off) {
            stage = 3
        }
        else {
            possession = 1
        }
    }
    }
    else if (side == 1)
    {if (possession == 2) {
        let off = (t2.players.LW.stats.passing*10) + (t2.players.C.stats.passing*10) + (t2.players.RW.stats.shooting*10)
        let def = (t1.players.LD.stats.positioning*10) + (t1.players.LD.stats.checking*5) + (t1.players.RD.stats.blocking*8) + (t1.players.RD.stats.checking*6)
        let z = zp((off+def)*1)
        if (z < off*0.1) {
            possession = 0
            stage = 0
            t2Score = t2Score + 1
        } else if (z <= off) {
        stage = 1
        possession = 2
    }
        else {
            possession = 1
        }
    } 
    else if (possession == 1) {
        let off = (t1.players.LD.stats.passing*10) + (t1.players.RD.stats.passing*10) + (t1.players.C.stats.passing*10)
        let def = (t2.players.LW.stats.checking*10) + (t2.players.C.stats.positioning*10) + (t2.players.RW.stats.checking*10)
        let z = zp((off+def)*1.4)
        if (z <= off) {
            stage = 3
        }
        else {
            possession = 2
        }
    }}
}
function crash(side) {
    if (side == 2) {
    if (possession == 1) {
        let zShoot = zp(3)
        let shooters = [t1.players.LW.full, t1.players.C.full, t1.players.RW.full]
        let shooter = shooters[zShoot]
        let off = (t1.players.LW.stats.speed*10) + (t1.players.C.stats.shooting*10) + (t1.players.RW.stats.shooting*10)
        let def = (t2.players.G.stats.goalkeeping*30) + (t2.players.LD.stats.blocking*8) + (t2.players.RD.stats.blocking*8)
        let z = zp((off+def)*0.7)
        if (z <= off) {
            t1Score = t1Score + 1
            possession = 0
            stage = 0
        }
        else {
            possession = 2
        }
    } 
    else if (possession == 2) {
        let off = (t2.players.LD.stats.passing*10) + (t2.players.RD.stats.passing*10) + (t2.players.C.stats.passing*10)
        let def = (t1.players.LW.stats.speed*10) + (t1.players.C.stats.positioning*10) + (t1.players.RW.stats.speed*10)
        let z = zp((off+def)*1.4)
        if (z <= off) {
            stage = 2
        }
        else {
            possession = 1
            stage = 2
        }
    }
    }
    else if (side == 1)
    {
        if (possession == 2) {
            let zShoot = zp(3)
            let shooters = [t2.players.LW.full, t2.players.C.full, t2.players.RW.full]
            let shooter = shooters[zShoot]
            let off = (t2.players.LW.stats.speed*10) + (t2.players.C.stats.shooting*10) + (t2.players.RW.stats.shooting*10)
            let def = (t1.players.G.stats.goalkeeping*30) + (t1.players.LD.stats.blocking*8) + (t1.players.RD.stats.blocking*8)
        let z = zp((off+def)*0.7)
            if (z <= off) {
                t2Score = t2Score + 1
                possession = 0
                stage = 0 
            }
            else {
                possession = 1
            }
        } 
        else if (possession == 1) {
            let off = (t1.players.LD.stats.passing*10) + (t1.players.RD.stats.passing*10) + (t1.players.C.stats.passing*10)
            let def = (t2.players.LW.stats.speed*10) + (t2.players.C.stats.positioning*10) + (t2.players.RW.stats.speed*10)
            let z = zp((off+def)*1.4)
            if (z <= off) {
                stage = 4
            }
            else {
                possession = 2
                stage = 4
            }
        }
        }
}
}
}

function season(bingo, bongo){
    let t1 = {
        "team": bingo[0],
        "wins": 0,
        "losses": 0}
    let t2 = {
        "team": bingo[1],
        "wins": 0,
        "losses": 0}
    let t3 = {
        "team": bingo[2],
        "wins": 0,
        "losses": 0}
    let t4 = {
        "team": bingo[3],
        "wins": 0,
        "losses": 0}
    let t5 = {
        "team": bongo[0],
        "wins": 0,
        "losses": 0}
    let t6 = {
        "team": bongo[1],
        "wins": 0,
        "losses": 0}
    let t7 = {
        "team": bongo[2],
        "wins": 0,
        "losses": 0}
    let t8 = {
        "team": bongo[3],
        "wins": 0,
        "losses": 0}
    let homeWins = 0
    setTimeout(day1, 100)
    setTimeout(day2, 200)
    setTimeout(day3, 300)
    setTimeout(day4, 400)
    setTimeout(day5, 500)
    setTimeout(day6, 600)
    setTimeout(day7, 700)
    setTimeout(day8, 800)
    setTimeout(day9, 900)
    setTimeout(day10, 1000)
    setTimeout(day11, 1100)
    setTimeout(day12, 1200)
    setTimeout(day13, 1300)
    setTimeout(day14, 1400)
    setTimeout(day1, 1500)
    setTimeout(day2, 1600)
    setTimeout(day3, 1700)
    setTimeout(day4, 1800)
    setTimeout(day5, 2000)
    setTimeout(day6, 2100)
    setTimeout(day7, 2200)
    setTimeout(day8, 2300)
    setTimeout(day9, 2400)
    setTimeout(day10, 2500)
    setTimeout(day11, 2600)
    setTimeout(day12, 2700)
    setTimeout(day13, 2800)
    setTimeout(day14, 2900)
    setTimeout(day1, 3000)
    setTimeout(day2, 3100)
    setTimeout(day3, 3200)
    setTimeout(day4, 3300)
    setTimeout(day5, 3400)
    setTimeout(day6, 3500)
    setTimeout(day7, 3600)
    setTimeout(day8, 3700)
    setTimeout(day9, 3800)
    setTimeout(day10, 3900)
    setTimeout(day11, 4000)
    setTimeout(day12, 4100)
    setTimeout(day13, 4200)
    setTimeout(day14, 4300)
    setTimeout(day1, 4400)
    setTimeout(day2, 4500)
    setTimeout(day3, 4600)
    setTimeout(day4, 47000)
    setTimeout(day5, 48500)
    setTimeout(day6, 49000)
    setTimeout(day7, 5000)
    setTimeout(day8, 5100)
    setTimeout(day9, 5200)
    setTimeout(day10, 5300)
    setTimeout(day11, 5400)
    setTimeout(day12, 5500)
    setTimeout(day13, 5600)
    setTimeout(day14, 5700)
    setTimeout(stats, 5800)
    
    function stats(){
        console.log(`


        *BINGO DIVISION*
        ----------------
        ${t1.team.info.full}: ${t1.wins}-${t1.losses}
        ${t2.team.info.full}: ${t2.wins}-${t2.losses}
        ${t3.team.info.full}: ${t3.wins}-${t3.losses}
        ${t4.team.info.full}: ${t4.wins}-${t4.losses}


        *BONGO DIVISION*
        ----------------
        ${t5.team.info.full}: ${t5.wins}-${t5.losses}
        ${t6.team.info.full}: ${t6.wins}-${t6.losses}
        ${t7.team.info.full}: ${t7.wins}-${t7.losses}
        ${t8.team.info.full}: ${t8.wins}-${t8.losses}

        Home wins: ${homeWins}
        `)
    }
    function day1() {
        let winner1 = fastGame([t1.team, t2.team])
        let winner2 = fastGame([t3.team, t4.team])
        let winner3 = fastGame([t5.team, t6.team])
        let winner4 = fastGame([t7.team, t8.team])
        console.log(winner1)
        if (winner1 === "home") {t1.wins = t1.wins + 1, t2.losses = t2.losses + 1; homeWins = homeWins + 1} else if (winner1 === "away") {t2.wins = t2.wins + 1, t1.losses = t1.losses + 1}
        if (winner2 === "home") {t3.wins = t3.wins + 1, t4.losses = t4.losses + 1; homeWins = homeWins + 1} else if (winner2 === "away") {t4.wins = t4.wins + 1, t3.losses = t3.losses + 1}
        if (winner3 === "home") {t5.wins = t5.wins + 1, t6.losses = t6.losses + 1; homeWins = homeWins + 1} else if (winner3 === "away") {t6.wins = t6.wins + 1, t5.losses = t5.losses + 1}
        if (winner4 === "home") {t7.wins = t7.wins + 1, t8.losses = t8.losses + 1; homeWins = homeWins + 1} else if (winner4 === "away") {t8.wins = t8.wins + 1, t7.losses = t7.losses + 1}
    }
    function day2() {
        let winner1 = fastGame([t2.team, t1.team])
        let winner2 = fastGame([t4.team, t3.team])
        let winner3 = fastGame([t6.team, t5.team])
        let winner4 = fastGame([t8.team, t7.team])
        if (winner1 === "away") {t1.wins = t1.wins + 1, t2.losses = t2.losses + 1} else if (winner1 === "home") {t2.wins = t2.wins + 1, t1.losses = t1.losses + 1; homeWins = homeWins + 1}
        if (winner2 === "away") {t3.wins = t3.wins + 1, t4.losses = t4.losses + 1} else if (winner2 === "home") {t4.wins = t4.wins + 1, t3.losses = t3.losses + 1; homeWins = homeWins + 1}
        if (winner3 === "away") {t5.wins = t5.wins + 1, t6.losses = t6.losses + 1} else if (winner3 === "home") {t6.wins = t6.wins + 1, t5.losses = t5.losses + 1; homeWins = homeWins + 1}
        if (winner4 === "away") {t7.wins = t7.wins + 1, t8.losses = t8.losses + 1} else if (winner4 === "home") {t8.wins = t8.wins + 1, t7.losses = t7.losses + 1; homeWins = homeWins + 1}

    }
    function day3() {
        let winner1 = fastGame([t1.team, t5.team])
        let winner2 = fastGame([t2.team, t6.team])
        let winner3 = fastGame([t3.team, t7.team])
        let winner4 = fastGame([t4.team, t8.team])
        if (winner1 === "home") {t1.wins = t1.wins + 1, t5.losses = t5.losses + 1; homeWins = homeWins + 1} else if (winner1 === "away") {t5.wins = t5.wins + 1, t1.losses = t1.losses + 1}
        if (winner2 === "home") {t2.wins = t2.wins + 1, t6.losses = t6.losses + 1; homeWins = homeWins + 1} else if (winner2 === "away") {t6.wins = t6.wins + 1, t2.losses = t2.losses + 1}
        if (winner3 === "home") {t3.wins = t3.wins + 1, t7.losses = t7.losses + 1; homeWins = homeWins + 1} else if (winner3 === "away") {t7.wins = t7.wins + 1, t3.losses = t3.losses + 1}
        if (winner4 === "home") {t4.wins = t4.wins + 1, t8.losses = t8.losses + 1; homeWins = homeWins + 1} else if (winner4 === "away") {t8.wins = t8.wins + 1, t4.losses = t4.losses + 1}

    }
    function day4() {
        let winner1 = fastGame([t5.team, t1.team])
        let winner2 = fastGame([t6.team, t2.team])
        let winner3 = fastGame([t7.team, t3.team])
        let winner4 = fastGame([t8.team, t4.team])
        if (winner1 === "away") {t1.wins = t1.wins + 1, t5.losses = t5.losses + 1} else if (winner1 === "home") {t5.wins = t5.wins + 1, t1.losses = t1.losses + 1; homeWins = homeWins + 1}
        if (winner2 === "away") {t2.wins = t2.wins + 1, t6.losses = t6.losses + 1} else if (winner2 === "home") {t6.wins = t6.wins + 1, t2.losses = t2.losses + 1; homeWins = homeWins + 1}
        if (winner3 === "away") {t3.wins = t3.wins + 1, t7.losses = t7.losses + 1} else if (winner3 === "home") {t7.wins = t7.wins + 1, t3.losses = t3.losses + 1; homeWins = homeWins + 1}
        if (winner4 === "away") {t4.wins = t4.wins + 1, t8.losses = t8.losses + 1} else if (winner4 === "home") {t8.wins = t8.wins + 1, t4.losses = t4.losses + 1; homeWins = homeWins + 1}

    }
    function day5() {
        let winner1 = fastGame([t1.team, t6.team])
        let winner2 = fastGame([t2.team, t7.team])
        let winner3 = fastGame([t3.team, t8.team])
        let winner4 = fastGame([t4.team, t5.team])
        if (winner1 === "home") {t1.wins = t1.wins + 1, t6.losses = t6.losses + 1; homeWins = homeWins + 1} else if (winner1 === "away") {t6.wins = t6.wins + 1, t1.losses = t1.losses + 1}
        if (winner2 === "home") {t2.wins = t2.wins + 1, t7.losses = t7.losses + 1; homeWins = homeWins + 1} else if (winner2 === "away") {t7.wins = t7.wins + 1, t2.losses = t2.losses + 1}
        if (winner3 === "home") {t3.wins = t3.wins + 1, t8.losses = t8.losses + 1; homeWins = homeWins + 1} else if (winner3 === "away") {t8.wins = t8.wins + 1, t3.losses = t3.losses + 1}
        if (winner4 === "home") {t4.wins = t4.wins + 1, t5.losses = t5.losses + 1; homeWins = homeWins + 1} else if (winner4 === "away") {t5.wins = t5.wins + 1, t4.losses = t4.losses + 1}

    }
    function day6() {
        let winner1 = fastGame([t6.team, t1.team])
        let winner2 = fastGame([t7.team, t2.team])
        let winner3 = fastGame([t8.team, t3.team])
        let winner4 = fastGame([t5.team, t4.team])
        if (winner1 === "away") {t1.wins = t1.wins + 1, t6.losses = t6.losses + 1} else if (winner1 === "home") {t6.wins = t6.wins + 1, t1.losses = t1.losses + 1; homeWins = homeWins + 1}
        if (winner2 === "away") {t2.wins = t2.wins + 1, t7.losses = t7.losses + 1} else if (winner2 === "home") {t7.wins = t7.wins + 1, t2.losses = t2.losses + 1; homeWins = homeWins + 1}
        if (winner3 === "away") {t3.wins = t3.wins + 1, t8.losses = t8.losses + 1} else if (winner3 === "home") {t8.wins = t8.wins + 1, t3.losses = t3.losses + 1; homeWins = homeWins + 1}
        if (winner4 === "away") {t4.wins = t4.wins + 1, t5.losses = t5.losses + 1} else if (winner4 === "home") {t5.wins = t5.wins + 1, t4.losses = t4.losses + 1; homeWins = homeWins + 1}
    }
    function day7() {
        let winner1 = fastGame([t1.team, t7.team])
        let winner2 = fastGame([t2.team, t8.team])
        let winner3 = fastGame([t3.team, t5.team])
        let winner4 = fastGame([t4.team, t6.team])
        if (winner1 === "home") {t1.wins = t1.wins + 1, t7.losses = t7.losses + 1; homeWins = homeWins + 1} else if (winner1 === "away") {t7.wins = t7.wins + 1, t1.losses = t1.losses + 1}
        if (winner2 === "home") {t2.wins = t2.wins + 1, t8.losses = t8.losses + 1; homeWins = homeWins + 1} else if (winner2 === "away") {t8.wins = t8.wins + 1, t2.losses = t2.losses + 1}
        if (winner3 === "home") {t3.wins = t3.wins + 1, t5.losses = t5.losses + 1; homeWins = homeWins + 1} else if (winner3 === "away") {t5.wins = t5.wins + 1, t3.losses = t3.losses + 1}
        if (winner4 === "home") {t4.wins = t4.wins + 1, t6.losses = t6.losses + 1; homeWins = homeWins + 1} else if (winner4 === "away") {t6.wins = t6.wins + 1, t4.losses = t4.losses + 1}

    }
    function day8() {
        let winner1 = fastGame([t7.team, t1.team])
        let winner2 = fastGame([t8.team, t2.team])
        let winner3 = fastGame([t5.team, t3.team])
        let winner4 = fastGame([t6.team, t4.team])
        if (winner1 === "away") {t1.wins = t1.wins + 1, t7.losses = t7.losses + 1} else if (winner1 === "home") {t7.wins = t7.wins + 1, t1.losses = t1.losses + 1; homeWins = homeWins + 1}
        if (winner2 === "away") {t2.wins = t2.wins + 1, t8.losses = t8.losses + 1} else if (winner2 === "home") {t8.wins = t8.wins + 1, t2.losses = t2.losses + 1; homeWins = homeWins + 1}
        if (winner3 === "away") {t3.wins = t3.wins + 1, t5.losses = t5.losses + 1} else if (winner3 === "home") {t5.wins = t5.wins + 1, t3.losses = t3.losses + 1; homeWins = homeWins + 1}
        if (winner4 === "away") {t4.wins = t4.wins + 1, t6.losses = t6.losses + 1} else if (winner4 === "home") {t6.wins = t6.wins + 1, t4.losses = t4.losses + 1; homeWins = homeWins + 1}

    }
    function day9() {
        let winner1 = fastGame([t1.team, t8.team])
        let winner2 = fastGame([t2.team, t5.team])
        let winner3 = fastGame([t3.team, t6.team])
        let winner4 = fastGame([t4.team, t7.team])
        if (winner1 === "home") {t1.wins = t1.wins + 1, t8.losses = t8.losses + 1; homeWins = homeWins + 1} else if (winner1 === "away") {t8.wins = t8.wins + 1, t1.losses = t1.losses + 1}
        if (winner2 === "home") {t2.wins = t2.wins + 1, t5.losses = t5.losses + 1; homeWins = homeWins + 1} else if (winner2 === "away") {t5.wins = t5.wins + 1, t2.losses = t2.losses + 1}
        if (winner3 === "home") {t3.wins = t3.wins + 1, t6.losses = t6.losses + 1; homeWins = homeWins + 1} else if (winner3 === "away") {t6.wins = t6.wins + 1, t3.losses = t3.losses + 1}
        if (winner4 === "home") {t4.wins = t4.wins + 1, t7.losses = t7.losses + 1; homeWins = homeWins + 1} else if (winner4 === "away") {t7.wins = t7.wins + 1, t4.losses = t4.losses + 1}

    }
    function day10() {
        let winner1 = fastGame([t8.team, t1.team])
        let winner2 = fastGame([t5.team, t2.team])
        let winner3 = fastGame([t6.team, t2.team])
        let winner4 = fastGame([t7.team, t4.team])
        if (winner1 === "away") {t1.wins = t1.wins + 1, t8.losses = t8.losses + 1} else if (winner1 === "home") {t8.wins = t8.wins + 1, t1.losses = t1.losses + 1; homeWins = homeWins + 1}
        if (winner2 === "away") {t2.wins = t2.wins + 1, t5.losses = t5.losses + 1} else if (winner2 === "home") {t5.wins = t5.wins + 1, t2.losses = t2.losses + 1; homeWins = homeWins + 1}
        if (winner3 === "away") {t3.wins = t3.wins + 1, t6.losses = t6.losses + 1} else if (winner3 === "home") {t6.wins = t6.wins + 1, t3.losses = t3.losses + 1; homeWins = homeWins + 1}
        if (winner4 === "away") {t4.wins = t4.wins + 1, t7.losses = t7.losses + 1} else if (winner4 === "home") {t7.wins = t7.wins + 1, t4.losses = t4.losses + 1; homeWins = homeWins + 1}

    }
    function day11(){
    let winner1 = fastGame([t1.team, t3.team])
    let winner2 = fastGame([t2.team, t4.team])
    let winner3 = fastGame([t5.team, t7.team])
    let winner4 = fastGame([t6.team, t8.team])
    if (winner1 === "home") {t1.wins = t1.wins + 1, t3.losses = t3.losses + 1; homeWins = homeWins + 1} else if (winner1 === "away") {t3.wins = t3.wins + 1, t1.losses = t1.losses + 1}
    if (winner2 === "home") {t2.wins = t2.wins + 1, t4.losses = t4.losses + 1; homeWins = homeWins + 1} else if (winner2 === "away") {t4.wins = t4.wins + 1, t2.losses = t2.losses + 1}
    if (winner3 === "home") {t5.wins = t5.wins + 1, t7.losses = t7.losses + 1; homeWins = homeWins + 1} else if (winner3 === "away") {t7.wins = t7.wins + 1, t5.losses = t5.losses + 1}
    if (winner4 === "home") {t6.wins = t6.wins + 1, t8.losses = t8.losses + 1; homeWins = homeWins + 1} else if (winner4 === "away") {t8.wins = t8.wins + 1, t6.losses = t6.losses + 1}

    }
    function day12() {
        let winner1 = fastGame([t3.team, t1.team])
        let winner2 = fastGame([t4.team, t2.team])
        let winner3 = fastGame([t7.team, t5.team])
        let winner4 = fastGame([t8.team, t6.team])
        if (winner1 === "away") {t1.wins = t1.wins + 1, t3.losses = t3.losses + 1} else if (winner1 === "home") {t3.wins = t3.wins + 1, t1.losses = t1.losses + 1; homeWins = homeWins + 1}
        if (winner2 === "away") {t2.wins = t2.wins + 1, t4.losses = t4.losses + 1} else if (winner2 === "home") {t4.wins = t4.wins + 1, t2.losses = t2.losses + 1; homeWins = homeWins + 1}
        if (winner3 === "away") {t5.wins = t5.wins + 1, t7.losses = t7.losses + 1} else if (winner3 === "home") {t7.wins = t7.wins + 1, t5.losses = t5.losses + 1; homeWins = homeWins + 1}
        if (winner4 === "away") {t6.wins = t6.wins + 1, t8.losses = t8.losses + 1} else if (winner4 === "home") {t8.wins = t8.wins + 1, t6.losses = t6.losses + 1; homeWins = homeWins + 1}

        }
    function day13() {
        let winner1 = fastGame([t1.team, t4.team])
        let winner2 = fastGame([t2.team, t3.team])
        let winner3 = fastGame([t5.team, t8.team])
        let winner4 = fastGame([t6.team, t7.team])
        if (winner1 === "home") {t1.wins = t1.wins + 1, t4.losses = t4.losses + 1; homeWins = homeWins + 1} else if (winner1 === "away") {t4.wins = t3.wins + 1, t1.losses = t1.losses + 1}
        if (winner2 === "home") {t2.wins = t2.wins + 1, t3.losses = t3.losses + 1; homeWins = homeWins + 1} else if (winner2 === "away") {t3.wins = t4.wins + 1, t2.losses = t2.losses + 1}
        if (winner3 === "home") {t5.wins = t5.wins + 1, t8.losses = t8.losses + 1; homeWins = homeWins + 1} else if (winner3 === "away") {t8.wins = t8.wins + 1, t5.losses = t5.losses + 1}
        if (winner4 === "home") {t6.wins = t6.wins + 1, t7.losses = t7.losses + 1; homeWins = homeWins + 1} else if (winner4 === "away") {t7.wins = t7.wins + 1, t6.losses = t6.losses + 1}

        }
    function day14() {
        let winner1 = fastGame([t4.team, t1.team])
        let winner2 = fastGame([t3.team, t2.team])
        let winner3 = fastGame([t8.team, t5.team])
        let winner4 = fastGame([t7.team, t6.team])
        if (winner1 === "away") {t1.wins = t1.wins + 1, t4.losses = t4.losses + 1} else if (winner1 === "home") {t4.wins = t3.wins + 1, t1.losses = t1.losses + 1; homeWins = homeWins + 1}
        if (winner2 === "away") {t2.wins = t2.wins + 1, t3.losses = t3.losses + 1} else if (winner2 === "home") {t3.wins = t4.wins + 1, t2.losses = t2.losses + 1; homeWins = homeWins + 1}
        if (winner3 === "away") {t5.wins = t5.wins + 1, t8.losses = t8.losses + 1} else if (winner3 === "home") {t8.wins = t8.wins + 1, t5.losses = t5.losses + 1; homeWins = homeWins + 1}
        if (winner4 === "away") {t6.wins = t6.wins + 1, t7.losses = t7.losses + 1} else if (winner4 === "home") {t7.wins = t7.wins + 1, t6.losses = t6.losses + 1; homeWins = homeWins + 1}
        }
    
    
}

function odds(teams){
    let t1W = 0
    let t2W = 0
    let results = null
    for (x = 0; x < 101; x++){
        if (x === 100) {
            results = `${teams[0].info.full}: ${t1W}%. ${teams[1].info.full}: ${t2W}%.`
            console.log(results)
            return
        } else
        winner = fastGame(teams)
    if (winner === "home"){
        t1W = t1W + 1
    } else t2W = t2W + 1    }
}

function listMaker(involved, carrier){
    let list = `${carrier}`
    for (let players in involved) {
        list += involved[players]
    }
    return list
}
module.exports = {
    game,
    season,
    odds
}