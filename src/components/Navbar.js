import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import LoginModal from './LoginModal';

import "../assets/css/navbar.css";

import logo from "../assets/images/logo.png";
import ModalContext from '../behaviour/ModalContext';

export default function Navbar(){
    const modalContext = useContext(ModalContext);

    function displayUser() {
        return (
            <div className="user-area">
                <button className="login-button" onClick={()=> modalContext.openModal("authModal")}>
                    Iniciar sesión
                    <i className="bi bi-box-arrow-in-right" />
                </button>
                {modalContext.isModalOpen("authModal") ? <LoginModal /> : <noscript/>}
            </div>
        );
    }

    return (
        <header>
            <div className="navbar-container">
                <Link className="site" to="/">
                    <img className="site-logo" src={logo} alt=''/>
                    <span className="site-name">fridrich-algs</span>
                </Link>
                <div className="vr" />
                <input type="checkbox" id="hamburgerMenu" />
                <label htmlFor="hamburgerMenu" className="hamburger-btn bi bi-list" />
                <nav className="navbar">
                    <ul>
                        <li>
                            <NavLink to="/" className="navbar-item" disabled>F2L</NavLink>
                        </li>
                        <li>
                            <NavLink to="/oll" className="navbar-item">OLL</NavLink>
                        </li>
                        <li>
                            <NavLink to="/pll" className="navbar-item">PLL</NavLink>
                        </li>
                    </ul>
                    {displayUser()}
                </nav>
            </div>
        </header>

    )
}