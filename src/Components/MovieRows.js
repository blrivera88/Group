import React from "react";
import MovieRow from "./MovieRow";

const categories = [
  { title: "Trending Now", range: [0, 5] },
  { title: "Recently Added", range: [5, 10] },
  // Add more categories as needed
];

function MovieRows({ movies, onSelectMovie, onFavorite, favorites }) {
  return (
    <div className="movie-rows">
      {categories.map((category, index) => (
        <MovieRow
          key={index}
          title={category.title}
          movies={movies.slice(...category.range)}
          onSelectMovie={onSelectMovie}
          onFavorite={onFavorite}
          favorites={favorites}
        />
      ))}
    </div>
  );
}

export default MovieRows;
