function zp(z) {
    return Math.floor(Math.random() * z)
}

function playmaker(code, roster){
    let situation = translateCode(code)
    let h = [eval("roster." + situation[2][0]), eval("roster." + situation[2][1]), eval("roster." + situation[2][2])]
    let a = [eval("roster." + situation[3][0]), eval("roster." + situation[3][1]), eval("roster." + situation[3][2])]
    console.log(h)
    console.log(a)
    let outcome = runPlay(h, a, situation[0], situation[4])
    return outcome
}

function translateCode(code){
    let whereOnIce = code.substr(2, 2)
    let possession = code.substr(6, 1)
    let carrier = code.substr(4, 3)
    let playerRaw = code.substr(7, code.length - 7)
    let involved = playerRaw.match(/.{3}/g)
    let home = []
    let away = []
    for (i = 0; i < involved.length; i++){
        if (involved[i].includes(0)) {home.push(involved[i])} else away.push(involved[i])
    }
    if (possession == 0) {home.push(carrier)} else away.push(carrier) 
    let situation = [whereOnIce, carrier, home, away, possession]
    return situation
}
//h and a is home and away roster respectively
//w is where on the ice the play is taking place
//p is possession
//returns three values:
//////scores: 00 (no) 10 (home scores) 11 (away scores)
//////carrier: player code (if none, xxx)
//////movement: 
function runPlay(h, a, w, p){

}

module.exports = {
    playmaker
}