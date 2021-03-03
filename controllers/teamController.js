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
    let ogopogo = ["VAN", "OTT", "MON", "TOR", "POR", "SEA"]
    let igopogo = ["BUF", "WVM", "ROC", "NOR", "NSH", "KCS"]
    let chessie = ["NYR", "PHL", "BOS", "CHI", "PIT", "MIN"]
    let nessie = ["BUR", "SFB", "VAL", "LAK", "LIB", "MOS"]
    let bush = ["FAR", "DCH", "HOU", "BAL", "MAT", "CLE", "NDD", "SJP"]
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
    bush[0] = await getTeam(bush[0])
    bush[1] = await getTeam(bush[1])
    bush[2] = await getTeam(bush[2])
    bush[3] = await getTeam(bush[3])
    bush[4] = await getTeam(bush[4])
    bush[5] = await getTeam(bush[5])
    bush[6] = await getTeam(bush[6])
    bush[7] = await getTeam(bush[7])
    var data = [ogopogo, igopogo, chessie, nessie, bush]
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