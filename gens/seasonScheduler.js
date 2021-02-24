const moment = require("moment")
const data = require("./data.json")
const sim = require("./sim.js")
const teamController = require("../controllers/teamController")

    let ogopogo = ["VAN", "OTT", "MON", "TOR", "POR", "SEA"]
    let igopogo = ["BUF", "WVM", "ROC", "NOR", "NSH", "KCS"]
    let chessie = ["NYR", "PHL", "BOS", "CHI", "PIT", "MIN"]
    let nessie = ["BUR", "SFB", "VAL", "LAK", "LIB", "MOS"]
function rng(z) {
    return Math.floor(Math.random() * z)
}

var today = moment().day

async function makeSchedule(){
    let season = []
    for (i = 0; i < 78; i++){
        let ogoSet = await pickTeams(ogopogo)
        let igoSet = await pickTeams(igopogo)
        let cheSet = await pickTeams(chessie)
        let nesSet = await pickTeams(nessie)
        
    }
}

async function start() {

    let games = await pickTeams(ogopogo.concat(igopogo), chessie.concat(nessie))
    //second argument is length of action in each game (60 actions per period x 3 periods and possible overtime)
    sim.game(games[0], 6000, 0)
    sim.game(games[1], 6000, 1)
    sim.game(games[2], 6000, 2)
    sim.game(games[3], 6000, 3)
    sim.game(games[4], 6000, 4)
    sim.game(games[5], 6000, 5)
    sim.game(games[6], 6000, 6)
    sim.game(games[7], 6000, 7)
    sim.game(games[8], 6000, 8)
    sim.game(games[9], 6000, 9)
    sim.game(games[10], 6000, 10)
    sim.game(games[11], 6000, 11)
}

async function pickTeams(x, y) {
    return new Promise(async resolve => {
        let gamesList = []
        let league = x.concat(y)
        for (i = 0; i < 12; i++) {
            let z1 = rng(league.length)
            let team1 = await fetchTeam(league[z1])
            league.splice(z1, 1)
            let z2 = rng(league.length)
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

module.exports = {
    start
}