import { ReactComponent as Logo} from '../logo.svg'
import Symbol from "../components/TeamEmojis"
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"
import AccountBox from "../components/AccountBox"
import API from "../utils/API";
import "../App.css"

function Home() {
  const [userData, setUserData] = useState()
  const [teamData, setTeam] = useState()
useEffect(() => {
    API.loadUser()
        .then((res) => {
            setUserData(res.data)
            API.getTeam().then((res) => {setTeam(res.data)})
        })
        .catch((err) => {
            console.log(err);
        })
}, [])


  return (
    <div className="home-wrapper">
      <div className="home-header">
        <p>Welcome to the Plond*</p>
        <i className="home-sub">*It's like a pond, but harder to conceptualize.</i>
      </div>
      <div className="quotes columns">
        <div className="column is-4">
          {!userData ? (<Link to="/login">Click here to login or make an account</Link>) : (<AccountBox user={userData} team={teamData}/>)}
        </div>
        <div className="column is-4">
          {!userData ? (<Logo style={{width: "80%"}}/>) : (<Symbol abrv={userData.team} alt="true"/>)}
        </div>
        <div className="column is-4">
<p className="quote">"Must've Been the Cheese" <p className="source">- Matt Bosque, a guy</p></p>
<br/><br/>
<p className="quote">"Why Are The Chowdahs So Bad?" <p className="source">- Bryan Hill, Dan's manager</p></p>        
        </div>
      </div>
      <div className="home-content columns">
        <div className="column is-7">
          <div className="home-info-wrapper" >
          <p style={{fontSize: "32px", textAlign: "center", fontWeight: "1000"}}>THE PLONDSPIEL</p>
          <p style={{fontSize: "22px", textAlign: "center", fontWeight: "500", fontStyle: "italic"}}>News from around the Plond</p>
          <hr style={{backgroundColor: "black"}}/>
          <ul>
          <li>
          <p style={{fontWeight: "900", fontSize: "20px"}}>"ETERNAL PRESEASON"!</p>
          <p>Due to a lack of the coordination skills necessary to facilitate a full season, the Front Office has declared an Eternal Preseason
            until all teams can afford to buy a calendar. Teams will play every hour on the :30s and players may be Rematerialized, at the discretion of the Plond.
          </p>
          </li>
          <br/>
          <li>
          <i style={{fontWeight: "700", fontSize: "18px"}}>Bush League Begins Play</i>
          <p>The Bush League will begin play under the shadows of the Eternal Preseason. The inaugural Toilet Division will try to determine the best of the worst, and should
            the Eternal Preseason end, Toilet League teams will have a chance to make it to the big time. The new competition format has the top 4 teams of the Toilet League
            replace the worst team in each division of the Big League at the end of the season. Players playing in the Bush League will also have a chance of growing each game.
          </p>
          </li>
          <br/>
          <li>
          <i style={{fontWeight: "700", fontSize: "18px"}}>Plond Law Research Breakthrough Announced</i>
          <p>Plond researchers have discovered the Plond does not consider Fighting to be inherently bad and will not penalize players for Fighting. All players
            on the winning team of a Fight will be Fired Up for four minutes.
          </p>
          </li>
          </ul>
          </div>
        </div>
        <div className="column is-5" style={{padding: "20px"}}>
          <p>Plond Hockey is hockey played on a plond, which is a sentient frozen body of water. Twenty-four teams play in Plond Hockey's primary league, the Big League. There are two conferences in the Big League: Bingo and Bongo. The Bingo Conference is made up of the Ogopogo and Igopogo divisions, while the Bongo Conference is made up of the Chessie and Nessie divisions.
          <br/><br/>Games end in a win or a loss. Tied scores are resolved with a Sudden Death overtime. There is no reward for losing in overtime. The Plond is binary.
          <br/><br/>The Plond serves as the rink, the arena, and the law. Players committing actions deemed illegal by the Plond are penalized. These are known as Penalties. The player is Frozen and their power is given to the other team for five minutes of play. This is known as a Power Play. Research continues on the Plond's internal legal system.
</p>
        </div>
      </div>
    </div>
  )
}


export default Home