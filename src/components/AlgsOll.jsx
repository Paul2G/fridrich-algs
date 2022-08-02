import React, { Component } from 'react'

import AlgCard from './AlgCard'
import Modal from "./Modal"

import cases from "../assets/json/cases.json"
import shapes from "../assets/json/shapes.json"
import types from "../assets/json/types.json"
import learningStates from "../assets/json/learningStates.json"
import auf from "../assets/json/auf.json"
import sortings from "../assets/json/sortings.json"

let allowedChar = /^(((\(? *[RLUDFBrludfbMSExyz]('|2)?) *( |\)) *)+)*((\(?[RLUDFBrludfbMSExyz]('|2)?\)?\b))/g;
let allowedMoves = /[RLUDFBrludfbMSExyz]/g;

export class AlgsOll extends Component {
  constructor (props){
    super(props);
    
    this.state = {
      sortBy: "Forma",
      selectedCase: {
        "id": 0,
        "shape": 15,
        "algrtm": [
          {
            "moves": "Resuelto",
            "rot": 0,
            "noOfMoves": 0
          }
        ],
        "selectedAlgrtm": 0,
        "learningState": 0, 
        "type": 0
      }
    }

    this.openModalEdit = this.openModalEdit.bind(this);
    this.closeModalEdit = this.closeEditModal.bind(this);

    this.handleSort = this.handleSort.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChangeState = this.handleChangeState.bind(this);
  }

  componentDidMount(){
    this.loadCasesFromLocalStorage();
    this.loadSortFromLocalStorage();

    this.setState({});
  }

  saveCasesToLocalStorage() {
    localStorage.setItem("allCases", JSON.stringify(cases));
  }

  saveSortToLocalStorage(){
    localStorage.setItem("sortBy", this.state.sortBy);
  }

  loadCasesFromLocalStorage (){
    var recoveredCases = localStorage.getItem("allCases");

    if(recoveredCases !== null) {
      cases = JSON.parse(recoveredCases);
    }
  }

  loadSortFromLocalStorage(){
    var recoveredSort = localStorage.getItem("sortBy");

    if(recoveredSort !== null) {
      this.state.sortBy = recoveredSort;
    }
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

  handleSort () {
    var sorter = document.getElementById("sorter");

    this.setState({
      sortBy: sortings[sorter.selectedIndex]
    });
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
      cases[this.state.selectedCase.id - 1].algrtm.push(
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
      cases[this.state.selectedCase.id - 1].selectedAlgrtm = 0;
    } else {
      cases[this.state.selectedCase.id - 1].selectedAlgrtm--;
    }

    cases[this.state.selectedCase.id - 1].algrtm.splice(index, 1);

    this.setState({});
  }

  handleSelect (index) {
    cases[this.state.selectedCase.id - 1].selectedAlgrtm = index;
    this.setState({});
  }

  handleChangeState (index) {
    cases[index-1].learningState = (++cases[index-1].learningState)%4 ;
    this.setState({});

    this.saveCasesToLocalStorage();
  }

  showCategories(){
    switch(this.state.sortBy){
      case "Número":
        return(
          <>
            <h2>Todos</h2>
            <div className="algs">
              {
                cases.map((caso) =>
                  <AlgCard key={caso.id} openModal={this.openModalEdit} handleChangeState={this.handleChangeState} case={caso} />
                )
              }
            </div>
          </>
        );
        break;
      case "Orientación":
        return (
          <>{
            types.map((type, i) =>
            <div key={i} className="subsection">
              <h2>{type}</h2>
              <div className="algs">
              {
                cases.filter((caso) => caso.type === i).map((caso) =>
                  <AlgCard key={caso.id} openModal={this.openModalEdit} handleChangeState={this.handleChangeState} case={caso} />
                )
              }
              </div>
            </div>
          )
          }</>
        );
        break;
      case "Forma":
        return(
          <>{
              shapes.map((shape, i) =>
                <div key={i} className="subsection">
                  <h2>{shape}</h2>
                  <div className="algs">
                  {
                    cases.filter((caso) => caso.shape === i).map((caso) =>
                      <AlgCard key={caso.id} openModal={this.openModalEdit} handleChangeState={this.handleChangeState} case={caso} />
                    )
                  }
                  </div>
                </div>
              )
          }</>
        );
        break;
      case "Largo":
        var algrtmLength = [0];
        cases.forEach((caso) => {
          if(algrtmLength.every((i) => i !== caso.algrtm[caso.selectedAlgrtm].noOfMoves))
            algrtmLength.push(caso.algrtm[caso.selectedAlgrtm].noOfMoves);
        });
        return(
          <>{
            algrtmLength.sort(function (a, b) {  return a - b;  }).map((any) => {
              var casesOf =  cases.filter((caso) => caso.algrtm[caso.selectedAlgrtm].noOfMoves === any);
              
              return ( any!==0 &&
                <div key={any} className="subsection">
                  <h2>{any} movimientos</h2>
                  <div className="algs">
                  {
                    casesOf.map((caso) =>
                      <AlgCard key={caso.id} openModal={this.openModalEdit} handleChangeState={this.handleChangeState} case={caso} />
                    )
                  }
                  </div>
                </div>
              );
            }  
            )
          }</>
        );
        
        break;
      case "Conocimiento":
        return (
          <>{
            learningStates.map((learningState, i) => {
              var casesOf = cases.filter((caso) => caso.learningState === i);
              
              return( (casesOf.length !== 0 ) &&
                <div key={i} className="subsection">
                  <h2>{learningState}</h2>
                  <div className="algs">
                  {
                    casesOf.map((caso) =>
                      <AlgCard key={caso.id} openModal={this.openModalEdit} handleChangeState={this.handleChangeState} case={caso} />
                    )
                  }
                  </div>
                </div>
              );
            }
            )
          }</>
        );
        break;
      default:
        break;
    }

    return <noscript>Nada de nada</noscript>
  }

  render() {
    var caso = this.state.selectedCase;

    return (
      <>
      <div className="title">
        <h1>Algoritmos OLL</h1>
        <div>
          <span>Ordenar por: </span>
          <select onChange={this.handleSort} id="sorter">
            {sortings.map((sort, i) => 
              <option key={i} value={i} selected={sort === this.state.sortBy}>{sort}</option>
            )}
          </select>
        </div>
      </div>
        {this.showCategories()}

        <Modal func={this.closeEditModal}>
          <h3>{"OLL " + caso.id + " - " + shapes[caso.shape]}</h3>
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