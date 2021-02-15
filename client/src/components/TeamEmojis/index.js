import Emoji from "react-emoji-render"
import React from "react"
import "./style.css"

function Symbol(props) {
    let team = props.abrv
    if (team === "BUF") { return (<Emoji className="symbol buf" text=":sparkles:" />) }
    else if (team === "VAN") { return (<Emoji className="symbol van" text=":fox:" />) }
    else if (team === "ROC") { return (<Emoji className="symbol roc" text=":skull:" />) }
    else if (team === "OTT") { return (<Emoji className="symbol ott" text=":tulip:" />) }
    else if (team === "MON") { return (<Emoji className="symbol mon" text=":bomb:" />) }
    else if (team === "TOR") { return (<Emoji className="symbol tor" text=":clinking_beer_mugs:" />) }
    else if (team === "NYR") { return (<Emoji className="symbol nyr" text=":rat:" />) }
    else if (team === "PHL") { return (<Emoji className="symbol phl" text=":pineapple:" />) }
    else if (team === "BOS") { return (<Emoji className="symbol bos" text=":bowl_with_spoon:" />) }
    else if (team === "POR") { return (<Emoji className="symbol por" text=":mushroom:" />) }
    else if (team === "PIT") { return (<Emoji className="symbol pit" text=":dog:" />) }
    else if (team === "BUR") { return (<Emoji className="symbol bur" text=":evergreen_tree:" />) }
    else if (team === "CHI") { return (<Emoji className="symbol chi" text=":sailboat:" />) }
    else if (team === "WVM") { return (<Emoji className="symbol wvm" text=":nazar_amulet:" />) }
    else if (team === "NOR") { return (<Emoji className="symbol nor" text=":crescent_moon:" />) }
    else if (team === "SFB") { return (<Emoji className="symbol sfb" text=":horse:" />) }
    else if (team === "VAL") { return (<Emoji className="symbol val" text=":comet:" />) }
    else if (team === "LAK") { return (<Emoji className="symbol lak" text=":skateboard:" />) }
    else if (team === "MSC") { return (<Emoji text=":heavy_minus_sign:" />) }
    else if (team === "LIB") { return (<Emoji className="symbol lib" text=":beach_with_umbrella:" />) }
    else if (team === "NSH") { return (<Emoji className="symbol nsh" text=":microphone:" />) }
    else if (team === "GOL") { return (<Emoji text=":police_car_light:" />) }
    else if (team === "ATH") { return (<Emoji text=":owl:" />) }
    else if (team === "OLY") { return (<Emoji text=":lightning:" />) }
    else return null
}


export default Symbol