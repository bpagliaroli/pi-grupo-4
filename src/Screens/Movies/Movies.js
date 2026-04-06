import React, { Component } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./Movies.css";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
      loading: true
    };
  }

  componentDidMount() {
    this.traerPeliculas();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.category !== this.props.match.params.category) {
      this.traerPeliculas();
    }
  }

  traerPeliculas() {
    const category = this.props.match.params.category;
    const endpoint = category === "now-playing" ? "now_playing" : "popular";

    this.setState({ loading: true });

    fetch(
      "https://api.themoviedb.org/3/movie/" +
        endpoint +
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
    const category = this.props.match.params.category;
    const titulo =
      category === "now-playing" ? "Peliculas en cartelera" : "Peliculas populares";

    return (
      <main className="movies">
        <h2 className="movies-title">{titulo}</h2>

        {this.state.loading ? (
          <p>Cargando...</p>
        ) : (
          <div className="movies-grid">
            {this.state.peliculas.map((pelicula) => (
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
