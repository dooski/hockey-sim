// const db = require("../models");

// module.exports = {
//     getSeason: function (x) {
//         return new Promise(resolve => {
//             db.Season.find({ 'seasonNumber': x },
//                 async (err, data) => {
//                     if (err) { console.log(err) }
//                     let season = (JSON.parse(JSON.stringify(data[0])))
//                     resolve(season)
//                 })
//         })
//     }
// }