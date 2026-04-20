import React from "react";
import MovieCard from "../MovieCard/MovieCard";

function MovieList(props) {
  return (
    <div className={props.className}>
      {props.peliculas.map((pelicula) => (
        <MovieCard
          key={pelicula.id + "-" + (pelicula.tipo ? pelicula.tipo : props.tipo)}
          id={pelicula.id}
          title={pelicula.title}
          overview={pelicula.overview}
          poster_path={pelicula.poster_path}
          tipo={pelicula.tipo ? pelicula.tipo : props.tipo}
        />
      ))}
    </div>
  );
}

export default MovieList;
