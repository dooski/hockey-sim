import React, { useState, useEffect, useRef } from "react";
import GameBox from "../components/GameBox"
import API from '../utils/API'
import "../App.css"

function Games(data) {
let games = data.props
  return (
    <div>
      {games !== null ? (
        games.map((game) =>
          <div className="game-box-container">
            <GameBox props={game} />
          </div>)
      ) : (<div><i>loading . . .</i></div>)}
    </div>
  )
}


export default Games