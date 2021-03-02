import React, { useState, useEffect, useRef } from "react";
import "../App.css"
import Modal from "react-modal"
import data from "../utils/data.json"
import API from "../utils/API"
import Symbol from "../components/TeamEmojis"
import ModalRoster from "../components/ModalRoster"

function Teams() {
    Modal.setAppElement('#root')

    const [modalIsOpen, setIsOpen] = useState(false);
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
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Team Info" className="modal is-active ">
                <div class="modal-background"></div>
                {currentTeam !== null ? (
                    <div class="modal-card ">
                        <header class="modal-card-head team-modal"> 
                        <div className="columns is-mobile" style={{width: "100%"}}>
                            <div className="column is-11 is-mobile">
                            <p class="modal-card-title team-modal team-modal-title">
                                <Symbol abrv={currentTeam.info.abrv}/> {currentTeam.info.full}
                                <br /><p class="team-modal-subtitle">{currentTeam.info.desc}</p></p>
                            </div>
                            <div className="column is-1">
                            <button aria-label="close" onClick={closeModal}>X</button>
                            </div>
                        </div>
                        </header>
                        <ModalRoster props={currentTeam.players} />
                    </div>) : (<div></div>)}
            </Modal>
            {ogopogo !== null && igopogo !== null && chessie !== null && nessie !== null ? (
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
                                    <p onClick={() => openModal(nessie[0])}><Symbol abrv={nessie[0].info.abrv} /> {nessie[0].info.full}</p>
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
                </div>) : (<p>loading . . .</p>)}
        </div>
    )
}

export default Teams