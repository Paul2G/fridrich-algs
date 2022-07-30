import React, { Component } from 'react'

import AlgCard from './AlgCard'
import Modal from "./Modal"

import cases from "../assets/json/cases.json"
import shapes from "../assets/json/shapes.json"
import learningStates from "../assets/json/learningStates.json"
import auf from "../assets/json/auf.json"

let allowedChar = /^(((\(? *[RLUDFBrludfbMSExyz]('|2)?) *( |\)) *)+)*((\(?[RLUDFBrludfbMSExyz]('|2)?\)?\b))/g;
let allowedMoves = /[RLUDFBrludfbMSExyz]/g;

export class AlgsOll extends Component {
  constructor (props){
    super(props);
    
    this.state = {
      orderBy: "shape",
      selectedCase: {
        "id": 0,
        "shape": "done",
        "algrtm": [
          {
            "moves": "Resuelto",
            "rot": 0,
            "noOfMoves": 0
          }
        ],
        "selectedAlgrtm": 0,
        "learningState": 0
      }
    }

    this.openModalEdit = this.openModalEdit.bind(this);
    this.closeModalEdit = this.closeEditModal.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChangeState = this.handleChangeState.bind(this);
  }

  openModalEdit(id){
    this.setState({
      selectedCase: cases.find((caso) => caso.id === id)
    });

    var body = document.body;
    var modal_container = document.getElementById("modal_container");

    body.classList.add("noscroll");
    modal_container.classList.add("show");
  }

  closeEditModal(){
    var body = document.body;
    var modal_container = document.getElementById("modal_container");
    var inputAlg = document.getElementById("inputAlg");
    var inputAlgRot = document.getElementById("inputAlgRot");

    body.classList.remove("noscroll");
    modal_container.classList.remove("show");
    inputAlg.value = "";
    inputAlgRot.selectedIndex = 0;
  }

  handleAdd() {
    var inputAlg = document.getElementById("inputAlg");
    var inputAlgRot = document.getElementById("inputAlgRot");
    var newAlg;

    newAlg = allowedChar.exec(inputAlg.value);
    if(newAlg == null){
      alert("Caracteres invalidos o movimientos unidos. Intente de nuevo."
        +"\nCaracteres permitidos: \"RLUDFBrludfbMSExyz'2( )\".");
    } else {
      cases[this.state.selectedCase.id].algrtm.push(
        {
          "moves": newAlg[0],
          "rot": inputAlgRot.selectedIndex,
          "noOfMoves": newAlg[0].match(allowedMoves).length
        }
      );

      this.setState({});

      inputAlg.value = "";
      inputAlgRot.selectedIndex = 0;
    }
  }

  handleDel (index){
    if(index > this.state.selectedCase.algrtm.length - 2){
      cases[this.state.selectedCase.id].selectedAlgrtm = 0;
    }

    cases[this.state.selectedCase.id].algrtm.splice(index, 1);

    this.setState({});
  }

  handleSelect (index) {
    cases[this.state.selectedCase.id].selectedAlgrtm = index;
    this.setState({});
    console.log(cases[this.state.selectedCase.id]);
  }

  handleChangeState (index) {
    cases[index].learningState = (++cases[index].learningState)%4 ;
    this.setState({});
  }

  aglsOf(shape){
    var casos = [];

    cases.forEach( function(caso) {
        if(shape.id === caso.shape){
          casos.push(caso);
        }
      }
    )

    return casos;
  }
  
  showCategories(){
    if(this.state.orderBy === "number"){
      return(
        <>
          <h2>Todos</h2>
          <div className="Algs">
            {
              cases.map((caso) =>
                <AlgCard key={caso.id} openModal={this.openModalEdit} handleChangeState={this.handleChangeState} case={caso} />
              )
            }
          </div>
        </>
      );

    } else {
      return(
        <>{
            shapes.map((shape) =>
              <div key={shape.id} name={shape.id}>
                <h2>{shape.name}</h2>
                <div className="Algs">
                {
                  this.aglsOf(shape).map((caso) =>
                    <AlgCard key={caso.id} openModal={this.openModalEdit} handleChangeState={this.handleChangeState} case={caso} />
                  )
                }
                </div>
              </div>
            )
        }</>
      );
    }
  }

  render() {
    var caso = this.state.selectedCase;

    return (
      <>
        <h1>Algoritmos OLL</h1>
        {this.showCategories()}

        <Modal func={this.closeEditModal}>
          <h3>{"OLL " + caso.id + " - " + shapes.find((shape) => shape.id === caso.shape).name}</h3>
          <img className={"case-img "+"rt" + caso.algrtm[caso.selectedAlgrtm].rot} 
            src={require("../assets/images/oll/OLL" + caso.id + ".png")}
            alt={"OLL-" + caso.id} 
            onClick={()=> this.handleChangeState(caso.id)}/>
          <span className="over-text">{learningStates[caso.learningState]}</span>

          <table className="algs-table">
            
            <tr>
              <th>&#62;</th>
              <th>Algoritmo</th>
              <th>AUF</th>
              <th>Cambios</th>
            </tr>

            {caso.algrtm.map((alg, i) => 
              <tr key={i}>
                <td>
                    <input type="radio" name="optRadio" onChange={() => this.handleSelect(i)} checked={caso.selectedAlgrtm === i } />
                </td>
                <td>{alg.moves}</td>
                <td>{auf[alg.rot]}</td>
                <td>
                    <button className="del-button" type="button" onClick={() => this.handleDel(i)} disabled={caso.algrtm.length === 1}>× Eliminar</button>
                </td>
              </tr>
            )}

            <tr>
              <td></td>
              <td><input id="inputAlg" type="text" placeholder="Escriba aqui..."></input></td>
              <td><select  id="inputAlgRot">
                  {auf.map((move, i) => 
                      <option key={i} value={i}>{move}</option>
                  )}
                </select></td>
              <td>
                <button className="add-button" type="button" onClick={this.handleAdd}>+ Agregar</button>
              </td>
            </tr>

          </table>


        </Modal>

      </>
    )
  }
}

export default AlgsOll