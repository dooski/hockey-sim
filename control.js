const data = require("./gens/data.json")
const sim = require("./gens/sim.js")
const fs = require("fs")


function test(){ 
    let teams1 = [data.teams.chicago, data.teams.ottawa]
    let teams2 = [data.teams.vancouver, data.teams.boston]
    let teams3 = [data.teams.pittsburgh, data.teams.philly]
    let teams4 = [data.teams.montreal, data.teams.newYork]
    let teams5 = [data.teams.toronto, data.teams.burlington]
    let teams6 = [data.teams.buffalo, data.teams.rochester]
    function g1(){sim.game(teams1, 4800)}
    function g2(){sim.game(teams2, 4800)}
    function g3(){sim.game(teams3, 4800)}
    function g4(){sim.game(teams4, 4800)}
    function g5(){sim.game(teams5, 4800)}
    function g6(){sim.game(teams6, 4800)}
    setTimeout(g1, 100)
    setTimeout(g2, 900200)
    setTimeout(g3, 1800300)
    setTimeout(g4, 2700400)
    setTimeout(g5, 3600500)
    setTimeout(g6, 4500600)
}

setInterval(test, 5501000)

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