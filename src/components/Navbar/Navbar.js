import React from "react";
import Navelement from "../Navelement/Navelement";
import "./Navbar.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Navbar() {
    
    return(
        <nav>
            <ul className="nav">
                <Navelement to="/" opcion="Home"/>
                <Navelement to="/movies" opcion="Películas"/>
                <Navelement to="/series" opcion="Series"/>
                <Navelement to="/favorites" opcion="Favoritas"/>
                <li className="nav-item ml-auto">
                    <Link className="nav-link" to="/register">Registro</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        </nav>
    )
}
export default Navbar;