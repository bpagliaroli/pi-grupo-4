import React, { Component } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./Movies.css";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
      filtro: "",
      loading: true
    };
  }

  componentDidMount() {
    this.traerPeliculas();
  }

  controlarInput(event) {
    this.setState({
      filtro: event.target.value
    });
  }

  traerPeliculas() {
    this.setState({ loading: true });

    fetch(
      "https://api.themoviedb.org/3/movie/" +
        "popular" +
        "?api_key=e1f309add4d1c8549507f20f59ad035e"
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          peliculas: data.results ? data.results : [],
          loading: false
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  render() {
    const peliculasFiltradas = this.state.peliculas.filter((pelicula) => {
      if (this.state.filtro === "") {
        return true;
      }

      if (pelicula.title.toLowerCase() === this.state.filtro.toLowerCase()) {
        return true;
      }

      return false;
    });

    return (
      <main className="movies">
        <h2 className="movies-title">Peliculas populares</h2>

        <form className="movies-form">
          <input
            className="movies-input"
            type="text"
            value={this.state.filtro}
            onChange={(event) => this.controlarInput(event)}
            placeholder="Filtrar peliculas"
          />
        </form>

        {this.state.loading ? (
          <p>Cargando...</p>
        ) : (
          <div className="movies-grid">
            {peliculasFiltradas.map((pelicula) => (
              <MovieCard
                key={pelicula.id}
                id={pelicula.id}
                title={pelicula.title}
                overview={pelicula.overview}
                poster_path={pelicula.poster_path}
              />
            ))}
          </div>
        )}
      </main>
    );
  }
}

export default Movies;
