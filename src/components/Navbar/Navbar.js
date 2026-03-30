import React from "react";
import Navelement from "../Navelement/Navelement";
import "./Navbar.css";

function Navbar() {
    
    return(
        <nav>
            <ul className="nav">
                <Navelement to="/" opcion="Home"/>
                <Navelement to="/movies" opcion="Películas"/>
                <Navelement to="/series" opcion="Series"/>
                <Navelement to="/favorites" opcion="Favoritas"/>
                <li className="nav-item ml-auto">
                    <a className="nav-link" href="/register">Registro</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                </li>
            </ul>
        </nav>
    )
}
export default Navbar;