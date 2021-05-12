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
    const [ogopogo, setOgopogo] = useState(null)
    const [igopogo, setIgopogo] = useState(null)
    const [chessie, setChessie] = useState(null)
    const [nessie, setNessie] = useState(null)

    useEffect(() => {
        UpdateTable();
    }, []);

    function UpdateTable() {
        API.getTeams()
            .then((res) => {
                let data = res.data
                console.log(res.data)
                let ogoRaw = data[0]
                let igoRaw = data[1]
                let chesRaw = data[2]
                let nesRaw = data[3]
                ogoRaw.sort(Sorter)
                igoRaw.sort(Sorter)
                chesRaw.sort(Sorter)
                nesRaw.sort(Sorter)
                setOgopogo(ogoRaw)
                setIgopogo(igoRaw)
                setChessie(chesRaw)
                setNessie(nesRaw)
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
            {ogopogo !== null && igopogo !== null && chessie !== null && nessie !== null ?  (
                <div>
                    <div style={{ background: "black", padding: "5px", margin: "auto", marginBottom: "25px", fontSize: "36px", fontWeight: "1000", border: "5px solid black", borderRadius: "15px", width: "240px" }}>
                        <i>BIG LEAGUE</i>
                    </div>
                    <div className="columns league-table-wrapper">
                        <div className="column is-5 con-table bingo left">
                            <p className="con-table-title center">Bingo Conference</p>
                            <div className="div-table-wrapper ogopogo">
                                <p className="div-table-title">Ogopogo Division</p>
                                <div className="columns is-mobile division-table-team ogopogo">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(ogopogo[0])}><Symbol abrv={ogopogo[0].info.abrv} /> {ogopogo[0].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{ogopogo[0].history.wins} - {ogopogo[0].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team ogopogo">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(ogopogo[1])}><Symbol abrv={ogopogo[1].info.abrv} /> {ogopogo[1].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{ogopogo[1].history.wins} - {ogopogo[1].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team ogopogo">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(ogopogo[2])}><Symbol abrv={ogopogo[2].info.abrv} /> {ogopogo[2].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{ogopogo[2].history.wins} - {ogopogo[2].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team ogopogo">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(ogopogo[3])}><Symbol abrv={ogopogo[3].info.abrv} /> {ogopogo[3].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{ogopogo[3].history.wins} - {ogopogo[3].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team ogopogo">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(ogopogo[4])}><Symbol abrv={ogopogo[4].info.abrv} /> {ogopogo[4].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{ogopogo[4].history.wins} - {ogopogo[4].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team ogopogo">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(ogopogo[5])}><Symbol abrv={ogopogo[5].info.abrv} /> {ogopogo[5].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{ogopogo[5].history.wins} - {ogopogo[5].history.losses}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="div-table-wrapper igopogo">
                                <p className="div-table-title">Igopogo Division</p>
                                <div className="columns is-mobile division-table-team igopogo">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(igopogo[0])}><Symbol abrv={igopogo[0].info.abrv} /> {igopogo[0].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{igopogo[0].history.wins} - {igopogo[0].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team igopogo">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(igopogo[1])}><Symbol abrv={igopogo[1].info.abrv} /> {igopogo[1].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{igopogo[1].history.wins} - {igopogo[1].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team igopogo">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(igopogo[2])}><Symbol abrv={igopogo[2].info.abrv} /> {igopogo[2].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{igopogo[2].history.wins} - {igopogo[2].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team igopogo">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(igopogo[3])}><Symbol abrv={igopogo[3].info.abrv} /> {igopogo[3].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{igopogo[3].history.wins} - {igopogo[3].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team igopogo">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(igopogo[4])}><Symbol abrv={igopogo[4].info.abrv} /> {igopogo[4].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{igopogo[4].history.wins} - {igopogo[4].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team igopogo">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(igopogo[5])}><Symbol abrv={igopogo[5].info.abrv} /> {igopogo[5].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{igopogo[5].history.wins} - {igopogo[5].history.losses}</p>
                                    </div>
                                </div></div>
                        </div>
                        <div className="column is-2 buffer"><p> -</p></div>
                        <div className="column is-5 con-table bongo left">
                            <p className="con-table-title center">Bongo Conference</p>
                            <div className="div-table-wrapper chessie">
                                <p className="div-table-title">Chessie Division</p>
                                <div className="columns is-mobile division-table-team chessie">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(chessie[0])}><Symbol abrv={chessie[0].info.abrv} /> {chessie[0].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{chessie[0].history.wins} - {chessie[0].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team chessie">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(chessie[1])}><Symbol abrv={chessie[1].info.abrv} /> {chessie[1].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{chessie[1].history.wins} - {chessie[1].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team chessie">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(chessie[2])}><Symbol abrv={chessie[2].info.abrv} /> {chessie[2].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{chessie[2].history.wins} - {chessie[2].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team chessie">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(chessie[3])}><Symbol abrv={chessie[3].info.abrv} /> {chessie[3].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{chessie[3].history.wins} - {chessie[3].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team chessie">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(chessie[4])}><Symbol abrv={chessie[4].info.abrv} /> {chessie[4].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{chessie[4].history.wins} - {chessie[4].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team chessie">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(chessie[5])}><Symbol abrv={chessie[5].info.abrv} /> {chessie[5].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{chessie[5].history.wins} - {chessie[5].history.losses}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="div-table-wrapper nessie">
                                <p className="div-table-title">Nessie Division</p>
                                <div className="columns is-mobile division-table-team nessie">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(nessie[0])}><Symbol abrv={nessie[0].info.abrv} alt="false" /> {nessie[0].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{nessie[0].history.wins} - {nessie[0].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team nessie">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(nessie[1])}><Symbol abrv={nessie[1].info.abrv} /> {nessie[1].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{nessie[1].history.wins} - {nessie[1].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team nessie">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(nessie[2])}><Symbol abrv={nessie[2].info.abrv} /> {nessie[2].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{nessie[2].history.wins} - {nessie[2].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team nessie">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(nessie[3])}><Symbol abrv={nessie[3].info.abrv} /> {nessie[3].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{nessie[3].history.wins} - {nessie[3].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team nessie">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(nessie[4])}><Symbol abrv={nessie[4].info.abrv} /> {nessie[4].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{nessie[4].history.wins} - {nessie[4].history.losses}</p>
                                    </div>
                                </div>
                                <div className="columns is-mobile division-table-team nessie">
                                    <div className="column is-9">
                                        <p onClick={() => openModal(nessie[5])}><Symbol abrv={nessie[5].info.abrv} /> {nessie[5].info.full}</p>
                                    </div>
                                    <div className="column is-3 right table-record">
                                        <p>{nessie[5].history.wins} - {nessie[5].history.losses}</p>
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