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
    let ogopogo = ["VAN", "OTT", "MON", "TOR", "POR", "SEA"]
    let igopogo = ["BUF", "WVM", "ROC", "NOR", "NSH", "SBH"]
    let chessie = ["NYR", "PHL", "BOS", "CHI", "PIT", "MIN"]
    let nessie = ["BUR", "SFB", "VAL", "LAK", "LIB", "MOS"]
    ogopogo[0] = await getTeam(ogopogo[0])
    ogopogo[1] = await getTeam(ogopogo[1])
    ogopogo[2] = await getTeam(ogopogo[2])
    ogopogo[3] = await getTeam(ogopogo[3])
    ogopogo[4] = await getTeam(ogopogo[4])
    ogopogo[5] = await getTeam(ogopogo[5])
    igopogo[0] = await getTeam(igopogo[0])
    igopogo[1] = await getTeam(igopogo[1])
    igopogo[2] = await getTeam(igopogo[2])
    igopogo[3] = await getTeam(igopogo[3])
    igopogo[4] = await getTeam(igopogo[4])
    igopogo[5] = await getTeam(igopogo[5])
    chessie[0] = await getTeam(chessie[0])
    chessie[1] = await getTeam(chessie[1])
    chessie[2] = await getTeam(chessie[2])
    chessie[3] = await getTeam(chessie[3])
    chessie[4] = await getTeam(chessie[4])
    chessie[5] = await getTeam(chessie[5])
    nessie[0] = await getTeam(nessie[0])
    nessie[1] = await getTeam(nessie[1])
    nessie[2] = await getTeam(nessie[2])
    nessie[3] = await getTeam(nessie[3])
    nessie[4] = await getTeam(nessie[4])
    nessie[5] = await getTeam(nessie[5])
    var data = [ogopogo, igopogo, chessie, nessie]
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