import React, { Component } from 'react'

import AlgCard from './AlgCard'
import {Modal, openModal} from "./Modal"
import ProgressBar from './ProgressBar'

import cases from "../assets/json/ollCases.json"
import sortings from "../assets/json/ollSortings.json"
import types from "../assets/json/ollTypes.json"
import shapes from "../assets/json/ollShapes.json"

import learningStates from "../assets/json/learningStates.json"

export class AlgsOll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortBy: "shape",

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

    this.openEditModal = this.openEditModal.bind(this);

    this.handleSort = this.handleSort.bind(this);
    this.handleChangeState = this.handleChangeState.bind(this);
  }

  componentDidMount() {
    this.loadCasesFromLocalStorage();

    document.title = "fridrich-algs | OLL"

    this.setState({});
  }

  saveCasesToLocalStorage() {
    localStorage.setItem("ollCases", JSON.stringify(cases));
  }

  loadCasesFromLocalStorage() {
    var recoveredCases = localStorage.getItem("ollCases");

    if (recoveredCases !== null) {
      cases = JSON.parse(recoveredCases);
    }
  }

  openEditModal(id) {
    this.setState({
      selectedCase: cases.find((caso) => caso.id === id)
    });

    openModal();
  }

  handleSort() {
    var sorter = document.getElementById("sorter");

    this.setState({
      sortBy: sortings[sorter.selectedIndex].id
    });

  }

  handleChangeState(index) {
    cases[index - 1].learningState = (++cases[index - 1].learningState) % 4;
    this.setState({});

    this.saveCasesToLocalStorage();
  }

  showCategories() {
    switch (this.state.sortBy) {
      case "num":
        return (
          <>
            <h2>Todos</h2>
            <div className="algs">
              {
                cases.map((caso) =>
                  <AlgCard key={caso.id} openModal={this.openEditModal} handleChangeState={this.handleChangeState} case={caso} />
                )
              }
            </div>
          </>
        );
        break;
      case "type":
        return (
          <>{
            types.map((type, i) =>
              <div key={i} className="subsection">
                <h2>{type}</h2>
                <div className="algs">
                  {
                    cases.filter((caso) => caso.type === i).map((caso) =>
                      <AlgCard key={caso.id} openModal={this.openEditModal} handleChangeState={this.handleChangeState} case={caso} />
                    )
                  }
                </div>
              </div>
            )
          }</>
        );
        break;
      case "shape":
        return (
          <>{
            shapes.map((shape, i) =>
              <div key={i} className="subsection">
                <h2>{shape}</h2>
                <div className="algs">
                  {
                    cases.filter((caso) => caso.shape === i).map((caso) =>
                      <AlgCard key={caso.id} openModal={this.openEditModal} handleChangeState={this.handleChangeState} case={caso} />
                    )
                  }
                </div>
              </div>
            )
          }</>
        );
        break;
      case "lenght":
        var algrtmLength = [0];
        cases.forEach((caso) => {
          if (algrtmLength.every((i) => i !== caso.algrtm[caso.selectedAlgrtm].noOfMoves))
            algrtmLength.push(caso.algrtm[caso.selectedAlgrtm].noOfMoves);
        });
        return (
          <>{
            algrtmLength.sort(function (a, b) { return a - b; }).map((any) => {
              var casesOf = cases.filter((caso) => caso.algrtm[caso.selectedAlgrtm].noOfMoves === any);

              return (any !== 0 &&
                <div key={any} className="subsection">
                  <h2>{any} movimientos</h2>
                  <div className="algs">
                    {
                      casesOf.map((caso) =>
                        <AlgCard key={caso.id} openModal={this.openEditModal} handleChangeState={this.handleChangeState} case={caso} />
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
      case "unknown":
        return (
          <>{
            learningStates.map((learningState, i) => {
              var casesOf = cases.filter((caso) => caso.learningState === i);

              return ((casesOf.length !== 0) &&
                <div key={learningState} className="subsection">
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
      case "prob":
        return (
          <>{
            [54, 108, 216].map((prob) => {
              var casesOf = cases.filter((caso) => caso.prob === prob);
              return (
                <div key={prob} className="subsection">
                  <h2>1/{prob}</h2>
                  <div className="algs">
                    {
                      casesOf.map((caso) =>
                        <AlgCard key={caso.id} openModal={this.openEditModal} handleChangeState={this.handleChangeState} case={caso} />
                      )
                    }
                  </div>
                </div>
              );
            })
          }</>
        );
        break;
      default:
        break;
    }

    return <noscript>Nada de nada</noscript>
  }

  render() {
    var learned = (cases.filter((caso) => caso.learningState === 2).length * 100) / 57;
    var practicing = (cases.filter((caso) => caso.learningState === 1).length * 100) / 57;
    var relearn = (cases.filter((caso) => caso.learningState === 3).length * 100) / 57;

    return (
      <>
        <div className="title">
          <h1>Algoritmos OLL</h1>
          <div>
            <span>Ordenar por: </span>
            <select onChange={this.handleSort} id="sorter" value={this.state.sortBy}>
              {sortings.map((sort) =>
                <option key={sort.id} value={sort.id}>{sort.name}</option>
              )}
            </select>
          </div>
        </div>

        <span>Progreso:</span>
        <ProgressBar learned={learned} practicing={practicing} relearn={relearn} />

        {this.showCategories()}

        <Modal 
          closeModal={this.closeEditModal} 
          reload={() => this.setState({})} 
          changeState = {this.handleChangeState}
          caso={this.state.selectedCase}
          save={this.saveCasesToLocalStorage} />
      </>
    )
  }
}

export default AlgsOll