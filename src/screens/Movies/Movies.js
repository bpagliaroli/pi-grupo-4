import React, { Component } from "react";
import MovieList from "../../components/MovieList/MovieList";
import "./Movies.css";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valor: "",
      peliculasIniciales: [],
      peliculasFiltradas: [],
      loading: true,
      paginaActual: 1,
      totalPaginas: null
    };
  }

  componentDidMount() {
    this.traerPeliculas();
  }

  evitarSubmit(event) {
    event.preventDefault();
  }

  controlarCambios(event) {
    this.setState(
      {
        valor: event.target.value
      },
      () => this.filtrarPeliculas(this.state.valor)
    );
  }

  filtrarPeliculas(textoAFiltrar) {
    this.setState({
      peliculasFiltradas: this.state.peliculasIniciales.filter(
        (pelicula) =>
          pelicula.title.toLowerCase().includes(textoAFiltrar.toLowerCase())
      )
    });
  }

  traerPeliculas() {
    this.setState({ loading: true });

    fetch(
      "https://api.themoviedb.org/3/movie/" +
        "popular" +
        "?api_key=e1f309add4d1c8549507f20f59ad035e&page=" +
        this.state.paginaActual
    )
      .then((response) => response.json())
      .then((data) => {
        let resultados = [];
        let peliculasActualizadas = [];
        let totalPaginas = null;

        if (data.results) {
          resultados = data.results;
        }

        if (data.total_pages) {
          totalPaginas = data.total_pages;
        }

        if (this.state.paginaActual === 1) {
          peliculasActualizadas = resultados;
        } else {
          for (let i = 0; i < this.state.peliculasIniciales.length; i++) {
            peliculasActualizadas.push(this.state.peliculasIniciales[i]);
          }

          for (let i = 0; i < resultados.length; i++) {
            peliculasActualizadas.push(resultados[i]);
          }
        }

        this.setState({
          peliculasIniciales: peliculasActualizadas,
          peliculasFiltradas: peliculasActualizadas,
          loading: false,
          totalPaginas: totalPaginas
        }, () => {
          if (this.state.valor !== "") {
            this.filtrarPeliculas(this.state.valor);
          }
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  cargarMas(event) {
    event.preventDefault();

    if (this.state.loading) {
      return;
    }

    this.setState(
      {
        paginaActual: this.state.paginaActual + 1
      },
      () => this.traerPeliculas()
    );
  }

  render() {
    let puedeCargarMas = false;

    if (this.state.totalPaginas === null) {
      puedeCargarMas = true;
    } else if (this.state.paginaActual < this.state.totalPaginas) {
      puedeCargarMas = true;
    }

    return (
      <main className="movies">
        <h2 className="movies-title">Peliculas populares</h2>

        <form onSubmit={(event) => this.evitarSubmit(event)}>
          <input
            type="text"
            value={this.state.valor}
            onChange={(event) => this.controlarCambios(event)}
            placeholder="Filtrar pelic"
          />
        </form>

        {this.state.loading ? (
          <p>Cargando...</p>
        ) : (
          <>
            {this.state.peliculasFiltradas.length > 0 ? (
              <MovieList
                className="moviesLista"
                peliculas={this.state.peliculasFiltradas}
              />
            ) : (
              <p className="moviesVacio">No se encontraron peliculas.</p>
            )}

            {puedeCargarMas ? (
              <button
                className="moviesCargarMas"
                type="button"
                onClick={(event) => this.cargarMas(event)}
              >
                Cargar mas
              </button>
            ) : null}
          </>
        )}
      </main>
    );
  }
}

export default Movies;
