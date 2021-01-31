const data = require("./gens/data.json")
const sim = require("./gens/sim.js")
const fs = require("fs")


function test(){ 
    setInterval(test,3800000)
    let teams1 = [data.teams.pittsburgh, data.teams.rochester]
    let teams2 = [data.teams.toronto, data.teams.montreal]
    let teams3 = [data.teams.boston, data.teams.philly]
    let teams4 = [data.teams.buffalo, data.teams.newYork]
    function g1(){sim.game(teams1, 4800)}
    function g2(){sim.game(teams2, 4800)}
    function g3(){sim.game(teams3, 4800)}
    function g4(){sim.game(teams4, 4800)}
    setTimeout(g1, 100)
    setTimeout(g2, 900200)
    setTimeout(g3, 1800300)
    setTimeout(g4, 2700400)
}

async function packageReturn(req, res) {
    fs.readFile('./gens/currentGame.json', 'utf8', (err, data) => 
    {if (err) { console.log(err)} 
    var json = JSON.parse(data)
    res.json(json)})
}

module.exports = {
    test,
    packageReturn
}