const fs = require("fs")

let BUF = ["BUF", "Buffalo Starlights", 0, 0, 0]
let BOS = ["BOS", "Boston Chowdahs", 0, 0, 0]
let ROC = ["ROC", "Rochester Bones", 0, 0, 0]
let OTT = ["OTT", "Ottawa Tulips", 0, 0, 0]
let MON = ["MON", "Montreal Panic", 0, 0, 0]
let TOR = ["TOR", "Toronto Brewskis", 0, 0, 0]
let POR = ["POR", "Portland Shrooms", 0, 0, 0]
let WVM = ["WVM", "West Virginia Mothmen", 0, 0, 0]
let NOR = ["NOR", "New Orleans Moonshine", 0, 0, 0]
let NYR = ["NYR", "New York Rats", 0, 0, 0]
let PHL = ["PHL", "Philly Pineapples", 0, 0, 0]
let VAN = ["VAN", "Vancouver Foxtrots", 0, 0, 0]
let CHI = ["CHI", "Chicago Paloozas", 0, 0, 0]
let PIT = ["PIT", "Pittsburgh Good Boys", 0, 0, 0]
let BUR = ["BUR", "Burlington Lumberjacks", 0, 0, 0]
let SFB = ["SFB", "Santa Fe Buckaroos", 0, 0, 0]
let VAL = ["VAL", "Valhalla Omens", 0, 0, 0]
let LAK = ["LAK", "LA Kickflips", 0, 0, 0]


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
    var package = [BUF, BOS, ROC, OTT, MON, TOR, POR, WVM,
                NOR, NYR, PHL, VAN, CHI, PIT, BUR, SFB, VAL, LAK]
    var json = JSON.stringify(package)
    fs.writeFile('./gens/currentSeason.json', json, 'utf8', function(err){if (err) throw err})
}

let gamesDone = 0

function endOfGame(t1, t2, t1s, t2s) {
    let team1 = t1.info.abrv
    let team2 = t2.info.abrv
    console.log(team1, team2)
    if (t1s > t2s) {
        eval(team1)[2]++
        eval(team2)[3]++
    } else if (t1s < t2s) {
        eval(team1)[3]++
        eval(team2)[2]++
    } else if (t1s === t2s) {eval(team1)[4]++; eval(team2)[4]++}
    gamesDone++   
    if (gamesDone > 8) {
        updateRecord()
        gamesDone = 0
    }
}

module.exports = {
    endOfGame,
    syncRecord,
    updateRecord
}