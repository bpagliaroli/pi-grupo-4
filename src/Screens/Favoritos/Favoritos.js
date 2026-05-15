import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./Favoritos.css";

const cookies = new Cookies();

function Favoritos(props) {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    if (!cookies.get("user-auth-cookie")) {
      props.history.push("/login");
      return;
    }

    let favs = localStorage.getItem("favoritos");

    if (favs !== null) {
      let favoritosGuardados = JSON.parse(favs);
      setFavoritos(favoritosGuardados);
    }
  }, [props.history]);

  return (
    <div className="favoritos-container">
      <h2>Mis películas favoritas</h2>

      {favoritos.length === 0 ? (
        <p className="sin-favoritos">No tienes películas favoritas aún</p>
      ) : (
        <div className="movies-grid">
          {favoritos.map((pelicula) => (
            <MovieCard
              key={pelicula.id + "-" + pelicula.tipo}
              id={pelicula.id}
              title={pelicula.title}
              poster_path={pelicula.poster_path}
              overview={pelicula.overview}
              tipo={pelicula.tipo}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favoritos;
