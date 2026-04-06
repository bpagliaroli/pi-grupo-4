import React, { Component } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./Results.css";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultados: [],
      loading: true
    };
  }

  componentDidMount() {
    this.buscarPeliculas();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.busqueda !== this.props.match.params.busqueda) {
      this.buscarPeliculas();
    }
  }

  buscarPeliculas() {
    let query = this.props.match.params.busqueda;

    if (!query) {
      this.setState({
        resultados: [],
        loading: false
      });
      return;
    }

    this.setState({ loading: true });

    fetch(
      "https://api.themoviedb.org/3/search/movie?api_key=e1f309add4d1c8549507f20f59ad035e&query=" +
        query
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          resultados: data.results ? data.results : [],
          loading: false
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <main className="results">
        <h2 className="results-title">Resultados de busqueda</h2>

        {this.state.loading ? (
          <p>Cargando...</p>
        ) : this.state.resultados.length === 0 ? (
          <p>No se encontraron peliculas para esa busqueda.</p>
        ) : (
          <div className="results-grid">
            {this.state.resultados.map((pelicula) => (
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

export default Results;
