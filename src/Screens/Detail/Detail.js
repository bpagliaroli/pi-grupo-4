import React, { Component } from "react";
import "./Detail.css";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pelicula: null,
      loading: true
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
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  }
    agregarFavorito() {
        let storage = localStorage.getItem('favoritos');
        let favs = storage ? JSON.parse(storage) : [];
        
        favs.push(this.state.pelicula.id);
        localStorage.setItem('favoritos', JSON.stringify(favs));
        alert("Película agregada a favoritos");
    }
  render() {
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
            {localStorage.getItem("usuarioLogueado") && (
              <button onClick={() => this.agregarFavorito()}>
                Agregar a favoritos
               </button>
            )}

          </div>
          
      </div> 
      </main>
          );
  }
}

export default Detail;
