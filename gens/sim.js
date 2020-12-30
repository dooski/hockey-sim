let data = require("./data.json")

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
function period(teams, score) {
    let t1 = teams[0]
    let t2 = teams[1]
    let currentScore = score
    let stage = 0
    let possession = 0
    for (i = 0; i < 30; i++) {
        let length = i*5000
        setTimeout(play, length)
    }
    function play() {
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
        console.log(`${p1} and ${p2} and ${z}`)
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
                    currentScore = currentScore[0] + 1, currentScore[1]
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
            if (z <= off) {
                if (z < off*0.3) {
                    console.log(`${t2.players.LW.full} passes to ${t2.players.RW.full} who takes the shot and scores!`)
                    possession = 0
                    stage = 0
                    currentScore = currentScore[0], currentScore[1] + 1
                }
                console.log(`${t2.players.LW.full} throws it towards the net!`)
                stage = 1
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
}





module.exports = {
    period
}