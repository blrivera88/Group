import React, { useState, useEffect } from "react";
import styles from "../Styles/components/Movies.module.css"; // Import the CSS module

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function Movies() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm) {
      searchMovies(searchTerm);
    }
  }, [searchTerm]);

  const searchMovies = async (term) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${term}&apikey=${API_KEY}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        console.error("API Error:", data.Error);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    }
  };

  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${movieId}&apikey=${API_KEY}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setSelectedMovie(data);
      } else {
        console.error("API Error:", data.Error);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

    if (isFavorite) {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.imdbID !== movie.imdbID)
      );
    } else {
      setFavorites((prevFavorites) => [...prevFavorites, movie]);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRemoveFavorite = (movieId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((movie) => movie.imdbID !== movieId)
    );
  };

  return (
    <div className={styles.moviesContainer}>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search Movie Title ..."
          value={searchTerm}
          onChange={handleSearchInputChange}
          className={styles.searchInput}
        />
        <button
          onClick={() => searchMovies(searchTerm)}
          className={styles.searchButton}
        >
          Search
        </button>
      </div>

      <div className={styles.movieRows}>
        <h2 className={styles.sectionTitle}>Trending Now</h2>
        <div className={styles.movies}>
          {movies.slice(0, 5).map((movie) => (
            <div key={movie.imdbID} className={styles.movie}>
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/150"
                }
                alt={movie.Title}
                className={styles.movieImage}
              />
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
              <button
                onClick={() => fetchMovieDetails(movie.imdbID)}
                className={styles.detailsButton}
              >
                Details
              </button>
              <button
                onClick={() => toggleFavorite(movie)}
                className={styles.favoriteButton}
              >
                {favorites.some((fav) => fav.imdbID === movie.imdbID)
                  ? "Remove from Favorites"
                  : "Add to Favorites"}
              </button>
            </div>
          ))}
        </div>

        <h2 className={styles.sectionTitle}>Recently Added</h2>
        <div className={styles.movies}>
          {movies.slice(5, 10).map((movie) => (
            <div key={movie.imdbID} className={styles.movie}>
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/150"
                }
                alt={movie.Title}
                className={styles.movieImage}
              />
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
              <button
                onClick={() => fetchMovieDetails(movie.imdbID)}
                className={styles.detailsButton}
              >
                Details
              </button>
              <button
                onClick={() => toggleFavorite(movie)}
                className={styles.favoriteButton}
              >
                {favorites.some((fav) => fav.imdbID === movie.imdbID)
                  ? "Remove from Favorites"
                  : "Add to Favorites"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.favorites}>
        <h2 className={styles.sectionTitle}>Favorites</h2>
        {favorites.length > 0 ? (
          <ul className={styles.favoriteList}>
            {favorites.map((movie) => (
              <li key={movie.imdbID} className={styles.favoriteItem}>
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
                <button
                  onClick={() => handleRemoveFavorite(movie.imdbID)}
                  className={styles.removeFavoriteButton}
                >
                  Remove from Favorites
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noFavorites}>No favorite movies added yet.</p>
        )}
      </div>

      {selectedMovie && (
        <div className={styles.movieDetailsModal}>
          <div className={styles.modalContent}>
            <button
              onClick={() => setSelectedMovie(null)}
              className={styles.closeButton}
            >
              &times;
            </button>
            <h2>{selectedMovie.Title}</h2>
            <p>{selectedMovie.Year}</p>
            <p>{selectedMovie.Genre}</p>
            <p>{selectedMovie.Plot}</p>
            <p>{selectedMovie.Actors}</p>
            <p>{selectedMovie.Language}</p>
            <p>{selectedMovie.Awards}</p>
            <img
              src={
                selectedMovie.Poster !== "N/A"
                  ? selectedMovie.Poster
                  : "https://via.placeholder.com/150"
              }
              alt={selectedMovie.Title}
              className={styles.modalImage}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Movies;
