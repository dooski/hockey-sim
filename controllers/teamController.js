const db = require("../models");
const playerController = require("./playerController")

function getTeam(abrv) {
    return new Promise(resolve => {
        db.Team.find({ 'info.abrv': abrv },
            async (err, data) => {
                if (err) { console.log(err) }
                let team = (JSON.parse(JSON.stringify(data[0])))
                team.players.line1.LW = await playerController.getPlayer(team.players.line1.LW)
                team.players.line1.CE = await playerController.getPlayer(team.players.line1.CE)
                team.players.line1.RW = await playerController.getPlayer(team.players.line1.RW)
                team.players.line1.LD = await playerController.getPlayer(team.players.line1.LD)
                team.players.line1.RD = await playerController.getPlayer(team.players.line1.RD)
                team.players.line1.GK = await playerController.getPlayer(team.players.line1.GK)
                team.players.line2.LW = await playerController.getPlayer(team.players.line2.LW)
                team.players.line2.CE = await playerController.getPlayer(team.players.line2.CE)
                team.players.line2.RW = await playerController.getPlayer(team.players.line2.RW)
                team.players.line2.LD = await playerController.getPlayer(team.players.line2.LD)
                team.players.line2.RD = await playerController.getPlayer(team.players.line2.RD)
                team.players.line2.GK = await playerController.getPlayer(team.players.line2.GK)
                resolve(team)
            })
    })
}
async function getTeams(req, res) {
    let bingo = ["MON", "ROC", "OTT", "POR", "WVM", "BUF", "BOS", "TOR", "NOR", "NSH"]
    let bongo = ["PHL", "BUR", "VAN", "CHI", "SFB", "VAL", "LAK", "PIT", "NYR", "LIB"]
    bingo[0] = await getTeam(bingo[0])
    bingo[1] = await getTeam(bingo[1])
    bingo[2] = await getTeam(bingo[2])
    bingo[3] = await getTeam(bingo[3])
    bingo[4] = await getTeam(bingo[4])
    bingo[5] = await getTeam(bingo[5])
    bingo[6] = await getTeam(bingo[6])
    bingo[7] = await getTeam(bingo[7])
    bingo[8] = await getTeam(bingo[8])
    bingo[9] = await getTeam(bingo[9])
    bongo[0] = await getTeam(bongo[0])
    bongo[1] = await getTeam(bongo[1])
    bongo[2] = await getTeam(bongo[2])
    bongo[3] = await getTeam(bongo[3])
    bongo[4] = await getTeam(bongo[4])
    bongo[5] = await getTeam(bongo[5])
    bongo[6] = await getTeam(bongo[6])
    bongo[7] = await getTeam(bongo[7])
    bongo[8] = await getTeam(bongo[8])
    bongo[9] = await getTeam(bongo[9])
    var data = [bingo, bongo]
    res.json(data)
}
function addWin(abrv) {
        db.Team.findOneAndUpdate({ 'info.abrv': abrv }, {$inc : {'history.wins': 1}},
        (err, data) => {
        if (err) {console.log(err)}
        })
}

function addLoss(abrv) {
    db.Team.findOneAndUpdate({ 'info.abrv': abrv }, {$inc : {'history.losses': 1}},
    (err, data) => {
        if (err) {console.log(err)}
        })
}
 function resetRecord(abrv) {
    db.Team.findOneAndUpdate({ 'info.abrv': abrv}, {'history.wins': 0, 'history.losses':0},
    (err, data) => {
        if (err) {console.log(err)}
        })
}

module.exports = {
   getTeam,
   getTeams,
   addWin,
   addLoss,
   resetRecord
}