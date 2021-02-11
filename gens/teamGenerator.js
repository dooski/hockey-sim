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
                    highShot: rng.random(1, 6),
                    lowShot: rng.random(1, 6),
                    longShot: rng.random(1, 6),
                    passing: rng.random(1, 6),
                    handling: rng.random(1, 6),
                },
                defense: {
                    forecheck: rng.random(1, 6),
                    stick: rng.random(1, 6),
                    checking: rng.random(1, 6),
                    positioning: rng.random(1, 6),
                    blocking: rng.random(1, 6)
                },
                goalkeeping: {
                    highBlock: rng.random(1, 6),
                    lowBlock: rng.random(1, 6),
                    longBlock: rng.random(1, 6),
                    catching: rng.random(1, 6),
                    aura: rng.random(1, 6)
                },
                physical: {
                    speed: rng.random(1, 6),
                    strength: rng.random(1, 6),
                    faceoff: rng.random(1, 6),
                    fighting: rng.random(1, 6),
                    blubber: rng.random(1, 6)
                },
                mental: {
                    discipline: rng.random(1, 6),
                    respect: rng.random(1, 6),
                    fear: rng.random(1, 6),
                    vision: rng.random(1, 6),
                    memory: rng.random(1, 6)
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