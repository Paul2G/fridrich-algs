import React, { Component } from 'react'

import learningStates from "../assets/json/learningStates.json"

export class AlgCard extends Component {
  render() {
    var caso = this.props.case;
    var handleOpenModal = () => this.props.openModal(caso.id);
    var handleChangeState = () => this.props.handleChangeState(caso.id);

    return (
      <div className={"alg-card "+"learn-state"+caso.learningState}>
        <button onClick={handleOpenModal} type="button" className="editBtn" disabled={caso.id === 0}/>
        
        <h3>OLL {caso.id}</h3>
        <img className={"case-img "+"rt"+caso.algrtm[caso.selectedAlgrtm].rot} 
          src={require("../assets/images/oll/OLL" + caso.id + ".png")} 
          alt={"OLL-" + caso.id}
          onClick={handleChangeState} />
        <span className="over-text">{learningStates[caso.learningState]}</span>
        <span>{caso.algrtm[caso.selectedAlgrtm].moves}</span>
      </div>
    )
  }
}

export default AlgCard