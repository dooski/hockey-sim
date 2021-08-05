const sim = require("./sim.js")
const schedule = require("./seasonSchedule.json")
const teamController = require("../controllers/teamController")
const fs = require("fs")
const { db } = require("../models/season.js")

const timer = ms => new Promise(res => setTimeout(res, ms))

function makeSeason(x){
    let season = new db.Season({
                seasonNumber: x,
                active: true,
                game: 0,
                gameDay: 0,
                playoff: false,
                playoffRound: 0,
                playoffGame: 0,
                regularStandings: {
                    ogo: {
                        first: "VAN",
                        second: "OTT",
                        third: "MON",
                        fourth: "TOR",
                        fifth: "POR",
                        sixth: "SEA"
                    },
                    igo: {
                        first: "BUF",
                        second: "WVM",
                        third: "ROC",
                        fourth: "NOR",
                        fifth: "NSH",
                        sixth: "SBH"
                    },
                    che: {
                        first: "NYR",
                        second: "PHL",
                        third: "BOS",
                        fourth: "CHI",
                        fifth: "PIT",
                        sixth: "MIN"
                    },
                    nes: {
                        first: "BUR",
                        second: "SFB",
                        third: "VAL",
                        fourth: "LAK",
                        fifth: "LIB",
                        sixth: "MOS"
                    }
                },
                playoffStandings: {
                    binSeeds: {
                        first: "",
                        second: "",
                        third: "",
                        fourth: "",
                    },
                    bonSeeds: {
                        first: "",
                        second: "",
                        third: "",
                        fourth: "",
                    },
                    binFinals: {
                        first: "",
                        second: "",
                    },
                    bonFinals: {
                        first: "",
                        second: "",
                    },
                    finals: {
                        first: "",
                        second: "",
                    }
                },
                history: {
                    champion: "",
                    topScorer: "",
                    topLine: "",
                    mostSaves: "",
                    totalGoals: "",
                }
            })
            season.save(function (err) {
                if (err) return handleError(err)
})
}

function rng(z) {
    return Math.floor(Math.random() * z)
}
let ogopogo = ["VAN", "OTT", "MON", "TOR", "POR", "SEA"]
let igopogo = ["BUF", "WVM", "ROC", "NOR", "NSH", "SBH"]
let chessie = ["NYR", "PHL", "BOS", "CHI", "PIT", "MIN"]
let nessie = ["BUR", "SFB", "VAL", "LAK", "LIB", "MOS"]

async function makeSchedule() {
    let season = []
    for (block = 0; block < 15; block++) {
        let day1 = await makeDiv()
        let day2 = await makeDiv()
        let day3 = await makeCrossConf()
        let day4 = await makeCrossDiv()
        let day5 = await makeCrossConf()
        season.push(day1)
        season.push(day2)
        season.push(day3)
        season.push(day4)
        season.push(day5)
    }
    await timer(5000)
    let json = JSON.stringify(season)
    fs.writeFile('./gens/seasonSchedule.json', json, 'utf8', (err) => {
        if (err) throw err;
        console.log('scheduled')
    })
}

async function makeDiv() {
    let ogGames = await pickTeamsSame(ogopogo, 3)
    let igGames = await pickTeamsSame(igopogo, 3)
    let chGames = await pickTeamsSame(chessie, 3)
    let neGames = await pickTeamsSame(nessie, 3)
    let dayGames = ogGames.concat(igGames, chGames, neGames)
    ogopogo = ["VAN", "OTT", "MON", "TOR", "POR", "SEA"]
    igopogo = ["BUF", "WVM", "ROC", "NOR", "NSH", "SBH"]
    chessie = ["NYR", "PHL", "BOS", "CHI", "PIT", "MIN"]
    nessie = ["BUR", "SFB", "VAL", "LAK", "LIB", "MOS"]
    return dayGames
}

// starts a round of ogo vs igo, ches vs nes matchups
async function makeCrossDiv() {
    let biGames = await pickTeamsCross(ogopogo, igopogo, 6)
    let boGames = await pickTeamsCross(chessie, nessie, 6)
    let dayGames = biGames.concat(boGames)
    ogopogo = ["VAN", "OTT", "MON", "TOR", "POR", "SEA"]
    igopogo = ["BUF", "WVM", "ROC", "NOR", "NSH", "SBH"]
    chessie = ["NYR", "PHL", "BOS", "CHI", "PIT", "MIN"]
    nessie = ["BUR", "SFB", "VAL", "LAK", "LIB", "MOS"]
    return dayGames
}

// starts a round of bingo vs bongo matchups
async function makeCrossConf() {
    let games = await pickTeamsCross(ogopogo.concat(igopogo), chessie.concat(nessie), 12)
    let dayGames = games
    return dayGames
}

async function pickTeamsRandom(x, y, z) {
    return new Promise(async resolve => {
        let gamesList = []
        let league = x.concat(y)
        for (i = 0; i < z; i++) {
            let z1 = rng(league.length)
            // let team1 = league[z1]
            let team1 = await fetchTeam(league[z1])
            league.splice(z1, 1)
            let z2 = rng(league.length)
            // let team2 = league[z2]
            let team2 = await fetchTeam(league[z2])
            league.splice(z2, 1)
            let oneGame = [team1, team2]
            gamesList.push(oneGame)
        }
        resolve(gamesList)
    })
}

async function pickTeamsCross(x, y, z) {
    return new Promise(async resolve => {
        let gamesList = []
        let a = x
        let b = y
        for (i = 0; i < z; i++) {
            let z1 = rng(a.length)
            let team1 = a[z1]
            // let team1 = await fetchTeam(a[z1])
            a.splice(z1, 1)
            let z2 = rng(b.length)
            let team2 = b[z2]
            // let team2 = await fetchTeam(b[z2])
            b.splice(z2, 1)
            let oneGame = [team1, team2]
            gamesList.push(oneGame)
        }
        resolve(gamesList)
    })
}

async function pickTeamsSame(x, z) {
    return new Promise(async resolve => {
        let gamesList = []
        let teams = x 
        for (i = 0; i < z; i++) {
            let z1 = rng(teams.length)
            let team1 = teams[z1]
            // let team1 = await fetchTeam(a[z1])
            teams.splice(z1, 1)
            let z2 = rng(teams.length)
            let team2 = teams[z2]
            // let team2 = await fetchTeam(a[z2])
            teams.splice(z2, 1)
            let oneGame = [team1, team2]
            gamesList.push(oneGame)
        }
        resolve(gamesList)
    })
}

// starts a round of completely random matchups (legacy)
async function start() {
    let bingo = igopogo.concat(ogopogo)
    let bongo = chessie.concat(nessie)
    let games = await pickTeamsRandom(bingo, bongo, 12)
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
    sim.game(games[10], 8000, 10)
    sim.game(games[11], 8000, 11)
}

async function fetchTeams(x) {
    return new Promise(async resolve => {
        let gamesList = []
        for (i = 0; i < x.length; i++) {
            let team1 = await fetchTeam(x[i][0])
            let team2 = await fetchTeam(x[i][1])
            let oneGame = [team1, team2]
            gamesList.push(oneGame)
        }
        resolve(gamesList)
})}

function fetchTeam(x) {
    return new Promise(async resolve => {
        let team = await teamController.getTeam(x)
        resolve(team)
    })
}

module.exports = {
    start,
    makeSchedule
}