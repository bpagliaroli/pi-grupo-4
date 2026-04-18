import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Navelement from "../Navelement/Navelement";
import "./Navbar.css";

const cookies = new Cookies();

class Navbar extends Component {
  render() {
    let usuarioLogueado = cookies.get("user-auth-cookie");

    return (
      <nav>
        <ul className="nav">
          <Navelement to="/" opcion="Home" />
          <Navelement to="/movies" opcion="Populares" />
          <Navelement to="/series" opcion="En cartelera" />

          {usuarioLogueado ? (
            <li className="nav-item ml-auto">
              <Link className="nav-link" to="/favoritos">
                Favoritos
              </Link>
            </li>
          ) : null}

          {usuarioLogueado ? null : (
              <li className="nav-item ml-auto">
                <Link className="nav-link" to="/register">
                  Registro
                </Link>
              </li>
          )}

          {usuarioLogueado ? null : (
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}

export default Navbar;
