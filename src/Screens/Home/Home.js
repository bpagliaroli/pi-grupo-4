import React, { Component } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import SearchForm from "../../components/SearchForm/SearchForm";
import "./Home.css";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      populares: [],
      enCartelera: [],
      loadingPopulares: true,
      loadingCartelera: true
    };
  }

  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=e1f309add4d1c8549507f20f59ad035e"
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          populares: data.results ? data.results : [],
          loadingPopulares: false
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loadingPopulares: false });
      });

    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=e1f309add4d1c8549507f20f59ad035e"
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          enCartelera: data.results ? data.results : [],
          loadingCartelera: false
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loadingCartelera: false });
      });
  }

  render() {
    let mostrandoCarga = false;

    if (this.state.loadingPopulares) {
      mostrandoCarga = true;
    } else if (this.state.loadingCartelera) {
      mostrandoCarga = true;
    }

    return (
      <main className="home">
        <h2 className="home-title">Buscador</h2>
        <SearchForm />

        {mostrandoCarga ? (
          <p className="home-loading">Cargando...</p>
        ) : (
          <>
            <section className="home-section">
              <div className="home-section-header">
                <h2 className="home-section-title">Peliculas populares</h2>
              </div>
              <div className="home-grid">
                {this.state.populares.map((pelicula, idx) =>
                  idx < 4 ? (
                    <MovieCard
                      key={pelicula.id}
                      id={pelicula.id}
                      title={pelicula.title}
                      overview={pelicula.overview}
                      poster_path={pelicula.poster_path}
                      tipo="populares"
                    />
                  ) : null
                )}
              </div>
              <div className="home-section-footer">
                <Link className="home-section-link" to="/movies">
                  Ver todas
                </Link>
              </div>
            </section>

            <section className="home-section">
              <div className="home-section-header">
                <h2 className="home-section-title">Peliculas en cartelera</h2>
              </div>
              <div className="home-grid">
                {this.state.enCartelera.map((pelicula, idx) =>
                  idx < 4 ? (
                    <MovieCard
                      key={pelicula.id}
                      id={pelicula.id}
                      title={pelicula.title}
                      overview={pelicula.overview}
                      poster_path={pelicula.poster_path}
                      tipo="cartelera"
                    />
                  ) : null
                )}
              </div>
              <div className="home-section-footer">
                <Link className="home-section-link" to="/series">
                  Ver todas
                </Link>
              </div>
            </section>
          </>
        )}
      </main>
    );
  }
}

export default Home;
