const teamController = require("../controllers/teamController")

let gamesDone = 0

function endOfGame(t1, t2, t1s, t2s) {
    let team1 = t1.info.abrv
    let team2 = t2.info.abrv
    console.log(team1, team2)
    if (t1s > t2s) {
        teamController.addWin(team1)
        teamController.addLoss(team2)
    } else if (t1s < t2s) {
        teamController.addLoss(team1)
        teamController.addWin(team2)
    }
    gamesDone++   
    if (gamesDone > 8) {
        gamesDone = 0
    }
}

function recordGoal(scorer){
    
}

let games = [{
    "t1": "",
    "t2": "",
    "t1C": "",
    "t2C": "",
    "t1S": 0,
    "t2S": 0,
    "ab1": "",
    "ab2": "",
    "per": 0,
    "st": 0,
    "pos": 0,
    "car": "",
    "mes": "",
    "time": "00:00"
},
{
    "t1": "",
    "t2": "",
    "t1C": "",
    "t2C": "",
    "t1S": 0,
    "t2S": 0,
    "ab1": "",
    "ab2": "",
    "per": 0,
    "st": 0,
    "pos": 0,
    "car": "",
    "mes": "",
    "time": "00:00"
},
{
    "t1": "",
    "t2": "",
    "t1C": "",
    "t2C": "",
    "t1S": 0,
    "t2S": 0,
    "ab1": "",
    "ab2": "",
    "per": 0,
    "st": 0,
    "pos": 0,
    "car": "",
    "mes": "",
    "time": "00:00"
},
{
    "t1": "",
    "t2": "",
    "t1C": "",
    "t2C": "",
    "t1S": 0,
    "t2S": 0,
    "ab1": "",
    "ab2": "",
    "per": 0,
    "st": 0,
    "pos": 0,
    "car": "",
    "mes": "",
    "time": "00:00"
},
{
    "t1": "",
    "t2": "",
    "t1C": "",
    "t2C": "",
    "t1S": 0,
    "t2S": 0,
    "ab1": "",
    "ab2": "",
    "per": 0,
    "st": 0,
    "pos": 0,
    "car": "",
    "mes": "",
    "time": "00:00"
},
{
    "t1": "",
    "t2": "",
    "t1C": "",
    "t2C": "",
    "t1S": 0,
    "t2S": 0,
    "ab1": "",
    "ab2": "",
    "per": 0,
    "st": 0,
    "pos": 0,
    "car": "",
    "mes": "",
    "time": "00:00"
},
{
    "t1": "",
    "t2": "",
    "t1C": "",
    "t2C": "",
    "t1S": 0,
    "t2S": 0,
    "ab1": "",
    "ab2": "",
    "per": 0,
    "st": 0,
    "pos": 0,
    "car": "",
    "mes": "",
    "time": "00:00"
},
{
    "t1": "",
    "t2": "",
    "t1C": "",
    "t2C": "",
    "t1S": 0,
    "t2S": 0,
    "ab1": "",
    "ab2": "",
    "per": 0,
    "st": 0,
    "pos": 0,
    "car": "",
    "mes": "",
    "time": "00:00"
},
{
    "t1": "",
    "t2": "",
    "t1C": "",
    "t2C": "",
    "t1S": 0,
    "t2S": 0,
    "ab1": "",
    "ab2": "",
    "per": 0,
    "st": 0,
    "pos": 0,
    "car": "",
    "mes": "",
    "time": "00:00"
},
{
    "t1": "",
    "t2": "",
    "t1C": "",
    "t2C": "",
    "t1S": 0,
    "t2S": 0,
    "ab1": "",
    "ab2": "",
    "per": 0,
    "st": 0,
    "pos": 0,
    "car": "",
    "mes": "",
    "time": "00:00"
},
{
    "t1": "",
    "t2": "",
    "t1C": "",
    "t2C": "",
    "t1S": 0,
    "t2S": 0,
    "ab1": "",
    "ab2": "",
    "per": 0,
    "st": 0,
    "pos": 0,
    "car": "",
    "mes": "",
    "time": "00:00"
},
{
    "t1": "",
    "t2": "",
    "t1C": "",
    "t2C": "",
    "t1S": 0,
    "t2S": 0,
    "ab1": "",
    "ab2": "",
    "per": 0,
    "st": 0,
    "pos": 0,
    "car": "",
    "mes": "",
    "time": "00:00"
},
{
    "t1": "",
    "t2": "",
    "t1C": "",
    "t2C": "",
    "t1S": 0,
    "t2S": 0,
    "ab1": "",
    "ab2": "",
    "per": 0,
    "st": 0,
    "pos": 0,
    "car": "",
    "mes": "",
    "time": "00:00"
},
{
    "t1": "",
    "t2": "",
    "t1C": "",
    "t2C": "",
    "t1S": 0,
    "t2S": 0,
    "ab1": "",
    "ab2": "",
    "per": 0,
    "st": 0,
    "pos": 0,
    "car": "",
    "mes": "",
    "time": "00:00"
},
{
    "t1": "",
    "t2": "",
    "t1C": "",
    "t2C": "",
    "t1S": 0,
    "t2S": 0,
    "ab1": "",
    "ab2": "",
    "per": 0,
    "st": 0,
    "pos": 0,
    "car": "",
    "mes": "",
    "time": "00:00"
},
{
    "t1": "",
    "t2": "",
    "t1C": "",
    "t2C": "",
    "t1S": 0,
    "t2S": 0,
    "ab1": "",
    "ab2": "",
    "per": 0,
    "st": 0,
    "pos": 0,
    "car": "",
    "mes": "",
    "time": "00:00"
},
{
    "t1": "",
    "t2": "",
    "t1C": "",
    "t2C": "",
    "t1S": 0,
    "t2S": 0,
    "ab1": "",
    "ab2": "",
    "per": 0,
    "st": 0,
    "pos": 0,
    "car": "",
    "mes": "",
    "time": "00:00"
}
]

function handleGame(package, whichGame) {
    games[eval(whichGame)]= package
}

function returnGames() {
    return [games]
}

module.exports = {
    handleGame,
    returnGames,
    endOfGame
}