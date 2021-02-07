import {Twemoji} from "react-emoji-render"
import React from "react"

function Symbol(props){
    let team = props.abrv
    if (team === "BUF") {return (<Twemoji text=":sparkles:"/>)}
    else if (team === "VAN") {return (<Twemoji text=":fox:"/>)}
    else if (team === "ROC") {return (<Twemoji text=":skull:"/>)}
    else if (team === "OTT") {return (<Twemoji text=":tulip:"/>)}
    else if (team === "MON") {return (<Twemoji text=":warning:"/>)}
    else if (team === "TOR") {return (<Twemoji text=":clinking_beer_mugs:"/>)}
    else if (team === "NYR") {return (<Twemoji text=":rat:"/>)}
    else if (team === "PHL") {return (<Twemoji text=":pineapple:"/>)}
    else if (team === "BOS") {return (<Twemoji text=":bowl_with_spoon:"/>)}
    else if (team === "POR") {return (<Twemoji text=":mushroom:"/>)}
    else if (team === "PIT") {return (<Twemoji text=":dog:"/>)}
    else if (team === "BUR") {return (<Twemoji text=":evergreen_tree:"/>)}
    else if (team === "CHI") {return (<Twemoji text=":sailboat:"/>)}
    else if (team === "WVM") {return (<Twemoji text=":nazar_amulet:"/>)}
    else if (team === "NOR") {return (<Twemoji text=":crescent_moon:"/>)}
    else if (team === "SFB") {return (<Twemoji text=":horse:"/>)}
    else if (team === "VAL") {return (<Twemoji text=":comet:"/>)}
    else if (team === "LAK") {return (<Twemoji text=":skateboard:"/>)}
    else if (team === "MSC") {return (<Twemoji text=":heavy_minus_sign:"/>)}
    else if (team === "LIB") {return (<Twemoji text=":beach_with_umbrella:"/>)}
    else if (team === "NSH") {return (<Twemoji text=":microphone:"/>)}
    else if (team === "GOL") {return (<Twemoji text=":police_car_light:"/>)}
    else return null
}

export default Symbol