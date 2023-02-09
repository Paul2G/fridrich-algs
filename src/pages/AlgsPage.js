import React, {useContext, useState, useEffect} from 'react'

import ModalContext from '../behaviour/ModalContext';

import AlgCard from '../components/AlgCard'
import AlgModal from "../components/AlgModal"
import ProgressBar from '../components/ProgressBar'

import algsSortings from "../assets/json/algsSortings.json"
import algsTypes from "../assets/json/algsTypes.json"
import algsComplexity from "../assets/json/algsComplexity.json"
import algsProbabilities from "../assets/json/algsProbabilities.json"
import learningStates from "../assets/json/learningStates.json"

export default function AlgsPage(props) {
  const modalContext = useContext(ModalContext);
  const [, reloadComponent] = useState(false);
  const [sortBy, setSortBy] = useState("type");
  const [selectedCase, setSelectedCase] = useState({
      selectedCase: {
      "id": "Aa",
      "type": 0,
      "algrtm": [
        {
          "moves": "Resuelto",
          "rot": 0,
          "noOfMoves": 0
        }
      ],
      "selectedAlgrtm": 0,
      "learningState": 0,
      "complex": 0
    }
  });
  let cases = require("../assets/json/algsCases.json")[props.lastLayerStep];
  let learned, practicing, relearn;

  function loadCasesFromLocalStorage() {
    var recoveredCases = localStorage.getItem(props.lastLayerStep+"Cases");

    if (recoveredCases !== null) {
      cases = JSON.parse(recoveredCases);
    }
  }

  function saveCasesToLocalStorage() {
    localStorage.setItem(props.lastLayerStep+"Cases", JSON.stringify(cases));
  }

  function openEditModal(id) {
    setSelectedCase(cases.find((caso) => caso.id === id));
    
    modalContext.openModal("algModal");
  }

  function handleSort() {
    var sorter = document.getElementById("sorter");

    setSortBy(sorter.value);
  }

  function handleChangeState(id) {
    var caso = cases.find((caso) => caso.id === id);

    caso.learningState = (++caso.learningState) % 4;
    reloadComponent({});

    saveCasesToLocalStorage();
  }

  function showCategories(){
    let sortings = {
      type: algsTypes[props.lastLayerStep], 
      complex: algsComplexity[props.lastLayerStep],
      prob: algsProbabilities[props.lastLayerStep], 
      learningState: learningStates,
      alfanum: ["Todos"],
      noOfMoves: []
    }

    if (sortBy === "noOfMoves"){
      cases.forEach((caso) => {
        if (sortings.noOfMoves.every((value, i) => i !== caso.algrtm[caso.selectedAlgrtm].noOfMoves))
          sortings.noOfMoves.push(caso.algrtm[caso.selectedAlgrtm].noOfMoves);
      });
      sortings.noOfMoves.sort(function (a, b) { return a - b; });
    }

    return (
      <>{
        sortings[sortBy].map((sortedItem, i) => {
          let casesOf = cases.filter((caso) => {
            if(sortBy === "noOfMoves"){
              return (caso.algrtm[caso.selectedAlgrtm].noOfMoves) === i;
            } else if (sortBy === "alfanum"){
              return true;
            } 
            return caso[sortBy] === i;
          });

          return ( (casesOf.length !== 0) &&
            <div key={i} className="subsection">
              <h2>{sortBy === "noOfMoves" ? i + " movimientos" : sortedItem}</h2>
              <div className="algs">
                {
                  casesOf.map((caso) =>
                    <AlgCard key={caso.id} openModal={openEditModal} handleChangeState={handleChangeState} case={caso} lastLayerStep={props.lastLayerStep} />
                  )
                }
              </div>
            </div>
        );})
      }</>
    );
  }

  function updateProgress(){
    const maximunCases = props.lastLayerStep === "oll" ? 57 : 21;

    learned = (cases.filter((caso) => caso.learningState === 2).length * 100) / maximunCases;
    practicing = (cases.filter((caso) => caso.learningState === 1).length * 100) / maximunCases;
    relearn = (cases.filter((caso) => caso.learningState === 3).length * 100) / maximunCases;
  }

  useEffect(() => {
    document.title = "fridrich-algs | " + props.lastLayerStep.toUpperCase();
    return () => {
    }
  }, [props.lastLayerStep]);

  loadCasesFromLocalStorage();
  updateProgress();

  return (
    <>
      <div className="content-header">
        <h1>Algoritmos {props.lastLayerStep.toUpperCase()}</h1>
        <div className='sort-selector'>
          <span>Ordenar por: </span>
          <select onChange={handleSort} id="sorter" value={sortBy}>
            {algsSortings[props.lastLayerStep].map((sort) =>
              <option key={sort.id} value={sort.id}>{sort.name}</option>
            )}
          </select>
        </div>
      </div>

      <span>Progreso:</span>
      <ProgressBar learned={learned} practicing={practicing} relearn={relearn} />

      {showCategories()}

      {modalContext.isModalOpen("algModal") ? 
        <AlgModal 
          reload={() => reloadComponent({})} 
          changeState = {handleChangeState}
          caso={selectedCase}
          lastLayerStep={props.lastLayerStep}
          save={saveCasesToLocalStorage}/>
      : <noscript/>
      }
    </>
  ) 
}