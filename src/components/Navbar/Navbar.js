import React, { useState, useEffect } from "react";
import Navelement from "../Navelement/Navelement";
import "./Navbar.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Navbar() {
  // Estado para controlar si el usuario está logueado
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);

  // Verificar la cookie cuando el componente monta y cada 500ms
  useEffect(() => {
    const verificarCookie = () => {
      const cookie = cookies.get("user-auth-cookie");
      setUsuarioLogueado(cookie ? true : false);
    };

    // Verificar al montar
    verificarCookie();

    // Verificar cada 500ms para detectar cambios de sesión
    const intervalo = setInterval(verificarCookie, 500);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <nav>
      <ul className="nav">
        <Navelement to="/" opcion="Home" />
        <Navelement to="/movies" opcion="Populares" />
        <Navelement to="/series" opcion="En cartelera" />

        {/* Si el usuario está logueado, mostrar Favoritos */}
        {usuarioLogueado === true && (
          <li className="nav-item ml-auto">
            <Link className="nav-link" to="/favoritos">
              Favoritos
            </Link>
          </li>
        )}

        {/* Si el usuario NO está logueado, mostrar Register y Login */}
        {usuarioLogueado === false && (
          <>
            <li className="nav-item ml-auto">
              <Link className="nav-link" to="/register">
                Registro
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
