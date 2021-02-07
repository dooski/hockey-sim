const db = require("../models");
const playerController = require("./playerController")

module.exports = {
    getTeam: function (abrv) {
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
                    resolve(team)
                })
        })
    },
    addWin: function (abrv) {
            db.Team.findOneAndUpdate({ 'info.abrv': abrv }, {$inc : {'history.wins': 1}},
            (err, data) => {
            if (err) {console.log(err)}
            console.log(data)})
    },
    addLoss: function (abrv) {
        db.Team.findOneAndUpdate({ 'info.abrv': abrv }, {$inc : {'history.losses': 1}},
        (err, data) => {
            if (err) {console.log(err)}
            console.log(data)})
    },
    resetRecord: function (abrv) {
        db.Team.findOneAndUpdate({ 'info.abrv': abrv}, {'history.wins': 0, 'history.losses':0},
        (err, data) => {
            if (err) {console.log(err)}
            console.log(data)})
    }
}