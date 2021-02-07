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
                    highShot: rng.uniform(),
                    lowShot: rng.uniform(),
                    longShot: rng.uniform(),
                    passing: rng.uniform(),
                    handling: rng.uniform(),
                },
                defense: {
                    forecheck: rng.uniform(),
                    stick: rng.uniform(),
                    checking: rng.uniform(),
                    positioning: rng.uniform(),
                    blocking: rng.uniform()
                },
                goalkeeping: {
                    highBlock: rng.uniform(),
                    lowBlock: rng.uniform(),
                    longBlock: rng.uniform(),
                    catching: rng.uniform(),
                    aura: rng.uniform()
                },
                physical: {
                    speed: rng.uniform(),
                    strength: rng.uniform(),
                    faceoff: rng.uniform(),
                    fighting: rng.uniform(),
                    blubber: rng.uniform()
                },
                mental: {
                    discipline: rng.uniform(),
                    respect: rng.uniform(),
                    fear: rng.uniform(),
                    vision: rng.uniform(),
                    memory: rng.uniform()
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