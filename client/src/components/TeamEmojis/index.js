import Emoji from "react-emoji-render"
import React from "react"
import { ReactComponent as Buf} from '../../svg/buf.svg'
import { ReactComponent as Van} from '../../svg/van.svg'
import { ReactComponent as Roc} from '../../svg/roc.svg'
import { ReactComponent as Ott} from '../../svg/ott.svg'
import { ReactComponent as Mon} from '../../svg/mon.svg'
import { ReactComponent as Tor} from '../../svg/tor.svg'
import { ReactComponent as Nyr} from '../../svg/nyr.svg'
import { ReactComponent as Phl} from '../../svg/phl.svg'
import { ReactComponent as Bos} from '../../svg/bos.svg'
import { ReactComponent as Por} from '../../svg/por.svg'
import { ReactComponent as Pit} from '../../svg/pit.svg'
import { ReactComponent as Bur} from '../../svg/bur.svg'
import { ReactComponent as Chi} from '../../svg/chi.svg'
import { ReactComponent as Wvm} from '../../svg/wvm.svg'
import { ReactComponent as Nor} from '../../svg/nor.svg'
import { ReactComponent as Sfb} from '../../svg/sfb.svg'
import { ReactComponent as Val} from '../../svg/val.svg'
import { ReactComponent as Lak} from '../../svg/lak.svg'
import { ReactComponent as Lib} from '../../svg/lib.svg'
import { ReactComponent as Nsh} from '../../svg/nsh.svg'
import { ReactComponent as Min} from '../../svg/min.svg'
import { ReactComponent as Sbh} from '../../svg/sbh.svg'
import { ReactComponent as Sea} from '../../svg/sea.svg'
import { ReactComponent as Mos} from '../../svg/mos.svg'
import { ReactComponent as Far} from '../../svg/far.svg'
import { ReactComponent as Dch} from '../../svg/dch.svg'
import { ReactComponent as Hou} from '../../svg/hou.svg'
import { ReactComponent as Bal} from '../../svg/bal.svg'
import { ReactComponent as Mat} from '../../svg/mat.svg'
import { ReactComponent as Cle} from '../../svg/cle.svg'
import { ReactComponent as Ndd} from '../../svg/ndd.svg'
import { ReactComponent as Sjp} from '../../svg/sjp.svg'

import "./style.css"

function Symbol(props) {
    let sizing = {width: "36px", height: "auto", verticalAlign: "middle"}
    if (props.alt === "true") {sizing = {width: "280px", animation: "roll-in-blurred-left 0.65s cubic-bezier(0.230, 1.000, 0.320, 1.000) 0.5s both"}}
    let team = props.abrv
    if (team === "BUF") { return (<Buf style={sizing}/>) }
    else if (team === "VAN") { return (<Van style={sizing}/>) }
    else if (team === "ROC") { return (<Roc style={sizing}/>) }
    else if (team === "OTT") { return (<Ott style={sizing}/>) }
    else if (team === "MON") { return (<Mon style={sizing}/>) }
    else if (team === "TOR") { return (<Tor style={sizing}/>) }
    else if (team === "NYR") { return (<Nyr style={sizing}/>) }
    else if (team === "PHL") { return (<Phl style={sizing}/>) }
    else if (team === "BOS") { return (<Bos style={sizing}/>) }
    else if (team === "POR") { return (<Por style={sizing}/>) }
    else if (team === "PIT") { return (<Pit style={sizing}/>) }
    else if (team === "BUR") { return (<Bur style={sizing}/>) }
    else if (team === "CHI") { return (<Chi style={sizing}/>) }
    else if (team === "WVM") { return (<Wvm style={sizing}/>) }
    else if (team === "NOR") { return (<Nor style={sizing}/>) }
    else if (team === "SFB") { return (<Sfb style={sizing}/>) }
    else if (team === "VAL") { return (<Val style={sizing}/>) }
    else if (team === "LAK") { return (<Lak style={sizing}/>) }
    else if (team === "LIB") { return (<Lib style={sizing}/>) }
    else if (team === "NSH") { return (<Nsh style={sizing}/>) }
    else if (team === "MIN") { return (<Min style={sizing}/>) }
    else if (team === "SBH") { return (<Sbh style={sizing}/>) }
    else if (team === "SEA") { return (<Sea style={sizing}/>) }
    else if (team === "MOS") { return (<Mos style={sizing}/>) }
    else if (team === "FAR") { return (<Far style={sizing}/>) }
    else if (team === "DCH") { return (<Dch style={sizing}/>) }
    else if (team === "HOU") { return (<Hou style={sizing}/>) }
    else if (team === "BAL") { return (<Bal style={sizing}/>) }
    else if (team === "MAT") { return (<Mat style={sizing}/>) }
    else if (team === "CLE") { return (<Cle style={sizing}/>) }
    else if (team === "NDD") { return (<Ndd style={sizing}/>) }
    else if (team === "SJP") { return (<Sjp style={sizing}/>) }    
    else if (team === "MSC") { return (<i style={{color: "white"}}>ice</i>) }
    else if (team === "GOL") { return (<Emoji text=":police_car_light:" />) }
    else if (team === "ATH") { return (<Emoji text=":owl:" />) }
    else if (team === "OLY") { return (<Emoji text=":lightning:" />) }
    else return null
}


export default Symbol