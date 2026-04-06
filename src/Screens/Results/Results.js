import React, { Component } from "react";
import MovieList from "../../components/MovieList/MovieList";
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
    // Cuando entra por primera vez a la pantalla, busca las peliculas.
    this.buscarPeliculas();
  }

  componentDidUpdate(prevProps) {
    // Si cambia lo escrito en la URL, vuelve a hacer la busqueda.
    if (prevProps.match.params.busqueda !== this.props.match.params.busqueda) {
      this.buscarPeliculas();
    }
  }

  buscarPeliculas() {
    // React Router guarda la palabra buscada dentro de match.params.
    let query = this.props.match.params.busqueda;

    if (!query) {
      this.setState({
        resultados: [],
        loading: false
      });
      return;
    }

    this.setState({ loading: true });

    // Este fetch usa la palabra buscada para traer resultados de TMDB.
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
    let contenido;

    if (this.state.loading) {
      contenido = <p>Cargando...</p>;
    } else if (this.state.resultados.length === 0) {
      contenido = <p>No se encontraron peliculas para esa busqueda.</p>;
    } else {
      contenido = (
        <MovieList className="results-grid" peliculas={this.state.resultados} />
      );
    }

    return (
      <main className="results">
        <h2 className="results-title">Resultados de busqueda</h2>
        {contenido}
      </main>
    );
  }
}

export default Results;
