const db = require("../models")

var personalities = ["Cool", "Charming", "Weird", "Grizzly"]

function statGen(stat) {
    return Math.random() * ((.4 + stat) - stat + .5) + stat
}

function makePlayer(name, team) {
    let offStat = (Math.floor(Math.random() * 3) + 1)/10
    let defStat = (Math.floor(Math.random() * 3) + 1)/10
    let gkStat = (Math.floor(Math.random() * 4) + 1)/10
    let phyStat = (Math.floor(Math.random() * 3))/10
    let menStat = (Math.floor(Math.random() * 3))/10
    let personality = personalities[Math.random(0, personalities.length)]
    let player = new db.Player({
        name: name,
        currentTeam: team,
        personality: personality,
        alive: true,
        stats: {
            offense: {
                snipe: statGen(offStat),
                snap: statGen(offStat),
                slap: statGen(offStat),
                sauce: statGen(offStat),
                silk: statGen(offStat),
            },
            defense: {
                annoy: statGen(defStat),
                rascal: statGen(defStat),
                thump: statGen(defStat),
                choreography: statGen(defStat),
                blubber: statGen(defStat),
            },
            goalkeeping: {
                swat: statGen(gkStat),
                squish: statGen(gkStat),
                sweetness: statGen(gkStat),
                swallow: statGen(gkStat),
                scream: statGen(gkStat),
            },
            physical: {
                zoom: statGen(phyStat),
                spinach: statGen(phyStat),
                tricks: statGen(phyStat),
                darkness: statGen(phyStat),
                love: statGen(phyStat),
            },
            mental: {
                stoicism: statGen(menStat),
                absurdism: statGen(menStat),
                nihilism: statGen(menStat),
                platonism: statGen(menStat),
                postmodernism: statGen(menStat),
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
                saves: 0,
                plusminus: 0
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
            l1: {
                a: roster[0]._id,
                b: roster[1]._id,
                c: roster[2]._id
            },
            l2: {
                a: roster[3]._id,
                b: roster[4]._id,
                c: roster[5]._id
            },
            g: {
                a: roster[6]._id
            },
            b: {
                a: roster[7]._id,
                b: roster[8]._id,
                c: roster[9]._id
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