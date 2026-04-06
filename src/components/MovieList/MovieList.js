import React from "react";
import MovieCard from "../MovieCard/MovieCard";

function MovieList(props) {
  return (
    <div className={props.className}>
      {props.peliculas.map((pelicula) => (
        <MovieCard
          key={pelicula.id}
          id={pelicula.id}
          title={pelicula.title}
          overview={pelicula.overview}
          poster_path={pelicula.poster_path}
        />
      ))}
    </div>
  );
}

export default MovieList;
