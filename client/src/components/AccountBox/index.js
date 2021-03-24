import React from 'react';
import API from "../../utils/API"

function AccountBox(props) {
    let username = props.user.username
    let personality = props.user.personality
    let teamName = props.team.info.full
    let teamCity = props.team.info.city
    let teamLine = props.team.info.desc
    let teamWins = props.team.history.wins
    let teamLosses = props.team.history.losses
    console.log(props)
    return (
        <div className="account-box">
            <div className="columns is-mobile no-margin">
                <div className="column is-12">
                    <p style={{textAlign: "left"}}>Welcome back to you, <b style={{fontSize: "20px"}}>{username},</b> the {personality} Fan from {teamCity}!</p>
                </div>
            </div>
            <div className="columns is-mobile no-margin" style={{backgroundColor: "limegreen", color: "black", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px"}}>
                <div className="column is-9" style={{textAlign: "left"}}>
                    <b style={{fontSize: "20px"}}>{teamName}</b>
                    <br/>
                    <i>{teamLine}</i>
                </div>
                <div className="column is-3"><br/><b>{teamWins} - {teamLosses}</b></div>
            </div>
        </div>
    )
}

export default AccountBox