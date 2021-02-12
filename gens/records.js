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

module.exports = {
    endOfGame
}