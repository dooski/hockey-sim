import React from 'react';
import Symbol from "../TeamEmojis"

function AccountBox(data) {
    let name = data.props.name
    let abrv = data.props.team
    let favors = data.props.favors

    return (
        <div className="account-box">
            <div className="columns is-mobile no-margin">
                <div className="column is-1"><Symbol abrv={abrv}/></div>
                <div className="column is-3">{name}</div>
                <div className="column is-8">You have {favors} favor this week.</div>
            </div>
        </div>
    )
}

export default AccountBox