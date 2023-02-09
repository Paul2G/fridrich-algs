import React from 'react'

import "../assets/css/footbar.css"

export default function Footer() {
  return (
    <footer className="foot-bar">
        <div className="foot-container">
            <section>
                <h4>Sitios relacionados</h4> 
                <ul>
                    <li>
                        <a href="http://algdb.net/" target="_blank">AlgDb.net Beta</a>   
                    </li>
                    <li>
                        <a href="https://www.myrubik.com/" target="_blank">My Rubik</a> 
                    </li>
                    <li>
                        <a href="https://www.worldcubeassociation.org/" target="_blank">World Cube Association</a>
                    </li>
                </ul>
             </section>
            <section>
                <span><strong>fridrich-algs</strong>. Creado por Paul Garcia</span>

           </section>
        </div>
    </footer>
  )
}