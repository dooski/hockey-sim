let games = [{
    "t1": "",
    "t2": "",
    "t1C": "",
    "t2C": "",
    "t1S": 0,
    "t2S": 0,
    "ab1": "",
    "ab2": "",
    "per": 0,
    "st": 0,
    "pos": 0,
    "car": "",
    "mes": "",
    "time": "00:00"
},
{
    "t1": "",
    "t2": "",
    "t1C": "",
    "t2C": "",
    "t1S": 0,
    "t2S": 0,
    "ab1": "",
    "ab2": "",
    "per": 0,
    "st": 0,
    "pos": 0,
    "car": "",
    "mes": "",
    "time": "00:00"
},
{
    "t1": "",
    "t2": "",
    "t1C": "",
    "t2C": "",
    "t1S": 0,
    "t2S": 0,
    "ab1": "",
    "ab2": "",
    "per": 0,
    "st": 0,
    "pos": 0,
    "car": "",
    "mes": "",
    "time": "00:00"
},
{
    "t1": "",
    "t2": "",
    "t1C": "",
    "t2C": "",
    "t1S": 0,
    "t2S": 0,
    "ab1": "",
    "ab2": "",
    "per": 0,
    "st": 0,
    "pos": 0,
    "car": "",
    "mes": "",
    "time": "00:00"
},
{
    "t1": "",
    "t2": "",
    "t1C": "",
    "t2C": "",
    "t1S": 0,
    "t2S": 0,
    "ab1": "",
    "ab2": "",
    "per": 0,
    "st": 0,
    "pos": 0,
    "car": "",
    "mes": "",
    "time": "00:00"
},
{
    "t1": "",
    "t2": "",
    "t1C": "",
    "t2C": "",
    "t1S": 0,
    "t2S": 0,
    "ab1": "",
    "ab2": "",
    "per": 0,
    "st": 0,
    "pos": 0,
    "car": "",
    "mes": "",
    "time": "00:00"
},
{
    "t1": "",
    "t2": "",
    "t1C": "",
    "t2C": "",
    "t1S": 0,
    "t2S": 0,
    "ab1": "",
    "ab2": "",
    "per": 0,
    "st": 0,
    "pos": 0,
    "car": "",
    "mes": "",
    "time": "00:00"
},
{
    "t1": "",
    "t2": "",
    "t1C": "",
    "t2C": "",
    "t1S": 0,
    "t2S": 0,
    "ab1": "",
    "ab2": "",
    "per": 0,
    "st": 0,
    "pos": 0,
    "car": "",
    "mes": "",
    "time": "00:00"
},
{
    "t1": "",
    "t2": "",
    "t1C": "",
    "t2C": "",
    "t1S": 0,
    "t2S": 0,
    "ab1": "",
    "ab2": "",
    "per": 0,
    "st": 0,
    "pos": 0,
    "car": "",
    "mes": "",
    "time": "00:00"
}
]

function handleGame(package, whichGame) {
    games[eval(whichGame)]= package
}

function returnGames() {
    return [games]
}

module.exports = {
    handleGame,
    returnGames
}