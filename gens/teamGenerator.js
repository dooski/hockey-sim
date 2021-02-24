const db = require("../models")
const RNG = require("rng-js")

var rng = new RNG(Math.random);
var personalities = ["Cool", "Off-putting", "Charming", "Weird", "Grizzly", "Hungry", "Loud", "Whimsical", "Nerd", "Cute", "Sauce", "Soft", "Loving", "Reptile", "Quick", "Funny", "Clunky"]


function makePlayer(name, team) {
    let offStat = rng.random(2,5)
    let defStat = rng.random(2,5)
    let gkStat = rng.random(2,5)
    let phyStat = rng.random(2,5)
    let menStat = rng.random(2,5)
    let mysStat = rng.random(2,5)
    let personality = personalities[rng.random(0, personalities.length)]
    let player = new db.Player({
        name: name,
        currentTeam: team,
        personality: personality,
        alive: true,
        stats: {
            offense: {
                highShot: rng.random(offStat - 1, offStat + 1),
                lowShot: rng.random(offStat - 1, offStat + 1),
                longShot: rng.random(offStat - 1, offStat + 1),
                passing: rng.random(offStat, offStat + 1),
                handling: rng.random(offStat - 1, offStat + 1),
            },
            defense: {
                forecheck: rng.random(defStat - 1, defStat + 1),
                stick: rng.random(defStat - 1, defStat + 1),
                checking: rng.random(defStat - 1, defStat + 1),
                positioning: rng.random(defStat - 1, defStat + 1),
                blocking: rng.random(defStat, defStat + 1),
            },
            goalkeeping: {
                highBlock: rng.random(gkStat, gkStat + 1),
                lowBlock: rng.random(gkStat, gkStat + 1),
                longBlock: rng.random(gkStat, gkStat + 1),
                catching: rng.random(gkStat, gkStat + 1),
                aura: rng.random(gkStat - 1, gkStat + 1),
            },
            physical: {
                speed: rng.random(phyStat - 1, phyStat + 1),
                strength: rng.random(phyStat - 1, phyStat + 1),
                faceoff: rng.random(phyStat, phyStat + 1),
                fighting: rng.random(phyStat, phyStat + 1),
                blubber: rng.random(phyStat - 1, phyStat + 1),
            },
            mental: {
                discipline: rng.random(menStat - 1, menStat + 1),
                respect: rng.random(menStat - 1, menStat + 1),
                fear: rng.random(menStat - 1, menStat + 1),
                vision: rng.random(menStat - 1, menStat + 1),
                memory: rng.random(menStat - 1, menStat + 1),
            },
            mystical: {
                divinity: rng.random(mysStat - 1, mysStat + 1),
                fog: rng.random(mysStat - 1, mysStat + 1),
                luck: rng.random(mysStat - 1, mysStat + 1),
                bear: rng.random(mysStat - 1, mysStat + 1),
                lakemonster: rng.random(mysStat - 1, mysStat + 1), 
            },
            items: {
                stick: null,
                helment: null,
                skates: null,
                gloves: null,
                other: null
            },
            history: {
                goals: 0,
                saves: 0
            }
        }
    })
    player.save(function (err) {
        if (err) return handleError(err)
    })
}

async function makeTeam(fullName, cityName, teamName, teamDesc, teamConf, teamDiv, teamAbrv) {
    let roster = await makeRoster(teamAbrv)
    console.log(roster)
    let team = new db.Team({
        info: {
            full: fullName,
            city: cityName,
            team: teamName,
            desc: teamDesc,
            conf: teamConf,
            div: teamDiv,
            abrv: teamAbrv,
            captain: null
        },
        players: {
            line1: {
                LW: roster[0]._id,
                CE: roster[1]._id,
                RW: roster[2]._id,
                LD: roster[3]._id,
                RD: roster[4]._id,
                GK: roster[5]._id
            },
            line2: {
                LW: roster[6]._id,
                CE: roster[7]._id,
                RW: roster[8]._id,
                LD: roster[9]._id,
                RD: roster[10]._id,
                GK: roster[11]._id
            }
        },
        history: {
            wins: 0,
            losses: 0,
            seasons: 0,
            championships: 0
        }
    }
    )
    team.save(function (err) {
        if (err) return handleError(err)
    })
}

function makeRoster(abrv) {
    return new Promise(resolve => {
        db.Player.find({ 'currentTeam': abrv }, '_id',
            (err, data) => {
                if (err) { console.log(err) }
                resolve(data)
            })
    })
}

module.exports = {
    makePlayer,
    makeTeam
}