const data = require("./gens/data.json")
const sim = require("./gens/sim.js")


function test(){ 
    let teams = [data.teams.buffalo, data.teams.montreal]
    let score = [0, 0]
    for (i = 0; i < 3; i++) {
        sim.period(teams, score)
    }
}

function wait() {
    console.log("hey")
}

let roster = data.teams.rochester.players

let rosterMessage = `
X
X
*** Introducing ${data.teams.rochester.info.full}! ***
On offense, we have ${roster.LW.full}, ${roster.C.full}, and ${roster.RW.full}.
On defense, we have ${roster.LD.full}, ${roster.RD.full}, and ${roster.G.full} in net!
X
X`

module.exports = {
    test
}