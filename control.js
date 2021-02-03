const data = require("./gens/data.json")
const sim = require("./gens/sim.js")
const records = require("./gens/seasonManagement.js")
const gameHandler = require("./gens/gameHandler")
const returnGames = gameHandler.returnGames
const fs = require("fs")

function rng(z) {
    return Math.floor(Math.random() * z)
}

function scheduleMaker(){
    let teams = varString(teamA, teamB) 
    sim.game(teams, 6000)
}

function test(){ 
    const league = [data.teams.buffalo, data.teams.boston, data.teams.rochester, data.teams.ottawa, data.teams.montreal, data.teams.toronto, data.teams.portland, data.teams.westVirginia, data.teams.newOrleans,
                    data.teams.newYork, data.teams.philly, data.teams.vancouver, data.teams.chicago, data.teams.pittsburgh, data.teams.burlington, data.teams.santaFe, data.teams.valhalla, data.teams.LA]
    let games = pickTeams(league)
    records.updateRecord()
    sim.game(games[0], 8000, 0)
    sim.game(games[1], 8000, 1)
    sim.game(games[2], 8000, 2)
    sim.game(games[3], 8000, 3)
    sim.game(games[4], 8000, 4)
    sim.game(games[5], 8000, 5)
    sim.game(games[6], 8000, 6)
    sim.game(games[7], 8000, 7)
    sim.game(games[8], 8000, 8)
}

function pickTeams(x){
    let gamesList = []
    let league = x
    for (i = 0; i < 9; i++ ){
        let z1 = rng(league.length)
        let team1 = league[z1]
        league.splice(z1, 1)
        let z2 = rng(league.length)
        let team2 = league[z2]
        league.splice(z2, 1)
        let oneGame = [team1, team2]
        gamesList.push(oneGame)
    }
    return gamesList
}

async function packageReturn(req, res) {
    var pack = returnGames()
    res.json(pack)
}

async function seasonData(req, res) {
    fs.readFile('./gens/currentSeason.json', 'utf8', (err, data) =>
    {if (err) {console.log(err)}
    var json = JSON.parse(data)
    res.json(json)})
}

function varString(a, b){
    let teamAobj = eval("data.teams." + a)
    let teamBobj = eval("data.teams." + b)
    return [teamAobj, teamBobj]
}



module.exports = {
    test,
    scheduleMaker,
    packageReturn,
    seasonData
}