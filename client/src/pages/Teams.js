

import React, {useState, useEffect, useRef} from "react";
import "../App.css"

function Teams() {
      

    return (
        <div className="App">
            {t1 ? (
            <GameBox t1={t1} t2={t2} t1C={t1C} t2C={t2C} t1S={t1S} t2S={t2S} pos={pos} per={per} mes={mes} goal1={goal1} side1={side1} center={center} side2={side2} goal2={goal2}/>
            ):(<div><i>loading. . . </i></div>)}</div>
    )
}

export default Teams