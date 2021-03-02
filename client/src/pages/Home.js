import { ReactComponent as Logo} from '../logo.svg'
import React from "react";
import AccountBox from "../components/AccountBox"
import "../App.css"

function Home() {
let account = {
  name: "dooski",
  team: "BUF",
  favors: 1
}
let favor1 = {
  title: "Let Them Ice Cake",
  desc: "Defenders receives a Cake to Ice"
}
let favor2 = {
  title: "New Glasses",
  desc: "Forwards improves their passing by 10%"
}
let favor3 = {
  title: "Pregame Coffee",
  desc: "Team improves speed by 5%"
}
let favor4 = {
  title: "Watch the Throne",
  desc: "Top team in your division swaps with lowest team in other division"
}

  return (
    <div className="home-wrapper">
      <div className="home-header">
        <p>Welcome to the Plond*</p>
        <i className="home-sub">*It's like a pond, but harder to conceptualize.</i>
      </div>
      <div className="quotes columns">
        <div className="column is-4">
<p className="quote">"Like Blaseball but with More Ice"<p className="source">- Amanda Silberling, verified Twitter user</p></p>
<br/><br/>
<p className="quote">"Jump into the Plond" <p className="source">- Will LaPorte, unverified Twitter user</p></p>  

        </div>
        <div className="column is-4">
          <Logo style={{width: "80%"}}/>
        </div>
        <div className="column is-4">
<p className="quote">"Must've Been the Cheese" <p className="source">- Matt Bosque, a guy</p></p>
<br/><br/>
<p className="quote">"Why Are The Chowdahs So Bad, Dan??" <p className="source">- Bryan Hill, Dan's manager</p></p>        
        </div>
      </div>
      <div className="home-content columns">
        <div className="column is-4">
          <div className="home-info-wrapper" >
          

          </div>
        </div>
        <div className="column is-8">
          <p>Plond Hockey is hockey played on a plond. There are two divisions in the Plond Hockey League: Bingo and Bongo. Teams play every half hour, indefinitely.
          <br/><br/>Games end in a win or a loss. Tied scores are resolved with a Sudden Death overtime. There is no reward for losing in overtime besides getting to go curl on the Plond of Losers.
          <br/><br/>The Plond serves as the rink, the arena, and the law. Players committing actions deemed illegal by the Plond are penalized. These are known as Penalties. The player is Frozen and their power is given to the other team for five minutes of play. This is known as a Power Play. The Plond has not made clear its laws, but seems alright with fighting.
</p>
        </div>
      </div>
    </div>
  )
}


export default Home