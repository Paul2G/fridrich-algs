import React from 'react'

import "../assets/modal.css"

import learningStates from "../assets/json/learningStates.json"

let allowedChar = /^(((\(? *[RLUDFBrludfbMSExyz]('|2)?) *( |\)) *)+)*((\(?[RLUDFBrludfbMSExyz]('|2)?\)?))/g;
let allowedMoves = /[RLUDFBrludfbMSExyz]/g;

export class Modal extends React.Component {
  constructor(props){
    super(props);

    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
    var inputAlg = document.getElementById("inputAlg");
    var newAlg = allowedChar.exec(inputAlg.value);

    allowedChar.exec(inputAlg.value);

    if (newAlg === null) {
      alert("Caracteres invalidos o movimientos unidos. Intente de nuevo."
        + "\nCaracteres permitidos: \"RLUDFBrludfbMSExyz'2( )\".");
    } else {
      this.props.caso.algrtm.push(
        {
          "moves": newAlg[0],
          "rot": 0,
          "noOfMoves": newAlg[0].match(allowedMoves).length
        }
      );

      inputAlg.value = "";

      this.setState({});

      this.props.save();
    }
  }

  
  handleDel(index) {
    if (index === this.props.caso.selectedAlgrtm) {
        this.props.caso.selectedAlgrtm = 0;
    } else if (index < this.props.caso.selectedAlgrtm){ 
      this.props.caso.selectedAlgrtm--;
    }

    this.props.caso.algrtm.splice(index, 1);

    this.props.reload({});

    this.props.save();
  }

  handleSelect(index) {
    this.props.caso.selectedAlgrtm = index;

    this.props.reload({});

    this.props.save();
  }

  handleRotate(index){
    this.props.caso.algrtm[index].rot = (++this.props.caso.algrtm[index].rot) % 4;
    this.props.caso.selectedAlgrtm = index;

    this.props.reload({});

    this.props.save();
  }

  render(){
    var caso = this.props.caso;

    if(caso.shape !== undefined){
      var route = require("../assets/images/oll/OLL"+caso.id+".png");
      var exRef = "http://algdb.net/puzzle/333/oll/oll"+caso.id;
      var step = "OLL";
    } else {
      var route = require("../assets/images/pll/PLL"+caso.id+".png");
      var exRef = "http://algdb.net/puzzle/333/PLL/"+caso.id;
      var step = "PLL";
    }

    return (
      <div className="modal-container" id="modal_container">
        <div className="modal">
          <button type="button" className="close-btn" onClick={closeModal}/>
          
          <div className="modal-content">
            <a className="case-exRef" href={exRef} target="_blank" title="Ver en AlgDb.net">
              <h3>{step + " " + caso.id}</h3>
            </a>
            <img className={"case-img " + "rt" + caso.algrtm[caso.selectedAlgrtm].rot}
              src={route}
              alt={step+"-" + caso.id}
              onClick={() => this.props.changeState(caso.id)} />
            <span className="over-text">{learningStates[caso.learningState]}</span>

            <span>Probabilidad: 1/{caso.prob}</span>
            
            <table className="algs-table">

              <thead>
                <tr>
                  <th>&#62;</th>
                  <th>Algoritmo</th>
                  <th>AUF</th>
                  <th>Cambios</th>
                </tr>
              </thead>

              <tbody>
                {caso.algrtm.map((alg, i) =>
                  <tr key={i}>
                    <td>
                      <input type="radio" name="optRadio" onChange={() => this.handleSelect(i)} checked={caso.selectedAlgrtm === i} />
                    </td>
                    <td>{alg.moves}</td>
                    <td>
                      <button type="button" className="rotate-button" onClick={() => this.handleRotate(i)}/>
                    </td>
                    <td>
                      <button className="del-button" type="button" onClick={() => this.handleDel(i)} disabled={caso.algrtm.length === 1}>Eliminar</button>
                    </td>
                  </tr>
                )}

                <tr>
                  <td></td>
                  <td><input id="inputAlg" type="text" placeholder=" Nuevo algoritmo..."></input></td>
                  <td></td>
                  <td>
                    <button className="add-button" type="button" onClick={this.handleAdd}>Agregar</button>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    )
  }
}

function closeModal() {
  var body = document.body;
  var modal_container = document.getElementById("modal_container");
  var inputAlg = document.getElementById("inputAlg");

  body.classList.remove("noscroll");
  modal_container.classList.remove("show");
  inputAlg.value = "";
}

export function openModal(){
  var body = document.body;
  var modal_container = document.getElementById("modal_container");

  body.classList.add("noscroll");
  modal_container.classList.add("show");
}

export default {Modal, openModal};