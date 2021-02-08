const db = require("../models")
const RNG = require("rng-js")

var rng = new RNG(Math.random);

function makePlayer(name, team){
    let player = new db.Player({
            name: name,
            currentTeam: team,
            personality: "???",
            alive: true,
            stats: {
                offense: {
                    highShot: rng.random(1, 5),
                    lowShot: rng.random(1, 5),
                    longShot: rng.random(1, 5),
                    passing: rng.random(1, 5),
                    handling: rng.random(1, 5),
                },
                defense: {
                    forecheck: rng.random(1, 5),
                    stick: rng.random(1, 5),
                    checking: rng.random(1, 5),
                    positioning: rng.random(1, 5),
                    blocking: rng.random(1, 5)
                },
                goalkeeping: {
                    highBlock: rng.random(1, 5),
                    lowBlock: rng.random(1, 5),
                    longBlock: rng.random(1, 5),
                    catching: rng.random(1, 5),
                    aura: rng.random(1, 5)
                },
                physical: {
                    speed: rng.random(1, 5),
                    strength: rng.random(1, 5),
                    faceoff: rng.random(1, 5),
                    fighting: rng.random(1, 5),
                    blubber: rng.random(1, 5)
                },
                mental: {
                    discipline: rng.random(1, 5),
                    respect: rng.random(1, 5),
                    fear: rng.random(1, 5),
                    vision: rng.random(1, 5),
                    memory: rng.random(1, 5)
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

async function makeTeam(fullName, cityName, teamName, teamDesc, teamDiv, teamAbrv){
    let roster = await makeRoster(teamAbrv)
    console.log(roster)
    let team = new db.Team({
        info: {
            full: fullName,
            city: cityName,
            team: teamName,
            desc: teamDesc,
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
                LW: null,
                CE: null,
                RW: null,
                LD: null,
                RD: null,
                GK: null
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

function makeRoster(abrv){
    return new Promise(resolve => {
        db.Player.find({ 'currentTeam': abrv }, '_id',
        (err, data) => {if (err) {console.log(err)}
        resolve(data)})
})}

module.exports = {
    makePlayer,
    makeTeam
}