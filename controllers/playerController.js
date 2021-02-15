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
    }
}