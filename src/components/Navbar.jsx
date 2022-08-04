import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import "../assets/navbar.css"

import logo from "../assets/images/logo.png"

export class Navbar extends Component {
  render() {
    return (
        <header>
            <div className="navbar-container">
                <Link className="site" to="/">
                    <img className="site-logo" src={logo}/>
                    <span className="site-name">fridrich-algs</span>
                </Link>
                <div className="vr"/>
                <nav className="navbar">
                    <Link to="#" disabled><span className="navbar-item" style={{color: "gray"}}>F2L</span></Link>
                    <Link to="/oll"><span className="navbar-item">OLL</span></Link>
                    <Link to="/pll"><span className="navbar-item">PLL</span></Link>
                </nav>
            </div>
        </header>

    )
  }
}

export default Navbar