import React, {useState, useEffect} from "react";
import "../App.css"
import Modal from "react-modal"
import data from "../utils/data.json"
import API from "../utils/API"
import Symbol from "../components/TeamEmojis"

function Teams() {
Modal.setAppElement('#root')

const [modalIsOpen,setIsOpen] = useState(false);
const [currentTeam,setCurrentTeam] = useState(data.teams.rochester)
const [bingo, setBingo] = useState([["BUF","Buffalo Starlights",0,0,0],["BOS","Boston Chowdahs",0,0,0],["ROC","Rochester Bones",0,0,0],["OTT","Ottawa Tulips",0,0,0],["MON","Montreal Panic",0,0,0],["TOR","Toronto Brewskis",0,0,0],["POR","Portland Shrooms",0,0,0],["WVM","West Virginia Mothmen",0,0,0],["NOR","New Orleans Moonshine",0,0,0]])
const [bongo, setBongo] = useState([["NYR","New York Rats",0,0,0],["PHL","Philly Pineapples",0,0,0],["VAN","Vancouver Foxtrots",0,0,0],["CHI","Chicago Paloozas",0,0,0],["PIT","Pittsburgh Good Boys",0,0,0],["BUR","Burlington Lumberjacks",0,0,0],["SFB","Santa Fe Buckaroos",0,0,0],["VAL","Valhalla Omens",0,0,0],["LAK","LA Kickflips",0,0,0]])

useEffect(()=>{
    UpdateTable()
}, [])

function UpdateTable() {
     API.checkSeason()
        .then((res) => {
            let data = res.data
            let bingoRaw = [data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8]]
            let bongoRaw = [data[9], data[10], data[11], data[12], data[13], data[14], data[15], data[16], data[17]]
            bingoRaw.sort(Sorter)
            bongoRaw.sort(Sorter)
          setBingo(bingoRaw)
          setBongo(bongoRaw)
          })}

function Sorter(a, b) {
    if (a[2] > b[2]) return -1;
    if (a[2] < b[2]) return 1;
    return 0
}

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
        <p>{currentTeam.players.LW.full} {currentTeam.players.LW.captain === 1? (<b>(C)</b>) : (<b></b>)}</p>
        <p>{currentTeam.players.C.full} {currentTeam.players.C.captain === 1? (<b>(C)</b>) : (<b></b>)}</p>
        <p>{currentTeam.players.RW.full} {currentTeam.players.RW.captain === 1? (<b>(C)</b>) : (<b></b>)}</p>
        <br/>
        <p className="position-title">Defenders</p>
        <p>{currentTeam.players.LD.full} {currentTeam.players.LD.captain === 1? (<b>(C)</b>) : (<b></b>)}</p>
        <p>{currentTeam.players.RD.full} {currentTeam.players.RD.captain === 1? (<b>(C)</b>) : (<b></b>)}</p>
        <br/>
        <p className="position-title">Goalies</p>
        <p>{currentTeam.players.G.full} {currentTeam.players.G.captain === 1? (<b>(C)</b>) : (<b></b>)}</p>
        </section>
  </div>              
            </Modal>
            <div className="columns league-table-wrapper">
                <div className="column is-5 division-table bingo left">
                    <p className="division-table-title center">Bingo Division</p>
                    <div className="columns is-mobile division-table-team bingo a">
                        <div className="column is-9">
                            <p onClick={eval(`open${bingo[0][0]}`)}><Symbol abrv={bingo[0][0]}/> {bingo[0][1]}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bingo[0][2]} - {bingo[0][3]}</p>
                        </div>
                    </div>
                    <div className="columns is-mobile division-table-team bingo b">
                        <div className="column is-9">
                            <p onClick={eval(`open${bingo[1][0]}`)}><Symbol abrv={bingo[1][0]}/> {bingo[1][1]}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bingo[1][2]} - {bingo[1][3]}</p>
                        </div>
                    </div>                    
                    <div className="columns is-mobile division-table-team bingo a">
                        <div className="column is-9">
                            <p onClick={eval(`open${bingo[2][0]}`)}><Symbol abrv={bingo[2][0]}/> {bingo[2][1]}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bingo[2][2]} - {bingo[2][3]}</p>
                        </div>
                    </div>
                    <div className="columns is-mobile division-table-team bingo b">
                        <div className="column is-9">
                            <p onClick={eval(`open${bingo[3][0]}`)}><Symbol abrv={bingo[3][0]}/> {bingo[3][1]}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bingo[3][2]} - {bingo[3][3]}</p>
                        </div>
                    </div> 
                    <div className="columns is-mobile division-table-team bingo a">
                        <div className="column is-9">
                            <p onClick={eval(`open${bingo[4][0]}`)}><Symbol abrv={bingo[4][0]}/> {bingo[4][1]}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bingo[4][2]} - {bingo[4][3]}</p>
                        </div>
                    </div>
                    <div className="columns is-mobile division-table-team bingo b">
                        <div className="column is-9">
                            <p onClick={eval(`open${bingo[5][0]}`)}><Symbol abrv={bingo[5][0]}/> {bingo[5][1]}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bingo[5][2]} - {bingo[5][3]}</p>
                        </div>
                    </div> 
                    <div className="columns is-mobile division-table-team bingo a">
                        <div className="column is-9">
                            <p onClick={eval(`open${bingo[6][0]}`)}><Symbol abrv={bingo[6][0]}/> {bingo[6][1]}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bingo[6][2]} - {bingo[6][3]}</p>
                        </div>
                    </div>
                    <div className="columns is-mobile division-table-team bingo b">
                        <div className="column is-9">
                            <p onClick={eval(`open${bingo[7][0]}`)}><Symbol abrv={bingo[7][0]}/> {bingo[7][1]}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bingo[7][2]} - {bingo[7][3]}</p>
                        </div>
                    </div> 
                    <div className="columns is-mobile division-table-team bingo a">
                        <div className="column is-9">
                            <p onClick={eval(`open${bingo[8][0]}`)}><Symbol abrv={bingo[8][0]}/> {bingo[8][1]}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bingo[8][2]} - {bingo[8][3]}</p>
                        </div>
                    </div>
                </div>
                <div className="column is-2 buffer"><p> -</p></div>
                <div className="column is-5 division-table bongo left">
                    <p className="division-table-title center">Bongo Division</p>
                    <div className="columns is-mobile division-table-team bongo a">
                        <div className="column is-9">
                            <p onClick={eval(`open${bongo[0][0]}`)}><Symbol abrv={bongo[0][0]}/> {bongo[0][1]}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bongo[0][2]} - {bongo[0][3]}</p>
                        </div>
                    </div>
                    <div className="columns is-mobile division-table-team bongo b">
                        <div className="column is-9">
                            <p onClick={eval(`open${bongo[1][0]}`)}><Symbol abrv={bongo[1][0]}/> {bongo[1][1]}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bongo[1][2]} - {bongo[1][3]}</p>
                        </div>
                    </div>                    
                    <div className="columns is-mobile division-table-team bongo a">
                        <div className="column is-9">
                            <p onClick={eval(`open${bongo[2][0]}`)}><Symbol abrv={bongo[2][0]}/> {bongo[2][1]}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bongo[2][2]} - {bongo[2][3]}</p>
                        </div>
                    </div>
                    <div className="columns is-mobile division-table-team bongo b">
                        <div className="column is-9">
                            <p onClick={eval(`open${bongo[3][0]}`)}><Symbol abrv={bongo[3][0]}/> {bongo[3][1]}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bongo[3][2]} - {bongo[3][3]}</p>
                        </div>
                    </div> 
                    <div className="columns is-mobile division-table-team bongo a">
                        <div className="column is-9">
                            <p onClick={eval(`open${bongo[4][0]}`)}><Symbol abrv={bongo[4][0]}/> {bongo[4][1]}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bongo[4][2]} - {bongo[4][3]}</p>
                        </div>
                    </div>
                    <div className="columns is-mobile division-table-team bongo b">
                        <div className="column is-9">
                            <p onClick={eval(`open${bongo[5][0]}`)}><Symbol abrv={bongo[5][0]}/> {bongo[5][1]}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bongo[5][2]} - {bongo[5][3]}</p>
                        </div>
                    </div> 
                    <div className="columns is-mobile division-table-team bongo a">
                        <div className="column is-9">
                            <p onClick={eval(`open${bongo[6][0]}`)}><Symbol abrv={bongo[6][0]}/> {bongo[6][1]}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bongo[6][2]} - {bongo[6][3]}</p>
                        </div>
                    </div>
                    <div className="columns is-mobile division-table-team bongo b">
                        <div className="column is-9">
                            <p onClick={eval(`open${bongo[7][0]}`)}><Symbol abrv={bongo[7][0]}/> {bongo[7][1]}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bongo[7][2]} - {bongo[7][3]}</p>
                        </div>
                    </div> 
                    <div className="columns is-mobile division-table-team bongo a">
                        <div className="column is-9">
                            <p onClick={eval(`open${bongo[8][0]}`)}><Symbol abrv={bongo[8][0]}/> {bongo[8][1]}</p>
                        </div>
                        <div className="column is-3 right table-record">
                            <p>{bongo[8][2]} - {bongo[8][3]}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Teams