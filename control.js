const data = require("./gens/data.json")
const sim = require("./gens/sim.js")
const records = require("./gens/records.js")
const gameHandler = require("./gens/gameManagement")
const teamGenerator = require("./gens/teamGenerator")
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
    let teams = ["BUF", "BOS", "ROC", "WVM", "MON", "OTT", "NOR", "POR", "TOR", "NSH", "PHL", "BUR", "LAK", "CHI", "SFB", "PIT", "NYR", "VAL", "VAN", "LIB", "ATH", "OLY"]
    for (i = 0; i < teams.length; i++) {
        teamController.resetRecord(teams[i])
    }
}

async function start() {
    let bingo = ["BUF", "BOS", "ROC", "WVM", "MON", "OTT", "NOR", "POR", "TOR", "CHI"]
    let bongo = ["PHL", "BUR", "LAK", "NSH", "SFB", "PIT", "NYR", "VAL", "VAN", "LIB"]
    let games = await pickTeams(bingo, bongo)
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
}

async function pickTeams(x, y) {
    return new Promise(async resolve => {
        let gamesList = []
        let league = x.concat(y)
        for (i = 0; i < 10; i++) {
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
    var players = [
        ["Delia", "ATH"],
        ["Plato", "ATH"],
        ["Pericles", "ATH"],
        ["Solon", "ATH"],
        ["Cleisthenes", "ATH"],
        ["Themistocles", "ATH"],
        ["Socrates", "ATH"],
        ["Peisistratos", "ATH"],
        ["Thucydides", "ATH"],
        ["Peisistratos", "ATH"],
        ["Aristotle", "ATH"],
        ["Phidias", "ATH"],
        ["Zeus", "OLY"],
        ["Hera", "OLY"],
        ["Poseidon", "OLY"],
        ["Athena", "OLY"],
        ["Demeter", "OLY"],
        ["Ares", "OLY"],
        ["Apollo", "OLY"],
        ["Artemis", "OLY"],
        ["Hephaestus", "OLY"],
        ["Aphrodite", "OLY"],
        ["Hermes", "OLY"],
        ["Dionysus", "OLY"]
    ]
    var teams = [
        ["Athenian Lads", "Athens", "Lads", "Greece Lightning!", "Ancient", "ATH"],
        ["Olympian Gods", "Olympus", "Gods", "*inaudible screaming*", "Ancient", "OLY"],
    ]
    for (i = 0; i < players.length; i++) {
        teamGenerator.makePlayer(players[i][0], players[i][1])
    } await timer(10000)
    for (i = 0; i < teams.length; i++) {
        teamGenerator.makeTeam(teams[i][0], teams[i][1], teams[i][2], teams[i][3], teams[i][4], teams[i][5])
    }
}

async function makeTeam() {
    var teams = [
        ["Buffalo Starlights", "Buffalo", "Starlights", "Shinin' Just For You", "Bingo", "BUF"],
        ["Boston Chowdahs", "Boston", "Chowdahs", "Like We Say in Boston, Let's Go Boston", "Bingo", "BOS"],
        ["Rochester Bones", "Rochester", "Bones", "The Future is Bones", "Bingo", "ROC"],
        ["Ottawa Tulips", "Ottawa", "Tulips", "Flower Power", "Bingo", "OTT"],
        ["Montreal Panic", "Montreal", "Panic", "Poutine Pucks in the Net!", "Bingo", "MON"],
        ["Toronto Brewskis", "Toronto", "Brewskis", "Grip It and Rip It, Baby", "Bingo", "TOR"],
        ["Portland Shrooms", "Portland", "Shrooms", "Good Sporesmanship", "Bingo", "POR"],
        ["West Virginia Mothmen", "West Virginia", "Mothmen", "Scoring Makes the Light Go On", "Bingo", "WVM"],
        ["New Orleans Moonshine", "New Orleans", "Moonshine", "Is 'Mardi Goals' Anything?", "Bingo", "NOR"],
        ["Nashville Dollys", "Nashville", "Dollys", "Scoring Nine to Five", "Bingo", "NSH"],
        ["New York Rats", "New York", "Rats", "From the Bodega to the Blueline", "Bongo", "NYR"],
        ["Philly Pineapples", "Philadelphia", "Pineapples", "We'll Punt You Off the Ben Franklin Bridge", "Bongo", "PHL"],
        ["Vancouver Foxtrots", "Vancouver", "Foxtrots", "Magically Pacific!", "Bongo", "VAN"],
        ["Chicago Squalls", "Chicago", "Squalls", "Guilt-Free Windy City Hockey", "Bongo", "CHI"],
        ["Pittsburgh Good Boys", "Pittsburgh", "Good Boys", "Yes We Are, Yes We Are", "Bongo", "PIT"],
        ["Burlington Lumberjacks", "Burlington", "Lumberjacks", "Sustainable Forcheckestry", "Bongo", "BUR"],
        ["Santa Fe Buckaroos", "Santa Fe", "Buckaroos", "Buck Up, Knucklepuck", "Bongo", "SFB"],
        ["Valhalla Omens", "Valhalla", "Omens", "Comets, Ravens, Plond Hockey.", "Bongo", "VAL"],
        ["LA Kickflips", "Los Angeles", "Kickflips", "Skate or Die", "Bongo", "LAK"],
        ["Long Island Beach Bums", "Long Island", "Beach Bums", "Strong Island Time, Baby!", "Bongo", "LIB"]
    ]

}

async function makeSecondLine() {
    var first = data.first
    var last = data.last
    var team = data.team

    for (i = 0; i < 120; i++) {
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
    } await timer(10000)
}

module.exports = {
    test,
    start,
    scheduleMaker,
    packageReturn,
    seasonData,
    makeTeams,
    makeTeam,
    wipeRecords,
    makeSecondLine
}