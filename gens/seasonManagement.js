const control = require("../control.js")
const fs = require("fs")

let BUF = [0, 0, 0]
let BOS = [0, 0, 0]
let ROC = [0, 0, 0]
let OTT = [0, 0, 0]
let MON = [0, 0, 0]
let TOR = [0, 0, 0]
let POR = [0, 0, 0]
let WVM = [0, 0, 0]
let NOR = [0, 0, 0]
let NYR = [0, 0, 0]
let PHL = [0, 0, 0]
let VAN = [0, 0, 0]
let CHI = [0, 0, 0]
let PIT = [0, 0, 0]
let BUR = [0, 0, 0]
let SFB = [0, 0, 0]
let VAL = [0, 0, 0]
let LAK = [0, 0, 0]


const syncRecord = async function() {
    let rawRecord = await getRecord()
    BUF = rawRecord.BUF
    BOS = rawRecord.BOS
    ROC = rawRecord.ROC
    OTT = rawRecord.OTT
    MON = rawRecord.MON
    TOR = rawRecord.TOR
    POR = rawRecord.POR
    WVM = rawRecord.WVM
    NOR = rawRecord.NOR
    NYR = rawRecord.NYR
    PHL = rawRecord.PHL
    VAN = rawRecord.VAN
    CHI = rawRecord.CHI
    PIT = rawRecord.PIT
    BUR = rawRecord.BUR
    SFB = rawRecord.SFB
    VAL = rawRecord.VAL
    LAK = rawRecord.LAK
}

function getRecord(){
    return new Promise(resolve => {
        fs.readFile('./gens/currentSeason.json', 'utf8', (err, data) =>
        {if (err) {console.log(err)}
        var json = JSON.parse(data)
        resolve(json)})
    })
}

function updateRecord(){
    var package = {BUF, BOS, ROC, OTT, MON, TOR, POR, WVM,
                NOR, NYR, PHL, VAN, CHI, PIT, BUR, SFB, VAL, LAK}
    var json = JSON.stringify(package)
    console.log(json)
    fs.writeFile('./gens/currentSeason.json', json, 'utf8', function(err){if (err) throw err})
}

let gamesDone = 0

function endOfGame(t1, t2, t1s, t2s) {
    let team1 = t1.info.abrv
    let team2 = t2.info.abrv
    console.log(team1, team2)
    if (t1s > t2s) {
        eval(team1)[0]++
        eval(team2)[1]++
    } else if (t1s < t2s) {
        eval(team1)[1]++
        eval(team2)[0]++
    } else if (t1s === t2s) {eval(team1)[2]++; eval(team2)[2]++}
    gamesDone++   
    if (gamesDone > 7) {
        console.log(gamesDone)
        updateRecord()
        gamesDone = 0
    }
}

module.exports = {
    endOfGame,
    syncRecord
}