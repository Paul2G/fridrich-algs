import React from 'react';
import { Link } from 'react-router-dom';

function Error404() {
  return (
    <>
        <h1>Error 404</h1>
        <h2>Página no encontrada</h2>

        <div style={{padding: "20px"}}>
            <Link className="site" to="/">
                <h3>Página de inicio</h3> <br/>
            </Link>
            <Link className="site" to="/oll">
                <h3>Algoritmos OLL</h3> <br/>
            </Link>
            <Link className="site" to="/pll">
                <h3>Algoritmos PLL</h3>
            </Link>
        </div>
    </>
  )
}

export default Error404