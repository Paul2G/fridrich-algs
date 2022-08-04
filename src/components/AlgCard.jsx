import React, { Component } from 'react'

import "../assets/algcard.css"

import learningStates from "../assets/json/learningStates.json"

export class AlgCard extends Component {
  render() {
    var caso = this.props.case;
    var handleOpenModal = () => this.props.openModal(caso.id);
    var handleChangeState = () => this.props.handleChangeState(caso.id);

    if(caso.shape !== undefined){
      var route = require("../assets/images/oll/OLL"+caso.id+".png");
      var step = "OLL";
    } else {
      var route = require("../assets/images/pll/PLL"+caso.id+".png");
      var step = "";
    }

    return (
      <div className={"alg-card "+"learn-state"+caso.learningState}>
        <button onClick={handleOpenModal} type="button" className="editBtn"/>
        
        <h3>{step} {caso.id}</h3>
        <img className={"case-img "+"rt"+caso.algrtm[caso.selectedAlgrtm].rot} 
          src={route} 
          alt={step+"-" + caso.id}
          onClick={handleChangeState} />
        <span className="over-text">{learningStates[caso.learningState]}</span>
        <span>{caso.algrtm[caso.selectedAlgrtm].moves}</span>
      </div>
    )
  }
}

export default AlgCard