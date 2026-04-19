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
        if (String(favoritos[i].id) === String(this.props.id)) {
          existe = true;
        }
      }
      
      this.setState({ esFavorito: existe });
    }
  }

  agregarQuitarFavorito() {
    let favoritos = localStorage.getItem("favoritos");
    
    if (!favoritos) {
      favoritos = [];
    } else {
      favoritos = JSON.parse(favoritos);
    }

    // Buscar si la película ya está en favoritos
    let yaEstaEnFavoritos = false;
    
    for (let i = 0; i < favoritos.length; i++) {
      if (String(favoritos[i].id) === String(this.props.id)) {
        yaEstaEnFavoritos = true;
      }
    }

    if (yaEstaEnFavoritos) {
      
      let nuevosFavoritos = [];
      for (let i = 0; i < favoritos.length; i++) {
        if (String(favoritos[i].id) !== String(this.props.id)) {
          nuevosFavoritos.push(favoritos[i]);
        }
      }
      favoritos = nuevosFavoritos;
      this.setState({ esFavorito: false });
    } else {
      // Agregar a favoritos
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

        {this.state.mostrarDescripcion ? (
          <p className="movie-card-text">{this.props.overview}</p>
        ) : null}

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

        
        {this.state.usuarioLogueado && (
          <button
            className="favorito-button"
            type="button"
            onClick={() => this.agregarQuitarFavorito()}
            title={this.state.esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            {this.state.esFavorito ? "❤" : "♡"}
          </button>
        )}
      </article>
    );
  }
}

export default MovieCard;
