import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import "./MovieCard.css";

const cookies = new Cookies();

class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostrarDescripcion: false,
      esFavorito: false,
      usuarioLogueado: false
    };
  }

  componentDidMount() {
    const usuario = cookies.get("user-auth-cookie");

    if (usuario) {
      this.setState({ usuarioLogueado: true });
      this.verificarFavorito();
    }
  }

  verificarFavorito() {
    let favoritos = localStorage.getItem("favoritos");

    if (favoritos) {
      favoritos = JSON.parse(favoritos);

      let existe = false;

      for (let i = 0; i < favoritos.length; i++) {
        if (favoritos[i].id === this.props.id) {
          existe = true;
        }
      }

      this.setState({ esFavorito: existe });
    }
  }

  agregarQuitarFavorito() {
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
      if (favoritos[i].id === this.props.id) {
        yaEstaEnFavoritos = true;
      }
    }

    if (yaEstaEnFavoritos) {
      let nuevosFavoritos = [];

      for (let i = 0; i < favoritos.length; i++) {
        if (favoritos[i].id !== this.props.id) {
          nuevosFavoritos.push(favoritos[i]);
        }
      }

      favoritos = nuevosFavoritos;
      this.setState({ esFavorito: false });
    } else {
      const peliculaFavorita = {
        id: this.props.id,
        title: this.props.title,
        poster_path: this.props.poster_path,
        overview: this.props.overview
      };
      favoritos.push(peliculaFavorita);
      this.setState({ esFavorito: true });
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }

  mostrarOcultarDescripcion() {
    this.setState({
      mostrarDescripcion: !this.state.mostrarDescripcion
    });
  }

  mostrarBotonFavoritos() {
    if (this.state.usuarioLogueado === false) {
      return null;
    }

    if (this.state.esFavorito) {
      return (
        <button
          className="favorito-button"
          type="button"
          onClick={() => this.agregarQuitarFavorito()}
          title="Quitar de favoritos"
        >
          ❤
        </button>
      );
    }

    return (
      <button
        className="favorito-button"
        type="button"
        onClick={() => this.agregarQuitarFavorito()}
        title="Agregar a favoritos"
      >
        ♡
      </button>
    );
  }

  render() {
    return (
      <article className="movie-card">
        {this.props.poster_path ? (
          <img
            className="movie-card-image"
            src={"https://image.tmdb.org/t/p/w342" + this.props.poster_path}
            alt={this.props.title}
          />
        ) : (
          <p className="movie-card-empty">Imagen no disponible</p>
        )}

        <h3 className="movie-card-title">{this.props.title}</h3>

        <p className="movie-card-text">
          {this.state.mostrarDescripcion ? this.props.overview : ""}
        </p>

        <button
          className="movie-card-button"
          type="button"
          onClick={() => this.mostrarOcultarDescripcion()}
        >
          Ver descripcion
        </button>

        <Link className="movie-card-link" to={"/detail/" + this.props.id}>
          Ir a detalle
        </Link>

        {this.mostrarBotonFavoritos()}
      </article>
    );
  }
}

export default MovieCard;
