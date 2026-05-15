import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import "./MovieCard.css";

const cookies = new Cookies();

function MovieCard(props) {
  const [mostrarDescripcion, setMostrarDescripcion] = useState(false);
  const [esFavorito, setEsFavorito] = useState(false);
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);

  useEffect(() => {
    function verificarFavorito() {
      let favoritos = localStorage.getItem("favoritos");

      if (favoritos) {
        favoritos = JSON.parse(favoritos);

        let existe = false;

        for (let i = 0; i < favoritos.length; i++) {
          if (favoritos[i].id === props.id && favoritos[i].tipo === props.tipo) {
            existe = true;
          }
        }

        setEsFavorito(existe);
      }
    }

    const usuario = cookies.get("user-auth-cookie");

    if (usuario) {
      setUsuarioLogueado(true);
      verificarFavorito();
    }
  }, [props.id, props.tipo]);

  function agregarQuitarFavorito() {
    if (!cookies.get("user-auth-cookie")) {
      return;
    }

    let favoritos = localStorage.getItem("favoritos");

    if (!favoritos) {
      favoritos = [];
    } else {
      favoritos = JSON.parse(favoritos);
    }

    let yaEstaEnFavoritos = false;

    for (let i = 0; i < favoritos.length; i++) {
      if (favoritos[i].id === props.id && favoritos[i].tipo === props.tipo) {
        yaEstaEnFavoritos = true;
      }
    }

    if (yaEstaEnFavoritos) {
      let nuevosFavoritos = [];

      for (let i = 0; i < favoritos.length; i++) {
        if (favoritos[i].id !== props.id || favoritos[i].tipo !== props.tipo) {
          nuevosFavoritos.push(favoritos[i]);
        }
      }

      favoritos = nuevosFavoritos;
      setEsFavorito(false);
    } else {
      const peliculaFavorita = {
        id: props.id,
        title: props.title,
        poster_path: props.poster_path,
        overview: props.overview,
        tipo: props.tipo
      };

      favoritos.push(peliculaFavorita);
      setEsFavorito(true);
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }

  function mostrarOcultarDescripcion() {
    setMostrarDescripcion(!mostrarDescripcion);
  }

  return (
    <article className="movie-card">
      {props.poster_path ? (
        <img
          className="movie-card-image"
          src={"https://image.tmdb.org/t/p/w342" + props.poster_path}
          alt={props.title}
        />
      ) : (
        <p className="movie-card-empty">Imagen no disponible</p>
      )}

      <h3 className="movie-card-title">{props.title}</h3>

      <p className="movie-card-text">
        {mostrarDescripcion ? props.overview : ""}
      </p>

      <button
        className="movie-card-button"
        type="button"
        onClick={mostrarOcultarDescripcion}
      >
        Ver descripcion
      </button>

      <Link className="movie-card-link" to={"/detail/" + props.tipo + "/" + props.id}>
        Ir a detalle
      </Link>

      {usuarioLogueado ? (
        <button
          className="favorito-button"
          type="button"
          onClick={agregarQuitarFavorito}
          title={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {esFavorito ? "❤" : "♡"}
        </button>
      ) : null}
    </article>
  );
}

export default MovieCard;
