import React, { useState } from 'react'
import Modal from "./Modal"

import "../assets/css/algmodal.css"

import algsProbabilities from "../assets/json/algsProbabilities.json"
import learningStates from "../assets/json/learningStates.json"
import validations from "../assets/json/regex.json"

export default function AlgModal(props){
  const [, reloadComponent] = useState(false);

  function handleAdd() {
    let inputAlg = document.getElementById("inputAlg");

    let allowedAlgrtm = new RegExp(validations.allowedAlgrtm.regex);
    let allowedMoves = new RegExp(validations.allowedMoves.regex, 'g');

    let newAlg = allowedAlgrtm.exec(inputAlg.value);
    allowedAlgrtm.exec(inputAlg.value);

    if (newAlg === null) {
      alert(validations.allowedAlgrtm.error);
    } else {
      props.caso.algrtm.push(
        {
          "moves": newAlg[0],
          "rot": 0,
          "noOfMoves": newAlg[0].match(allowedMoves).length
        }
      );

      inputAlg.value = "";

      reloadComponent({});

      props.save();
    }
  }

  function handleDel(index) {
    if (index === props.caso.selectedAlgrtm) {
      props.caso.selectedAlgrtm = 0;
    } else if (index < props.caso.selectedAlgrtm) {
      props.caso.selectedAlgrtm--;
    }

    props.caso.algrtm.splice(index, 1);

    props.reload({});

    props.save();
  }

  function handleSelect(index) {
    props.caso.selectedAlgrtm = index;

    props.reload({});

    props.save();
  }

  function handleRotate(index) {
    props.caso.algrtm[index].rot = (++props.caso.algrtm[index].rot) % 4;
    props.caso.selectedAlgrtm = index;

    props.reload({});

    props.save();
  }

  let caso = props.caso;
  let route = require(`../assets/images/${props.lastLayerStep}/${props.lastLayerStep}${caso.id}.png`);
  let exRef = props.lastLayerStep === "oll"  ? 
    `http://algdb.net/puzzle/333/oll/oll${caso.id}` :
    `http://algdb.net/puzzle/333/pll/${caso.id}`;

  return (
    <Modal id="alg_modal">
      <a className="case-exRef" href={exRef} target="_blank" rel="noreferrer" title="Ver en AlgDb.net">
        <h3>{props.lastLayerStep.toUpperCase() + " " + caso.id}</h3>
      </a>
      <img className={"case-img rt" + caso.algrtm[caso.selectedAlgrtm].rot}
        src={route}
        alt={props.lastLayerStep + "-" + caso.id}
        onClick={() => props.changeState(caso.id)} />
      <span className="over-text">{learningStates[caso.learningState]}</span>

      <span>Probabilidad: {algsProbabilities[props.lastLayerStep][caso.prob]}</span>

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
                <input type="radio" name="optRadio" onChange={() => handleSelect(i)} checked={caso.selectedAlgrtm === i} />
              </td>
              <td>{alg.moves}</td>
              <td>
                <button type="button" className="rotate-button" onClick={() => handleRotate(i)} />
              </td>
              <td>
                <button className="del-button" type="button" onClick={() => handleDel(i)} disabled={caso.algrtm.length === 1}>Eliminar</button>
              </td>
            </tr>
          )}

          <tr>
            <td></td>
            <td><input id="inputAlg" type="text" placeholder=" Nuevo algoritmo..."></input></td>
            <td></td>
            <td>
              <button className="add-button" type="button" onClick={handleAdd}>Agregar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </Modal>
  )
}