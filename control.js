const data = require("./gens/data.json")
const sim = require("./gens/sim.js")
const records = require("./gens/seasonManagement.js")
const gameHandler = require("./gens/gameManagement")
const teamGenerator = require("./gens/teamGenerator")
const teamController = require("./controllers/teamController")
const playerController = require("./controllers/playerController")
const returnGames = gameHandler.returnGames
const fs = require("fs")

function rng(z) {
    return Math.floor(Math.random() * z)
}

function scheduleMaker(){
    let teams = varString(teamA, teamB) 
    sim.game(teams, 6000)
}

function test(){
    sim.game([data.teams.philly, data.teams.boston], 4000, 0)
}

async function start(){ 
    let bingo = ["BUF", "BOS", "ROC", "WVM", "MON", "OTT", "NOR", "POR", "TOR", "NSH"]
    let bongo = ["PHL", "BUR", "LAK", "CHI", "SFB", "PIT", "NYR", "VAL", "VAN", "LIB"]
    let games = await pickTeams(bingo, bongo)
    sim.game(games[0], 80, 0)
    sim.game(games[1], 80, 1)
    sim.game(games[2], 80, 2)
    sim.game(games[3], 80, 3)
    sim.game(games[4], 80, 4)
    sim.game(games[5], 80, 5)
    sim.game(games[6], 80, 6)
    sim.game(games[7], 80, 7)
    sim.game(games[8], 80, 8)
    sim.game(games[9], 80, 9)
}

async function pickTeams(x, y){
    return new Promise(async resolve => {
    let gamesList = []
    let league = x.concat(y)
    for (i = 0; i < 10; i++ ){
        let z1 = rng(league.length)
        let team1 = await fetchTeam(league[z1])
        league.splice(z1, 1)
        let z2 = rng(league.length)
        let team2 = await fetchTeam(league[z2])
        league.splice(z2, 1)
        let oneGame = [team1, team2]
        gamesList.push(oneGame)
    }
    resolve(gamesList)})
}

function fetchTeam(x) {
    return new Promise(async resolve => { 
        let team = await teamController.getTeam(x)
        resolve(team)
})}

async function packageReturn(req, res) {
    var pack = returnGames()
    res.json(pack)
}

async function seasonData(req, res) {
    fs.readFile('./gens/currentSeason.json', 'utf8', (err, data) =>
    {if (err) {console.log(err)}
    var json = JSON.parse(data)
    res.json(json)})
}

function varString(a, b){
    let teamAobj = eval("data.teams." + a)
    let teamBobj = eval("data.teams." + b)
    return [teamAobj, teamBobj]
}

function makeTeams(){
    var players = [
        ["Bo Specksgoor", "BUF"],
        ["Sven Hickory", "BUF"],
        ["Rachelle Peach", "BUF"],
        ["Hutch Chiarella", "BUF"],
        ["MX Esquire", "BUF"],
        ["Hella Bosque", "BUF"],
        ["Mimi Chip", "BOS"],
        ["Clam Adams", "BOS"],
        ["Bean Bradley", "BOS"],
        ["Simon Crimock", "BOS"],
        ["Olli Zelda", "BOS"],
        ["Bryan Hell", "BOS"],
        ["Bart Guilfoyle", "ROC"],
        ["Poppy Dake", "ROC"],
        ["Hella Froio", "ROC"],
        ["Crazy Bones", "ROC"],
        ["Petrov Garbo", "ROC"],
        ["Santiago Pistachio", "ROC"],
        ["Amelia Zamboni", "OTT"],
        ["Rachel Berg", "OTT"],
        ["Boomtown Wagner", "OTT"],
        ["Alvin Robot", "OTT"],
        ["Sparky Medina", "OTT"],
        ["Justo Airplane", "OTT"],
        ["Holy Walaprat", "MON"],
        ["Pierre Pizzazz", "MON"],
        ["Celine Twig", "MON"],
        ["Barney Lawrence", "MON"],
        ["Hank Hotdog", "MON"],
        ["JJ Milkman", "MON"],
        ["Mackenzie Lemon", "TOR"],
        ["Hannah Hammer", "TOR"],
        ["Tommy Domino", "TOR"],
        ["Tom Hirtin", "TOR"],
        ["Allison Grunge", "TOR"],
        ["Ed Kirby", "TOR"],
        ["Carrie Sleater", "POR"],
        ["Hank Hudson", "POR"],
        ["Herbie Sprite", "POR"],
        ["Normie Walsh", "POR"],
        ["Martina Hondo", "POR"],
        ["Stonk Kelly", "POR"],
        ["Big Bobby", "WVM"],
        ["Danielle Normalperson", "WVM"],
        ["Bluejay Watkins", "WVM"],
        ["Hoops McElroy", "WVM"],
        ["Brendan O'Sure", "WVM"],
        ["RJ Spider", "WVM"],
        ["Robbin Lupino", "NOR"],
        ["Luigi Gibbons", "NOR"],
        ["Patrice Huxley", "NOR"],
        ["Corey Flinch", "NOR"],
        ["Sarah Crowley", "NOR"],
        ["Byron Gumbo", "NOR"],
        ["Dan Joe", "NSH"],
        ["Ivan Yahontov", "NSH"],
        ["Reba Mackenzie", "NSH"],
        ["Lars Kelvin", "NSH"],
        ["Wes Fallkirk", "NSH"],
        ["Mike Slash", "NSH"],
        ["Izzy Thump", "NYR"],
        ["Skunk Lemiuex", "NYR"],
        ["Lara Babushkin", "NYR"],
        ["Sentient Pizza", "NYR"],
        ["Martin Martino", "NYR"],
        ["Molly Bagels", "NYR"],
        ["Daymor Dangles", "PHL"],
        ["Gregg Wawa", "PHL"],
        ["Avy Blunt", "PHL"],
        ["Elmo Battleaxe", "PHL"],
        ["Julie Blunt", "PHL"],
        ["Oaksy d'Kid", "PHL"],
        ["Claude Roy", "VAN"],
        ["Shinji Otto", "VAN"],
        ["Jessica Highlander", "VAN"],
        ["Andrew Maple", "VAN"],
        ["Lucky Jupiter", "VAN"],
        ["Mats Sharqvist", "VAN"],
        ["Giovanni Schmitz", "CHI"],
        ["Penelope Cleaver", "CHI"],
        ["Butterfly Funk", "CHI"],
        ["Smooth Wojtas", "CHI"],
        ["Igor Kranck", "CHI"],
        ["Deeno Watkins", "CHI"],
        ["Snack Falcon", "PIT"],
        ["Zoey Oaks", "PIT"],
        ["Sid Benson", "PIT"],
        ["Ruth Baby", "PIT"],
        ["Faith McKeon", "PIT"],
        ["Bruce Oaks", "PIT"],
        ["Lucy Stoddart", "BUR"],
        ["Argo Voyager", "BUR"],
        ["Fishy Lupino", "BUR"],
        ["Vladimira Nishikawa", "BUR"],
        ["Betsy Grunge", "BUR"],
        ["Flannel Borowski", "BUR"],
        ["Olimar Champion", "SFB"],
        ["Hillary Applesauce", "SFB"],
        ["Coyote Morris", "SFB"],
        ["Jimmy Kennicott", "SFB"],
        ["Gaspar Sanz", "SFB"],
        ["Derek Van de Berg", "SFB"],
        ["Sven Gudmundur", "VAL"],
        ["Rune Blekksprut", "VAL"],
        ["Gorm Knudsun", "VAL"],
        ["Hilda Ulfsdottir", "VAL"],
        ["Gunhild Gromsdottir", "VAL"],
        ["Spanky McCool", "VAL"],
        ["Bryce Cream", "LAK"],
        ["Tony Puck", "LAK"],
        ["Christina Slush", "LAK"],
        ["Sebbie Oof", "LAK"],
        ["Jordan Oof", "LAK"],
        ["Helen Thrasher", "LAK"],
        ["Isabelle Canada", "LIB"],
        ["Terry Clines", "LIB"],
        ["CJ McCartney", "LIB"],
        ["Bobby Jones", "LIB"],
        ["Anna Stein", "LIB"],
        ["Ole Buckley", "LIB"]
    ]
    var teams = [
        ["Buffalo Starlights", "Buffalo", "Starlights", "Shinin' Just For You", "Bingo", "BUF"],
        ["Boston Chowdahs", "Boston", "Chowdahs", "Like We Say in Boston, Let's Go Boston", "Bingo", "BOS"],
        ["Rochester Bones", "Rochester", "Bones", "The Future is Bones", "Bingo", "ROC"],
        ["Ottawa Tulips", "Ottawa", "Tulips", "Flower Power", "Bingo", "OTT"],
        ["Montreal Panic", "Montreal", "Panic", "Poutine Pucks in the Net!", "Bingo", "MON"],
        ["Toronto Brewskis", "Toronto", "Brewskis", "Grip It and Rip It, Baby", "Bingo", "TOR"],
        ["Portland Shrooms", "Portland", "Shrooms", "Good Sporesmanship", "Bingo", "POR"],
        ["West Virginia Mothmen", "West Virginia", "Mothmen", "Scoring Makes the Light Go On", "Bingo", "WVM"],
        ["New Orleans Moonshine", "New Orleans", "Moonshine", "Is 'Mardi Goals' Anything?", "Bingo", "NOR"],
        ["Nashville Dollys", "Nashville", "Dollys", "Scoring Nine to Five", "Bingo", "NSH"],
        ["New York Rats", "New York", "Rats", "From the Bodega to the Blueline", "Bongo", "NYR"],
        ["Philly Pineapples", "Philadelphia", "Pineapples", "We'll Punt You Off the Ben Franklin Bridge", "Bongo", "PHL"],
        ["Vancouver Foxtrots", "Vancouver", "Foxtrots", "Magically Pacific!", "Bongo", "VAN"],
        ["Chicago Squalls", "Chicago", "Squalls", "Guilt-Free Windy City Hockey", "Bongo", "CHI"],
        ["Pittsburgh Good Boys", "Pittsburgh", "Good Boys", "Yes We Are, Yes We Are", "Bongo", "PIT"],
        ["Burlington Lumberjacks", "Burlington", "Lumberjacks", "Sustainable Forcheckestry", "Bongo", "BUR"],
        ["Santa Fe Buckaroos", "Santa Fe", "Buckaroos", "Buck Up, Knucklepuck", "Bongo", "SFB"],
        ["Valhalla Omens", "Valhalla", "Omens", "Comets, Ravens, Plond Hockey.", "Bongo", "VAL"],
        ["LA Kickflips", "Los Angeles", "Kickflips", "Skate or Die", "Bongo", "LAK"],
        ["Long Island Beach Bums", "Long Island", "Beach Bums", "Strong Island Time, Baby!", "Bongo", "LIB"]
    ]
    for (i = 0; i < players.length; i++){
        teamGenerator.makePlayer(players[i][0], players[i][1])
    }
    for (i = 0; i < teams.length; i++){
        teamGenerator.makeTeam(teams[i][0], teams[i][1], teams[i][2], teams[i][3], teams[i][4], teams[i][5])
    }
}

module.exports = {
    test,
    start,
    scheduleMaker,
    packageReturn,
    seasonData,
    makeTeams
}