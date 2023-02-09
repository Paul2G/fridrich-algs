import React from 'react'

import "../assets/css/algcard.css"

import learningStates from "../assets/json/learningStates.json"

export default function AlgCard(props){
  var caso = props.case;
  var handleOpenModal = () => props.openModal(caso.id);
  var handleChangeState = () => props.handleChangeState(caso.id);
  
  var route = require(`../assets/images/${props.lastLayerStep}/${props.lastLayerStep}${caso.id}.png`);

  return (
    <div className={"alg-card "+"learn-state"+caso.learningState}>
    <button onClick={handleOpenModal} type="button" className="editBtn"/>
    
    <h3>{props.lastLayerStep.toUpperCase()} {caso.id}</h3>
    <img className={"case-img "+"rt"+caso.algrtm[caso.selectedAlgrtm].rot} 
      src={route} 
      alt={props.lastLayerStep+"" + caso.id}
      onClick={handleChangeState} />
    <span className="over-text">{learningStates[caso.learningState]}</span>
    <span>{caso.algrtm[caso.selectedAlgrtm].moves}</span>
  </div>
  );
}