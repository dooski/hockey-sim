const data = require("./gens/data.json")
const sim = require("./gens/sim.js")
const gameHandler = require("./gens/gameManagement")
const teamGenerator = require("./gens/gens")
const teamController = require("./controllers/teamController")
const playerController = require("./controllers/playerController")
const returnGames = gameHandler.returnGames
const fs = require("fs")

const timer = ms => new Promise(res => setTimeout(res, ms))

function rng(z) {
    return Math.floor(Math.random() * z)
}

function scheduleMaker() {
    let teams = varString(teamA, teamB)
    sim.game(teams, 6000)
}

async function test() {
    let team1 = await fetchTeam("ATH")
    let team2 = await fetchTeam("OLY")
    sim.game([team1, team2], 8000, 0)
}

function wipeRecords() {
    let teams = ["FAR", "DCH", "HOU", "BAL", "MAT", "CLE", "NDD", "SJP", "SEA", "MIN", "MOS", "SBH", "BUF", "BOS", "ROC", "WVM", "MON", "OTT", "NOR", "POR", "TOR", "NSH", "PHL", "BUR", "LAK", "CHI", "SFB", "PIT", "NYR", "VAL", "VAN", "LIB", "ATH", "OLY"]
    for (i = 0; i < teams.length; i++) {
        teamController.resetRecord(teams[i])
    }
}

async function start() {
    let bingo = ["TOR", "MON", "BUF", "BOS", "NYR", "CLE", "SEA", "POR", "CHI", "PIT"]
    let bongo = ["ROC", "BAL", "MIN", "PHL", "LAK", "WVM", "NSH", "VAL", "HOU", "MOS"]    
    let games = await pickTeams(bingo, bongo, 9)
    //second argument is length of action in each game (60 actions per period x 3 periods and possible overtime)
    sim.game(games[0], 8000, 0)
    sim.game(games[1], 8000, 1)
    sim.game(games[2], 8000, 2)
    sim.game(games[3], 8000, 3)
    sim.game(games[4], 8000, 4)
    sim.game(games[5], 8000, 5)
    sim.game(games[6], 8000, 6)
    sim.game(games[7], 8000, 7)
    sim.game(games[8], 8000, 8)
    sim.game(games[9], 8000, 9)
}

async function pickTeams(x, y, z) {
    return new Promise(async resolve => {
        let gamesList = []
        let league = x.concat(y)
        console.log(league)
        for (i = 0; i < z; i++) {
            let z1 = rng(league.length)
            console.log(league[z1])
            let team1 = await fetchTeam(league[z1])
            league.splice(z1, 1)
            let z2 = rng(league.length)
            console.log(league[z2])
            let team2 = await fetchTeam(league[z2])
            league.splice(z2, 1)
            let oneGame = [team1, team2]
            gamesList.push(oneGame)
        }
        resolve(gamesList)
    })
}

function fetchTeam(x) {
    return new Promise(async resolve => {
        let team = await teamController.getTeam(x)
        resolve(team)
    })
}

async function packageReturn(req, res) {
    var pack = returnGames()
    res.json(pack)
}

async function seasonData(req, res) {
    fs.readFile('./gens/currentSeason.json', 'utf8', (err, data) => {
        if (err) { console.log(err) }
        var json = JSON.parse(data)
        res.json(json)
    })
}

function varString(a, b) {
    let teamAobj = eval("data.teams." + a)
    let teamBobj = eval("data.teams." + b)
    return [teamAobj, teamBobj]
}

async function makeTeams() {
    var teams = data.teamLegacy
    makePlayers()
    await timer(10000)
    for (i = 0; i < teams.length; i++) {
        teamGenerator.makeTeam(teams[i][0], teams[i][1], teams[i][2], teams[i][3], teams[i][4], teams[i][5], teams[i][6])
    }
}

async function makePlayers() {
    var first = data.first
    var last = data.last
    var team = data.team
    const num = team.length
    for (i = 0; i < num; i++) {
        let z1 = rng(first.length)
        let firstName = first[z1]
        first.splice(z1, 1)
        let z2 = rng(last.length)
        let lastName = last[z2]
        last.splice(z2, 1)
        let z3 = rng(team.length)
        let chosenTeam = team[z3]
        team.splice(z3, 1)
        let fullName = `${firstName} ${lastName}`
        teamGenerator.makePlayer(fullName, chosenTeam)
    }
}

module.exports = {
    test,
    start,
    scheduleMaker,
    seasonData,
    packageReturn,
    makeTeams,
    wipeRecords,
    makePlayers
}