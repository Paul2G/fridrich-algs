import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import ProgressBar from "../components/ProgressBar"

import "../assets/css/home.css"

import cross from "../assets/images/cross.png"
import f2l from "../assets/images/f2l.png"
import oll from "../assets/images/oll.png"
import pll from "../assets/images/pll.png"

let algsCases = require("../assets/json/algsCases.json")

export default function Home(props) {
  const [pllLearned, setPllLearned] = useState(0);
  const [ollLearned, setOllLearned] = useState(0);

  useEffect(() => {
    let recoveredCases = localStorage.getItem("ollCases");
    if (recoveredCases !== null) {
      algsCases["oll"] = JSON.parse(recoveredCases);
    }

    recoveredCases = localStorage.getItem("pllCases");
    if (recoveredCases !== null) {
      algsCases["pll"] = JSON.parse(recoveredCases);
    }

    document.title = "fridrich-algs | Home";

    setOllLearned( (algsCases["oll"].filter((caso) => caso.learningState === 2).length * 100) / 57 );
    setPllLearned( (algsCases["pll"].filter((caso) => caso.learningState === 2).length * 100) / 21 )
  
    return () => {
    }
  }, []);

  return (
    <div>
      <h1>Metodo Fridrich</h1><br/>
      <p>Este método avanzado desarrollado por Jessica Fridrich divide el cubo en capas, de manera que se ha de resolver capa por capa utilizando algoritmos en cada paso, sin destrozar las piezas ya colocadas en su sitio. Estos pasos son los siguientes:</p>
      <br/>
      <div className="all-cards">
        <div className="step-card">
          <h2>Cruz</h2>
          <div className="content">
            <img src={cross} alt="Cross"></img>
            <p>Lo primero de todo tenemos que resolver las aristas blancas en la parte inferior. O sea resolver una cruz blanca con las aristas colocadas en los centros correctos. Deberías ser capaz de determinar los giros necesarios para completar esta cruz blanca al inspeccionar el cubo.</p>
          </div>
        </div>

        <div className="step-card">
          <h2>F2L</h2>
          <div className="content">
            <img src={f2l} alt="F2L"></img>
            <p>Cuando la cruz esté hecha, se resuelven las primeras dos capas (F2L) en un solo paso, mediante la técnica del emparejamiento de la esquina blanca y la arista de la segunda capa.</p>
          </div>
        </div>

        <Link to="/oll" className="step-card clickable">
          <h2>OLL</h2>
          <div className="content">
            <img src={oll} alt="OLL"></img>
            <p>Es el paso en el que debemos resolver la cara amarilla sin hacer coincidir los colores de alrededor. Debes aprender los 57 algoritmos para completar este paso.</p>
          </div>
          <ProgressBar learned={ollLearned} practicing={0} relearn={0}></ProgressBar>
        </Link>

        <Link to="/pll" className="step-card clickable">
          <h2>PLL</h2>
          <div className="content">
            <img src={pll} alt="PLL"></img>
            <p>Para terminar la resolución del cubo se deben hacer coincidir los colores alrededor de la capa amarilla. Existen 21 algoritmos para este paso.</p>
          </div>
          <ProgressBar learned={pllLearned} practicing={0} relearn={0}></ProgressBar>
        </Link>
      </div>
    </div>

    
  )
}