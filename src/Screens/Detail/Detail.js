import React, { Component } from "react";
import Cookies from "universal-cookie";
import "./Detail.css";

const cookies = new Cookies();

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pelicula: null,
      loading: true,
      esFavorito: false
    };
  }
  
  componentDidMount() {
    this.traerDetalle();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.traerDetalle();
    }
  }

  traerDetalle() {
    const id = this.props.match.params.id;

    this.setState({ loading: true });

    fetch(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "?api_key=e1f309add4d1c8549507f20f59ad035e"
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          pelicula: data,
          loading: false
        }, () => this.verificarFavorito());
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  verificarFavorito() {
    if (!this.state.pelicula) {
      return;
    }

    let storage = localStorage.getItem("favoritos");
    let favoritos = storage ? JSON.parse(storage) : [];
    let existe = false;

    for (let i = 0; i < favoritos.length; i++) {
      if (String(favoritos[i].id) === String(this.state.pelicula.id)) {
        existe = true;
      }
    }

    this.setState({
      esFavorito: existe
    });
  }

  agregarQuitarFavorito() {
    if (!cookies.get("user-auth-cookie")) {
      return;
    }

    let storage = localStorage.getItem("favoritos");
    let favoritos = storage ? JSON.parse(storage) : [];

    if (this.state.esFavorito) {
      let nuevosFavoritos = [];

      for (let i = 0; i < favoritos.length; i++) {
        if (String(favoritos[i].id) !== String(this.state.pelicula.id)) {
          nuevosFavoritos.push(favoritos[i]);
        }
      }

      localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
      this.setState({ esFavorito: false });
    } else {
      const peliculaFavorita = {
        id: this.state.pelicula.id,
        title: this.state.pelicula.title,
        poster_path: this.state.pelicula.poster_path,
        overview: this.state.pelicula.overview
      };

      favoritos.push(peliculaFavorita);
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
      this.setState({ esFavorito: true });
    }
  }

  render() {
    const usuarioLogueado = cookies.get("user-auth-cookie");

    if (this.state.loading) {
      return (
        <main className="detail">
          <p>Cargando...</p>
        </main>
      );
    }
   

    if (!this.state.pelicula) {
      return (
        <main className="detail">
          <p>No se encontro la pelicula.</p>
        </main>
      );
    }

    if (this.state.pelicula.success === false) {
      return (
        <main className="detail">
          <p>No se encontro la pelicula.</p>
        </main>
      );
    }

    return (
      <main className="detail">
        <h2 className="detail-title">{this.state.pelicula.title}</h2>

        <div className="detail-content">
          {this.state.pelicula.poster_path ? (
            <img
              className="detail-image"
              src={"https://image.tmdb.org/t/p/w342" + this.state.pelicula.poster_path}
              alt={this.state.pelicula.title}
            />
          ) : (
            <p>Imagen no disponible</p>
          )}

          <div className="detail-info">
            <p>{this.state.pelicula.overview}</p>
            <p>Fecha de estreno: {this.state.pelicula.release_date}</p>
            <p>Calificacion: {this.state.pelicula.vote_average}</p>
            <p>Duracion: {this.state.pelicula.runtime} minutos</p>
            <p><strong>Géneros:</strong> {this.state.pelicula.genres ? this.state.pelicula.genres.map(g => g.name).join(", ") : 'Cargando...'}</p>
            <p><strong>Sinopsis:</strong> {this.state.pelicula.overview}</p>
            {usuarioLogueado ? (
              <button
                className={this.state.esFavorito ? "detail-favorite-button is-favorite" : "detail-favorite-button"}
                type="button"
                onClick={() => this.agregarQuitarFavorito()}
              >
                {this.state.esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
              </button>
            ) : null}

          </div>
          
      </div> 
      </main>
          );
  }
}

export default Detail;
