import React, {useState, useEffect, useRef} from "react";
import "../App.css"
import Modal from "react-modal"
import data from "../utils/data.json"
import API from "../utils/API"
import Symbol from "../components/TeamEmojis"

function Teams() {
Modal.setAppElement('#root')

const [modalIsOpen,setIsOpen] = useState(false);
const [currentTeam,setCurrentTeam] = useState(null)
const [bingo, setBingo] = useState(null)
const [bongo, setBongo] = useState(null)


useEffect(() => {
    UpdateTable();
  }, []);


function UpdateTable() {
    API.getTeams()
       .then((res) => {
           let data = res.data
           console.log(res.data)
           let bingoRaw = data[0]
           let bongoRaw = data[1]
           bingoRaw.sort(Sorter)
           bongoRaw.sort(Sorter)
         setBingo(bingoRaw)
         setBongo(bongoRaw)
         
         })}

function Sorter(a, b) {
    if (a.history.wins > b.history.wins) return -1;
    if (a.history.wins < b.history.wins) return 1;
    return 0
}

function openModal(team) {
    setCurrentTeam(team)
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
        {currentTeam !== null ? (
        <div class="modal-card ">
            <header class="modal-card-head team-modal">
            <p class="modal-card-title team-modal team-modal-title">    
            <Symbol abrv={currentTeam.info.abrv}/> {currentTeam.info.full}
                <br/><p class="team-modal-subtitle">{currentTeam.info.desc}</p></p>
            <button aria-label="close" onClick={closeModal}>X</button>      
            </header>
        <section class="modal-card-body">
        <p className="position-title">Forwards</p>
        <p>{currentTeam.players.line1.LW.name}</p>
        <p>{currentTeam.players.line1.CE.name}</p>
        <p>{currentTeam.players.line1.RW.name}</p>
        <br/>
        <p className="position-title">Defenders</p>
        <p>{currentTeam.players.line1.LD.name}</p>
        <p>{currentTeam.players.line1.RD.name}</p>
        <br/>
        <p className="position-title">Goalies</p>
        <p>{currentTeam.players.line1.GK.name}</p>
        </section>
  </div>) : (<div></div>)}              
            </Modal>
            {bingo !== null && bongo !== null ? (
            <div className="columns league-table-wrapper">
                <div className="column is-5 division-table bingo left">
                    <p className="division-table-title center">Bingo Division</p>
                    <div className="columns is-mobile division-table-team bingo a">
                        <div className="column is-9">
                            <p onClick={() => openModal(bingo[0])}><Symbol abrv={bingo[0].info.abrv}/> {bingo[0].info.full}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bingo[0].history.wins} - {bingo[0].history.losses}</p>
                        </div>
                    </div>
                    <div className="columns is-mobile division-table-team bingo b">
                        <div className="column is-9">
                            <p onClick={() => openModal(bingo[1])}><Symbol abrv={bingo[1].info.abrv}/> {bingo[1].info.full}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bingo[1].history.wins} - {bingo[1].history.losses}</p>
                        </div>
                    </div>                    
                    <div className="columns is-mobile division-table-team bingo a">
                        <div className="column is-9">
                            <p onClick={() => openModal(bingo[2])}><Symbol abrv={bingo[2].info.abrv}/> {bingo[2].info.full}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bingo[2].history.wins} - {bingo[2].history.losses}</p>
                        </div>
                    </div>
                    <div className="columns is-mobile division-table-team bingo b">
                        <div className="column is-9">
                            <p onClick={() => openModal(bingo[3])}><Symbol abrv={bingo[3].info.abrv}/> {bingo[3].info.full}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bingo[3].history.wins} - {bingo[3].history.losses}</p>
                        </div>
                    </div> 
                    <div className="columns is-mobile division-table-team bingo a">
                        <div className="column is-9">
                            <p onClick={() => openModal(bingo[4])}><Symbol abrv={bingo[4].info.abrv}/> {bingo[4].info.full}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bingo[4].history.wins} - {bingo[4].history.losses}</p>
                        </div>
                    </div>
                    <div className="columns is-mobile division-table-team bingo b">
                        <div className="column is-9">
                            <p onClick={() => openModal(bingo[5])}><Symbol abrv={bingo[5].info.abrv}/> {bingo[5].info.full}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bingo[5].history.wins} - {bingo[5].history.losses}</p>
                        </div>
                    </div> 
                    <div className="columns is-mobile division-table-team bingo a">
                        <div className="column is-9">
                            <p onClick={() => openModal(bingo[6])}><Symbol abrv={bingo[6].info.abrv}/> {bingo[6].info.full}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bingo[6].history.wins} - {bingo[6].history.losses}</p>
                        </div>
                    </div>
                    <div className="columns is-mobile division-table-team bingo b">
                        <div className="column is-9">
                            <p onClick={() => openModal(bingo[7])}><Symbol abrv={bingo[7].info.abrv}/> {bingo[7].info.full}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bingo[7].history.wins} - {bingo[7].history.losses}</p>
                        </div>
                    </div> 
                    <div className="columns is-mobile division-table-team bingo a">
                        <div className="column is-9">
                            <p onClick={() => openModal(bingo[8])}><Symbol abrv={bingo[8].info.abrv}/> {bingo[8].info.full}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bingo[8].history.wins} - {bingo[8].history.losses}</p>
                        </div>
                    </div>
                    <div className="columns is-mobile division-table-team bingo b">
                        <div className="column is-9">
                            <p onClick={() => openModal(bingo[9])}><Symbol abrv={bingo[9].info.abrv}/> {bingo[9].info.full}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bingo[9].history.wins} - {bingo[9].history.losses}</p>
                        </div>
                    </div>
                </div>
                <div className="column is-2 buffer"><p> -</p></div>
                <div className="column is-5 division-table bongo left">
                    <p className="division-table-title center">Bongo Division</p>
                    <div className="columns is-mobile division-table-team bongo a">
                        <div className="column is-9">
                            <p onClick={() => openModal(bongo[0])}><Symbol abrv={bongo[0].info.abrv}/> {bongo[0].info.full}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bongo[0].history.wins} - {bongo[0].history.losses}</p>
                        </div>
                    </div>
                    <div className="columns is-mobile division-table-team bongo b">
                        <div className="column is-9">
                            <p onClick={() => openModal(bongo[1])}><Symbol abrv={bongo[1].info.abrv}/> {bongo[1].info.full}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bongo[1].history.wins} - {bongo[1].history.losses}</p>
                        </div>
                    </div>                    
                    <div className="columns is-mobile division-table-team bongo a">
                        <div className="column is-9">
                            <p onClick={() => openModal(bongo[2])}><Symbol abrv={bongo[2].info.abrv}/> {bongo[2].info.full}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bongo[2].history.wins} - {bongo[2].history.losses}</p>
                        </div>
                    </div>
                    <div className="columns is-mobile division-table-team bongo b">
                        <div className="column is-9">
                            <p onClick={() => openModal(bongo[3])}><Symbol abrv={bongo[3].info.abrv}/> {bongo[3].info.full}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bongo[3].history.wins} - {bongo[3].history.losses}</p>
                        </div>
                    </div> 
                    <div className="columns is-mobile division-table-team bongo a">
                        <div className="column is-9">
                            <p onClick={() => openModal(bongo[4])}><Symbol abrv={bongo[4].info.abrv}/> {bongo[4].info.full}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bongo[4].history.wins} - {bongo[4].history.losses}</p>
                        </div>
                    </div>
                    <div className="columns is-mobile division-table-team bongo b">
                        <div className="column is-9">
                            <p onClick={() => openModal(bongo[5])}><Symbol abrv={bongo[5].info.abrv}/> {bongo[5].info.full}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bongo[5].history.wins} - {bongo[5].history.losses}</p>
                        </div>
                    </div> 
                    <div className="columns is-mobile division-table-team bongo a">
                        <div className="column is-9">
                            <p onClick={() => openModal(bongo[6])}><Symbol abrv={bongo[6].info.abrv}/> {bongo[6].info.full}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bongo[6].history.wins} - {bongo[6].history.losses}</p>
                        </div>
                    </div>
                    <div className="columns is-mobile division-table-team bongo b">
                        <div className="column is-9">
                            <p onClick={() => openModal(bongo[7])}><Symbol abrv={bongo[7].info.abrv}/> {bongo[7].info.full}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bongo[7].history.wins} - {bongo[7].history.losses}</p>
                        </div>
                    </div> 
                    <div className="columns is-mobile division-table-team bongo a">
                        <div className="column is-9">
                            <p onClick={() => openModal(bongo[8])}><Symbol abrv={bongo[8].info.abrv}/> {bongo[8].info.full}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bongo[8].history.wins} - {bongo[8].history.losses}</p>
                        </div>
                    </div>
                    <div className="columns is-mobile division-table-team bongo b">
                        <div className="column is-9">
                            <p onClick={() => openModal(bongo[9])}><Symbol abrv={bongo[9].info.abrv}/> {bongo[9].info.full}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bongo[9].history.wins} - {bongo[9].history.losses}</p>
                        </div>
                    </div>
                </div>
            </div>) : (<p>loading . . .</p>)}
        </div>
    )
}

export default Teams