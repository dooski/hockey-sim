const data = require("./gens/data.json")
const sim = require("./gens/sim.js")
const records = require("./gens/seasonManagement.js")
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
    records.syncRecord()
    sim.game(games[0], 6000, "game1")
    sim.game(games[1], 6000, "game2")
    sim.game(games[2], 6000, "game3")
    sim.game(games[3], 6000, "game4")
    sim.game(games[4], 6000, "game5")
    sim.game(games[5], 6000, "game6")
    sim.game(games[6], 6000, "game7")
    sim.game(games[7], 6000, "game8")
    setInterval(packageGames, 1000)  
}

function pickTeams(x){
    let gamesList = []
    let league = x
    for (i = 0; i < 8; i++ ){
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
    fs.readFile('./gens/currentGames.json', 'utf8', (err, data) => 
    {if (err) { console.log(err)} 
    var json = JSON.parse(data)
    res.json(json)})
}

async function packageGames(){
    currentGames().then(packageCombined => {
    var json = JSON.stringify(packageCombined)
    fs.writeFile('./gens/currentGames.json', json, 'utf8', function(err) {
        if (err) throw err;
    })
})}

const currentGames = async function() {
    let game1 = await getGame("./gens/games/game1.json")
    let game2 = await getGame("./gens/games/game2.json")
    let game3 = await getGame("./gens/games/game3.json")
    let game4 = await getGame("./gens/games/game4.json")
    let game5 = await getGame("./gens/games/game5.json")
    let game6 = await getGame("./gens/games/game6.json")
    let game7 = await getGame("./gens/games/game7.json")
    let game8 = await getGame("./gens/games/game8.json")
    let records = await getGame("./gens/currentSeason.json")
    return [game1, game2, game3, game4, game5, game6, game7, game8]
    }

function getGame(fileName) {
    return new Promise(resolve => {
    fs.readFile(fileName, 'utf8', (err, data) => 
    {if (err) { console.log(err)} 
    var json = JSON.parse(data)
    resolve(json)})
})
}

function varString(a, b){
    let teamAobj = eval("data.teams." + a)
    let teamBobj = eval("data.teams." + b)
    return [teamAobj, teamBobj]
}
module.exports = {
    test,
    scheduleMaker,
    packageReturn
}