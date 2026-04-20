import React, { Component } from "react";
import Cookies from "universal-cookie";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./Favoritos.css";

const cookies = new Cookies();

class Favoritos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritos: []
    };
  }

  componentDidMount() {
    if (!cookies.get("user-auth-cookie")) {
      this.props.history.push("/login");
      return;
    }

    let favs = localStorage.getItem("favoritos");
    
    if (favs !== null) {
      let favoritos = JSON.parse(favs);
      this.setState({
        favoritos: favoritos
      });
    }
  }

  render() {
    return (
      <div className="favoritos-container">
        <h2>Mis películas favoritas</h2>

        {this.state.favoritos.length === 0 ? (
          <p className="sin-favoritos">No tienes películas favoritas aún</p>
        ) : (
          <div className="movies-grid">
            {this.state.favoritos.map((pelicula) => (
              <MovieCard
                key={pelicula.id + "-" + pelicula.tipo}
                id={pelicula.id}
                title={pelicula.title}
                poster_path={pelicula.poster_path}
                overview={pelicula.overview}
                tipo={pelicula.tipo}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Favoritos;
