import React, { useState, useEffect } from "react";
import styles from "../Styles/components/Home.module.css";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        searchMovies(searchTerm);
      }
    }, 300); // Debounce time (300ms)

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
  };

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>Movie Search</h1>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search Movie Title..."
          value={searchTerm}
          onChange={handleSearchInputChange}
          className={styles.searchInput}
        />
        {searchTerm && (
          <div className={styles.dropdown}>
            {movies.length > 0 ? (
              movies.map((movie) => (
                <div
                  key={movie.id}
                  className={styles.dropdownItem}
                  onClick={() => addToFavorites(movie)}
                >
                  {movie.title} ({movie.release_date.split("-")[0]})
                </div>
              ))
            ) : (
              <div className={styles.noResults}>No results found</div>
            )}
          </div>
        )}
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.movieResults}>
        <h2 className={styles.sectionTitle}>Results</h2>
        {movies.length > 0 ? (
          <ul className={styles.movieList}>
            {movies.map((movie) => (
              <li key={movie.id} className={styles.movieItem}>
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.movieImage}
                />
                <button
                  onClick={() => addToFavorites(movie)}
                  className={styles.addButton}
                >
                  Add to Favorites
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noResults}>No movies found</p>
        )}
      </div>

      <div className={styles.favorites}>
        <h2 className={styles.sectionTitle}>Your Favorites</h2>
        {favorites.length > 0 ? (
          <ul className={styles.movieList}>
            {favorites.map((movie) => (
              <li key={movie.id} className={styles.movieItem}>
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.movieImage}
                />
                <button
                  onClick={() => removeFromFavorites(movie.id)}
                  className={styles.removeButton}
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
    </div>
  );
}

export default Home;
