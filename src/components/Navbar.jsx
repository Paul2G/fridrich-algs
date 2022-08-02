import React, { Component } from 'react'
import logo from "../assets/images/logo.png"

export class Navbar extends Component {
  render() {
    return (
        <header>
            <div className="navbar-container">
                <a className="site" href="#">
                    <img className="site-logo" src={logo}/>
                    <span className="site-name">fridrich-algs</span>
                </a>
                <vr/>
                <nav className="navbar">
                    <a href="#"><span className="navbar-item">OLL</span></a>
                    <a href="#"><span className="navbar-item">PLL</span></a>
                </nav>
            </div>
        </header>

    )
  }
}

export default Navbar