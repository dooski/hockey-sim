const db = require("../models");



module.exports = {
    getPlayer: function (id) {
        return new Promise(resolve => {
            db.Player.findById(id,
                (err, data) => {
                    if (err) { console.log(err) }
                    resolve(data)
                }).lean()
        })
    },
    addGoal: function (name) {
        db.Player.findOneAndUpdate({ 'name': name }, { $inc: { 'stats.history.goals': 1 } },
            (err, data) => {
                if (err) { console.log(err) }
            })
    },
    addSave: function (name) {
        db.Player.findOneAndUpdate({'name': name}, {$inc: {'stats.history.saves': 1}},
        (err, data) => {
            if (err) { console.log(err) }
        })
    } , 
    addPlus: function(name1, name2, name3) {
        db.Player.findOneAndUpdate({ 'name': name1 }, { $inc: { 'stats.history.plusminus': 1 } },
            (err, data) => {
                if (err) { console.log(err) }
            })
            db.Player.findOneAndUpdate({ 'name': name2 }, { $inc: { 'stats.history.plusminus': 1 } },
            (err, data) => {
                if (err) { console.log(err) }
            })
            db.Player.findOneAndUpdate({ 'name': name3 }, { $inc: { 'stats.history.plusminus': 1 } },
            (err, data) => {
                if (err) { console.log(err) }
            })
    },
    addMinus: function(name1, name2, name3) {
        db.Player.findOneAndUpdate({ 'name': name1 }, { $inc: { 'stats.history.plusminus': -1 } },
            (err, data) => {
                if (err) { console.log(err) }
            })
            db.Player.findOneAndUpdate({ 'name': name2 }, { $inc: { 'stats.history.plusminus': -1 } },
            (err, data) => {
                if (err) { console.log(err) }
            })
            db.Player.findOneAndUpdate({ 'name': name3 }, { $inc: { 'stats.history.plusminus': -1 } },
            (err, data) => {
                if (err) { console.log(err) }
            })
    }
}