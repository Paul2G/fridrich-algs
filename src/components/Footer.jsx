import React from 'react'

function Footer() {
  return (
    <footer className="foot-bar">
        <div className="foot-container">
            <section>
                <h4>Enlaces de interés</h4> 
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
                <span><strong>fridrich-algs</strong> fue creado por Paul Garcia y licenciado por nadie.</span>

           </section>
        </div>
    </footer>
  )
}

export default Footer