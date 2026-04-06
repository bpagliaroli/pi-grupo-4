import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";

class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostrarDescripcion: false
    };
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
      </article>
    );
  }
}

export default MovieCard;
