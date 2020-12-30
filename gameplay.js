const data = require("./gens/data.json")
const sim = require("./gens/sim.js")


function test(){ 
    let teams = [data.teams.newYork, data.teams.philly]
        sim.game(teams)
}

function simSeason(){
    let bingoDiv = [data.teams.buffalo, data.teams.rochester, data.teams.toronto, data.teams.montreal]
    let bongoDiv = [data.teams.newYork, data.teams.philly, data.teams.burlington, data.teams.hartford]
    sim.season(bingoDiv, bongoDiv)
}
module.exports = {
    test,
    simSeason
}