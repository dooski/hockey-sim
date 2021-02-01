import React, {useState, useEffect, useRef} from "react";
import "../App.css"
import Modal from "react-modal"
import data from "../utils/data.json"
import Symbol from "../components/TeamEmojis"

function Teams() {
Modal.setAppElement('#root')

const [modalIsOpen,setIsOpen] = useState(false);
const [currentTeam,setCurrentTeam] = useState(data.teams.rochester)

function openBUF() {
    setCurrentTeam(data.teams.buffalo)
    openModal()
}

function openROC() {
    setCurrentTeam(data.teams.rochester)
    openModal()
}

function openBOS() {
    setCurrentTeam(data.teams.boston)
    openModal()
}

function openOTT() {
    setCurrentTeam(data.teams.ottawa)
    openModal()
}

function openMON() {
    setCurrentTeam(data.teams.montreal)
    openModal()
}

function openTOR() {
    setCurrentTeam(data.teams.toronto)
    openModal()
}

function openNYR() {
    setCurrentTeam(data.teams.newYork)
    openModal()
}

function openPHL() {
    setCurrentTeam(data.teams.philly)
    openModal()
}

function openVAN() {
    setCurrentTeam(data.teams.vancouver)
    openModal()
}

function openCHI() {
    setCurrentTeam(data.teams.chicago)
    openModal()
}

function openPIT() {
    setCurrentTeam(data.teams.pittsburgh)
    openModal()
}

function openBUR() {
    setCurrentTeam(data.teams.burlington)
    openModal()
}

function openPOR() {
    setCurrentTeam(data.teams.portland)
    openModal()
}

function openWVM() {
    setCurrentTeam(data.teams.westVirginia)
    openModal()
}

function openNOR() {
    setCurrentTeam(data.teams.newOrleans)
    openModal()
}

function openSFB() {
    setCurrentTeam(data.teams.santaFe)
    openModal()
}

function openVAL() {
    setCurrentTeam(data.teams.valhalla)
    openModal()
}

function openLAK() {
    setCurrentTeam(data.teams.LA)
    openModal()
}


function openModal() {
  setIsOpen(true);
}
function afterOpenModal() {
}
function closeModal(){
  setIsOpen(false);
}

    return (
        <div>
            <Modal 
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            contentLabel="Team Info"
            className="modal is-active ">
            <div class="modal-background"></div>
        <div class="modal-card ">
            <header class="modal-card-head team-modal">
            <p class="modal-card-title team-modal team-modal-title">
            <Symbol abrv={currentTeam.info.abrv}/> {currentTeam.info.full}
                <br/><p class="team-modal-subtitle">{currentTeam.info.desc}</p></p>
            <button aria-label="close" onClick={closeModal}>X</button>      
            </header>
        <section class="modal-card-body">
        <p className="position-title">Forwards</p>
        <p>{currentTeam.players.LW.full} {currentTeam.players.LW.captain == 1? (<b>(C)</b>) : (<b></b>)}</p>
        <p>{currentTeam.players.C.full} {currentTeam.players.C.captain == 1? (<b>(C)</b>) : (<b></b>)}</p>
        <p>{currentTeam.players.RW.full} {currentTeam.players.RW.captain == 1? (<b>(C)</b>) : (<b></b>)}</p>
        <br/>
        <p className="position-title">Defenders</p>
        <p>{currentTeam.players.LD.full} {currentTeam.players.LD.captain == 1? (<b>(C)</b>) : (<b></b>)}</p>
        <p>{currentTeam.players.RD.full} {currentTeam.players.RD.captain == 1? (<b>(C)</b>) : (<b></b>)}</p>
        <br/>
        <p className="position-title">Goalies</p>
        <p>{currentTeam.players.G.full} {currentTeam.players.G.captain == 1? (<b>(C)</b>) : (<b></b>)}</p>
        </section>
  </div>              
            </Modal>
            <div className="columns league-table-wrapper">
                <div className="column is-5 division-table bingo left">
                    <p className="division-table-title center">BINGO DIVISON</p>
                    <p className="division-table-team bingo a" onClick={openBUF}><Symbol abrv={"BUF"}/> {data.teams.buffalo.info.full}</p>
                    <p className="division-table-team bingo b" onClick={openROC}><Symbol abrv={"ROC"}/> {data.teams.rochester.info.full}</p>
                    <p className="division-table-team bingo a" onClick={openBOS}><Symbol abrv={"BOS"}/> {data.teams.boston.info.full}</p>
                    <p className="division-table-team bingo b" onClick={openOTT}><Symbol abrv={"OTT"}/> {data.teams.ottawa.info.full}</p>
                    <p className="division-table-team bingo a" onClick={openMON}><Symbol abrv={"MON"}/> {data.teams.montreal.info.full}</p>
                    <p className="division-table-team bingo b" onClick={openTOR}><Symbol abrv={"TOR"}/> {data.teams.toronto.info.full}</p>
                    <p className="division-table-team bingo a" onClick={openPOR}><Symbol abrv={"POR"}/> {data.teams.portland.info.full}</p>
                    <p className="division-table-team bingo b" onClick={openWVM}><Symbol abrv={"WVM"}/> {data.teams.westVirginia.info.full}</p>
                    <p className="division-table-team bingo a" onClick={openNOR}><Symbol abrv={"NOR"}/> {data.teams.newOrleans.info.full}</p>

                </div>
                <div className="column is-2 buffer"><p> -</p></div>
                <div className="column is-5 division-table bongo left">
                    <p className="division-table-title center">BONGO DIVISION</p>
                    <p className="division-table-team bongo a" onClick={openNYR}><Symbol abrv={"NYR"}/> {data.teams.newYork.info.full}</p>
                    <p className="division-table-team bongo b" onClick={openPHL}><Symbol abrv={"PHL"}/> {data.teams.philly.info.full}</p>
                    <p className="division-table-team bongo a" onClick={openVAN}><Symbol abrv={"VAN"}/> {data.teams.vancouver.info.full}</p>
                    <p className="division-table-team bongo b" onClick={openCHI}><Symbol abrv={"CHI"}/> {data.teams.chicago.info.full}</p>
                    <p className="division-table-team bongo a" onClick={openPIT}><Symbol abrv={"PIT"}/> {data.teams.pittsburgh.info.full}</p>
                    <p className="division-table-team bongo b" onClick={openBUR}><Symbol abrv={"BUR"}/> {data.teams.burlington.info.full}</p>
                    <p className="division-table-team bongo a" onClick={openSFB}><Symbol abrv={"SFB"}/> {data.teams.santaFe.info.full}</p>
                    <p className="division-table-team bongo b" onClick={openVAL}><Symbol abrv={"VAL"}/> {data.teams.valhalla.info.full}</p>
                    <p className="division-table-team bongo a" onClick={openLAK}><Symbol abrv={"LAK"}/> {data.teams.LA.info.full}</p>
                </div>
            </div>
        </div>
    )
}

export default Teams