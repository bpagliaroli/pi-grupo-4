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
    // Cuando entra por primera vez a la pantalla, busca las peliculas
    this.buscarPeliculas();
  }

  componentDidUpdate(prevProps) {
    let cambioBusqueda = false;
    let cambioTipo = false;

    if (prevProps.match.params.busqueda !== this.props.match.params.busqueda) {
      cambioBusqueda = true;
    }

    if (prevProps.match.params.tipo !== this.props.match.params.tipo) {
      cambioTipo = true;
    }

    if (cambioBusqueda === true) {
      this.buscarPeliculas();
    } else if (cambioTipo === true) {
      this.buscarPeliculas();
    }
  }

  buscarPeliculas() {
    let query = this.props.match.params.busqueda;
    let tipo = this.props.match.params.tipo;
    let url = "";

    if (!tipo) {
      tipo = "populares";
    }

    if (!query) {
      this.setState({
        resultados: [],
        loading: false
      });
      return;
    }

    this.setState({
      resultados: [],
      loading: true
    });

    if (tipo === "cartelera") {
      url = "https://api.themoviedb.org/3/movie/now_playing?api_key=e1f309add4d1c8549507f20f59ad035e";
    } else {
      url = "https://api.themoviedb.org/3/movie/popular?api_key=e1f309add4d1c8549507f20f59ad035e";
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let resultados = [];

        if (data.results) {
          for (let i = 0; i < data.results.length; i++) {
            if (
              data.results[i].title &&
              data.results[i].title.toLowerCase().includes(query.toLowerCase())
            ) {
              resultados.push(data.results[i]);
            }
          }
        }

        this.setState({
          resultados: resultados,
          loading: false
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <main className="results">
          <h2 className="resultsTitu">Resultados de busqueda</h2>
          <p>Cargando...</p>
        </main>
      );
    }

    if (this.state.resultados.length === 0) {
      return (
        <main className="results">
          <h2 className="resultsTitu">Resultados de busqueda</h2>
          <p>No se encontraron peliculas para esa busqueda.</p>
        </main>
      );
    }

    return (
      <main className="results">
        <h2 className="resultsTitu">Resultados de busqueda</h2>
        <MovieList
          className="resultsVer"
          peliculas={this.state.resultados}
          tipo={this.props.match.params.tipo ? this.props.match.params.tipo : "populares"}
        />
      </main>
    );
  }
}

export default Results;
