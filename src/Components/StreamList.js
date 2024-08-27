import React, { useState, useEffect } from "react";
import styles from "../Styles/components/StreamList.module.css";
import "../Styles/utilities.css";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        searchMovies(searchTerm);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const searchMovies = async (term) => {
    try {
      if (!API_KEY) {
        throw new Error(
          "API Key not found. Please set REACT_APP_TMDB_API_KEY in your .env file."
        );
      }
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${term}`
      );
      const data = await response.json();

      if (data.results) {
        setMovies(data.results);
        setError(null);
      } else {
        setMovies([]);
        setError("No results found");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
      setError("Failed to fetch movies. Please try again later.");
    }
  };

  const addToFavorites = (movie) => {
    if (!favorites.some((fav) => fav.id === movie.id)) {
      setFavorites((prevFavorites) => [...prevFavorites, movie]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((movie) => movie.id !== id)
    );
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value === "") {
      setMovies([]);
      setSelectedMovie(null);
    }
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setSearchTerm("");
    setMovies([]);
  };

  const handleAddButtonClick = () => {
    if (selectedMovie) {
      addToFavorites(selectedMovie);
    }
  };

  const toggleEditMode = () => {
    setIsEditMode((prevIsEditMode) => !prevIsEditMode);
  };

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeTitle}>Movie Search</h1>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search Movie Title..."
          value={searchTerm}
          onChange={handleSearchInputChange}
          className={styles.searchInput}
        />
        <div className={styles.buttonGroup}>
          <button
            className={styles.actionButton}
            onClick={handleAddButtonClick}
          >
            Add
          </button>
          <button className={styles.actionButton} onClick={toggleEditMode}>
            Edit
          </button>
        </div>
        {searchTerm && (
          <div className={styles.dropdown}>
            {movies.length > 0 ? (
              movies.map((movie) => (
                <div
                  key={movie.id}
                  className={styles.dropdownItem}
                  onClick={() => handleMovieSelect(movie)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <div className={styles.textContainer}>
                    <span className={styles.titleText}>{movie.title}</span>
                    <span className={styles.dateText}>
                      ({movie.release_date.split("-")[0]})
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noResults}>No results found</div>
            )}
          </div>
        )}
      </div>

      {selectedMovie && (
        <>
          <h2 className={styles.sectionTitle}>Results</h2>
          <div className={styles.movieDetails}>
            <img
              src={`https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              className={styles.moviePoster}
            />
            <div className={styles.movieInfo}>
              <h2>{selectedMovie.title}</h2>
              <p>
                <strong>Year:</strong>{" "}
                {selectedMovie.release_date.split("-")[0]}
              </p>
              <p>
                <strong>Rating:</strong> {selectedMovie.vote_average}
              </p>
              <p>
                <strong>Released:</strong> {selectedMovie.release_date}
              </p>
              <p>
                <strong>Genre:</strong> {/* Add genre information here */}
              </p>
              <p>
                <strong>Writer:</strong> {/* Add writer information here */}
              </p>
              <p>
                <strong>Actors:</strong> {/* Add actors information here */}
              </p>
              <p>
                <strong>Plot:</strong> {selectedMovie.overview}
              </p>
              <p>
                <strong>Language:</strong> {selectedMovie.original_language}
              </p>
              <p>
                <strong>Awards:</strong> {/* Add awards information here */}
              </p>
            </div>
          </div>
        </>
      )}

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.favorites}>
        <h2 className={styles.sectionTitle}>Your Favorites</h2>
        {favorites.length > 0 ? (
          <ul className={styles.movieList}>
            {favorites.map((movie) => (
              <li key={movie.id} className={styles.movieTile}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.movieTileImage}
                />
                <p className={styles.movieTileTitle}>{movie.title}</p>
                {isEditMode && ( // Show the Remove button only in Edit mode
                  <button
                    onClick={() => removeFromFavorites(movie.id)}
                    className={styles.removeButton}
                  >
                    Remove
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noFavorites}>No favorite movies added yet.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
