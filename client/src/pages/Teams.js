import React, { useState, useEffect, useRef } from "react";
import "../App.css"
import Modal from "react-modal"
import API from "../utils/API"
import Symbol from "../components/TeamEmojis"
import ModalRoster from "../components/ModalRoster"

function Teams() {
    Modal.setAppElement('#root')

    const [isOpen, setIsOpen] = useState(false);
    const [currentTeam, setCurrentTeam] = useState(null)
    const [bingo, setBin] = useState(null)
    const [bongo, setBon] = useState(null)

    useEffect(() => {
        UpdateTable();
    }, []);

    function UpdateTable() {
        API.getTeams()
            .then((res) => {
                let data = res.data
                console.log(res.data)
                let binRaw = data[0]
                let bonRaw = data[1]
                binRaw.sort(Sorter)
                bonRaw.sort(Sorter)
                setBin(binRaw)
                setBon(bonRaw)
            })
    }

    function Sorter(a, b) {
        if (a.history.wins > b.history.wins) return -1;
        if (a.history.wins < b.history.wins) return 1;
        return 0
    }

    function openModal(team) {
        setCurrentTeam(team)
        setIsOpen(true)
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera;
    }
    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <div>
                {currentTeam !== null && isOpen==true ? (
                    <div className="team-box">
                        <div onClick={closeModal}>
                            <p  style={{backgroundColor: "black", border: "1px silver solid", borderTopLeftRadius: "5px", borderTopRightRadius: "5px", fontSize: "12px", fontWeight:"500", position:"relative", left:"10px", bottom: "-10px", textAlign:"left", zIndex: "99", height: "30px", width: "40px", textAlign: "center"}}>Close</p>
                        </div>
                        <div className="columns">
                            <div className="column is-6">
                        <header class="modal-card-head team-modal">                            
                            <div className="columns is-mobile" style={{ width: "100%" }}>
                                <div className="column is-12 is-mobile"><Symbol abrv={currentTeam.info.abrv} alt="true"/>
                                    <p class="modal-card-title team-modal team-modal-title">
                                         {currentTeam.info.full}
                                    <p class="team-modal-subtitle">{currentTeam.info.desc}</p></p>
                                    <b style={{ color: "black", fontSize: "24px"}}>{currentTeam.history.wins}-{currentTeam.history.losses}</b>
                                    <br/><b style={{color: "black"}}>Goals Scored: {currentTeam.players.l1.a.stats.history.goals + currentTeam.players.l1.b.stats.history.goals + currentTeam.players.l1.c.stats.history.goals + currentTeam.players.l2.a.stats.history.goals + currentTeam.players.l2.b.stats.history.goals + currentTeam.players.l2.c.stats.history.goals } </b>
                                    <br/><b style={{color: "black"}}>Goal Difference: {currentTeam.players.l1.a.stats.history.plusminus + currentTeam.players.l2.a.stats.history.plusminus} </b>
                                </div>
                            </div>    
                        </header>
                        </div>
                        <div className="column is-6">
                        <ModalRoster props={currentTeam.players} />
                        </div>
                        </div>
                    <hr/></div>) : (<div></div>)}
            </div>
            {bingo !== null && bongo !== null ?  (
                <div>
                    <div style={{ background: "black", padding: "5px", margin: "auto", marginBottom: "25px", fontSize: "36px", fontWeight: "1000", border: "5px solid black", borderRadius: "15px", width: "240px" }}>
                        <i>BIG LEAGUE</i>
                    </div>
                    <div className="columns league-table-wrapper">
                        <div className="column is-5 con-table bingo left">
                            <div className="div-table-wrapper bingo">
                                <p className="div-table-title">Bingo Division</p>
                                <div className="columns is-mobile division-table-team bingo">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(bingo[0])}><Symbol abrv={bingo[0].info.abrv} /> {bingo[0].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{bingo[0].history.wins} - {bingo[0].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team bingo">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(bingo[1])}><Symbol abrv={bingo[1].info.abrv} /> {bingo[1].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{bingo[1].history.wins} - {bingo[1].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team bingo">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(bingo[2])}><Symbol abrv={bingo[2].info.abrv} /> {bingo[2].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{bingo[2].history.wins} - {bingo[2].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team bingo">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(bingo[3])}><Symbol abrv={bingo[3].info.abrv} /> {bingo[3].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{bingo[3].history.wins} - {bingo[3].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team bingo">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(bingo[4])}><Symbol abrv={bingo[4].info.abrv} /> {bingo[4].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{bingo[4].history.wins} - {bingo[4].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team bingo">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(bingo[5])}><Symbol abrv={bingo[5].info.abrv} /> {bingo[5].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{bingo[5].history.wins} - {bingo[5].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team bingo">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(bingo[6])}><Symbol abrv={bingo[6].info.abrv} /> {bingo[6].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{bingo[6].history.wins} - {bingo[6].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team bingo">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(bingo[7])}><Symbol abrv={bingo[7].info.abrv} /> {bingo[7].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{bingo[7].history.wins} - {bingo[7].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team bingo">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(bingo[8])}><Symbol abrv={bingo[8].info.abrv} /> {bingo[8].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{bingo[8].history.wins} - {bingo[8].history.losses}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column is-2 buffer"><p> -</p></div>
                        <div className="column is-5 con-table bongo right">
                            <div className="div-table-wrapper bongo">
                                <p className="div-table-title left">Bongo Division</p>
                                <div className="columns is-mobile division-table-team bongo">
                                    <div className="column is-9 left">
                                        <p onClick={() => openModal(bongo[0])}><Symbol abrv={bongo[0].info.abrv} /> {bongo[0].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{bongo[0].history.wins} - {bongo[0].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team bongo">
                                    <div className="column is-9 left">
                                        <p onClick={() => openModal(bongo[1])}><Symbol abrv={bongo[1].info.abrv} /> {bongo[1].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{bongo[1].history.wins} - {bongo[1].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team bongo">
                                    <div className="column is-9 left">
                                        <p onClick={() => openModal(bongo[2])}><Symbol abrv={bongo[2].info.abrv} /> {bongo[2].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{bongo[2].history.wins} - {bongo[2].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team bongo">
                                    <div className="column is-9 left">
                                        <p onClick={() => openModal(bongo[3])}><Symbol abrv={bongo[3].info.abrv} /> {bongo[3].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{bongo[3].history.wins} - {bongo[3].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team bongo">
                                    <div className="column is-9 left">
                                        <p onClick={() => openModal(bongo[4])}><Symbol abrv={bongo[4].info.abrv} /> {bongo[4].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{bongo[4].history.wins} - {bongo[4].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team bongo">
                                    <div className="column is-9 left">
                                        <p onClick={() => openModal(bongo[5])}><Symbol abrv={bongo[5].info.abrv} /> {bongo[5].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{bongo[5].history.wins} - {bongo[5].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team bongo">
                                    <div className="column is-9 left">
                                        <p onClick={() => openModal(bongo[6])}><Symbol abrv={bongo[6].info.abrv} /> {bongo[6].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{bongo[6].history.wins} - {bongo[6].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team bongo">
                                    <div className="column is-9 left">
                                        <p onClick={() => openModal(bongo[7])}><Symbol abrv={bongo[7].info.abrv} /> {bongo[7].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{bongo[7].history.wins} - {bongo[7].history.losses}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>) : (<p>loading . . .</p>)}
        </div>
    )
}

export default Teams