const data = require("./gens/data.json")
const sim = require("./gens/sim.js")
const fs = require("fs")

function rng(z) {
    return Math.floor(Math.random() * z)
}

function test(){ 
    const league = [data.teams.buffalo, data.teams.rochester, data.teams.ottawa, data.teams.newYork, data.teams.philly, data.teams.pittsburgh, data.teams.chicago, data.teams.westVirginia, data.teams.newOrleans, data.teams.santaFe, data.teams.valhalla, data.teams.LA]
    let teams = pickTeams(league)
    sim.game(teams, 6000) 
}

function pickTeams(league){
    let z1 = rng(league.length)
    let team1 = league[z1]
    league.splice(z1, 1)
    let z2 = rng(league.length)
    let team2 = league[z2]
    return [team1, team2]
}

setInterval(test, 1085000)

async function packageReturn(req, res) {
    fs.readFile('./gens/currentGame.json', 'utf8', (err, data) => 
    {if (err) { console.log(err)} 
    var json = JSON.parse(data)
    res.json(json)})
}

module.exports = {
    test,
    packageReturn
}