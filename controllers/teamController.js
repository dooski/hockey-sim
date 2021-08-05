const db = require("../models");
const playerController = require("./playerController")

function getTeam(abrv) {
    return new Promise(resolve => {
        db.Team.find({ 'info.abrv': abrv },
            async (err, data) => {
                if (err) { console.log(err) }
                let team = (JSON.parse(JSON.stringify(data[0])))
                team.players.l1.a = await playerController.getPlayer(team.players.l1.a)
                team.players.l1.b = await playerController.getPlayer(team.players.l1.b)
                team.players.l1.c = await playerController.getPlayer(team.players.l1.c)
                team.players.l2.a = await playerController.getPlayer(team.players.l2.a)
                team.players.l2.b = await playerController.getPlayer(team.players.l2.b)
                team.players.l2.c = await playerController.getPlayer(team.players.l2.c)
                team.players.g.a = await playerController.getPlayer(team.players.g.a)
                team.players.b.a = await playerController.getPlayer(team.players.b.a)
                team.players.b.b = await playerController.getPlayer(team.players.b.b)
                team.players.b.c = await playerController.getPlayer(team.players.b.c)
                resolve(team)
            })
    })
}
async function getTeams(req, res) {
    let bingo = ["TOR", "MON", "BUF", "BOS", "NYR", "HOU", "SJP", "CHI", "PIT"]
    let bongo = ["ROC", "BAL", "MIN", "PHL", "LAK", "WVM", "NSH", "VAL"]
    bingo[0] = await getTeam(bingo[0])
    bingo[1] = await getTeam(bingo[1])
    bingo[2] = await getTeam(bingo[2])
    bingo[3] = await getTeam(bingo[3])
    bingo[4] = await getTeam(bingo[4])
    bingo[5] = await getTeam(bingo[5])
    bingo[6] = await getTeam(bingo[6])
    bingo[7] = await getTeam(bingo[7])
    bingo[8] = await getTeam(bingo[8])
    bongo[0] = await getTeam(bongo[0])
    bongo[1] = await getTeam(bongo[1])
    bongo[2] = await getTeam(bongo[2])
    bongo[3] = await getTeam(bongo[3])
    bongo[4] = await getTeam(bongo[4])
    bongo[5] = await getTeam(bongo[5])
    bongo[6] = await getTeam(bongo[6])
    bongo[7] = await getTeam(bongo[7])

    var data = [bingo, bongo]
    res.json(data)
}
function addWin(abrv) {
    db.Team.findOneAndUpdate({ 'info.abrv': abrv }, { $inc: { 'history.wins': 1 } },
        (err, data) => {
            if (err) { console.log(err) }
        })
}

function addLoss(abrv) {
    db.Team.findOneAndUpdate({ 'info.abrv': abrv }, { $inc: { 'history.losses': 1 } },
        (err, data) => {
            if (err) { console.log(err) }
        })
}
function resetRecord(abrv) {
    db.Team.findOneAndUpdate({ 'info.abrv': abrv }, { 'history.wins': 0, 'history.losses': 0 },
        (err, data) => {
            if (err) { console.log(err) }
        })
}

module.exports = {
    getTeam,
    getTeams,
    addWin,
    addLoss,
    resetRecord
}