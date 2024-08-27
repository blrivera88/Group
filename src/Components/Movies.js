import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/components/Movies.module.css"; // Import the CSS module

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function Movies() {
  console.log("API Key:", API_KEY); // Debugging the API Key

  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [categories, setCategories] = useState({});
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(
    localStorage.getItem("selectedGenre") || ""
  );
  const [selectedYear, setSelectedYear] = useState(
    localStorage.getItem("selectedYear") || ""
  );
  const [selectedRating, setSelectedRating] = useState(
    localStorage.getItem("selectedRating") || ""
  );

  useEffect(() => {
    const fetchMovies = async () => {
      const categories = {
        "Action & Adventure": "28",
        "Critically Acclaimed": "12",
        "Top Rated": "top_rated",
        Popular: "popular",
        "Now Playing": "now_playing",
      };

      const promises = Object.keys(categories).map(async (category) => {
        const url = categories[category].match(/^\d+$/)
          ? `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${categories[category]}`
          : `https://api.themoviedb.org/3/movie/${categories[category]}?api_key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        return { category, movies: data.results };
      });

      const results = await Promise.all(promises);
      const categoriesData = {};
      results.forEach(({ category, movies }) => {
        categoriesData[category] = movies;
      });

      setCategories(categoriesData);

      // Set Trolls movie as the featured movie
      setFeaturedMovie({
        title: "Trolls",
        overview:
          "After the monstrous Bergens invade Troll Village, Princess Poppy, the happiest Troll ever born, and overly-cautious, curmudgeonly outcast Branch set off on a journey to rescue her friends. Their mission is full of adventure and mishaps, as this mismatched duo try to tolerate each other long enough to get the job done.",
        backdrop_path: "/gWCWHybWuVg3GmZpdY8qWGb85HR.jpg",
        id: 136799,
      });
    };

    fetchMovies();
    fetchGenres(); // Call to fetch genres
  }, [API_KEY]);

  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("selectedGenre", selectedGenre);
  }, [selectedGenre]);

  useEffect(() => {
    localStorage.setItem("selectedYear", selectedYear);
  }, [selectedYear]);

  useEffect(() => {
    localStorage.setItem("selectedRating", selectedRating);
  }, [selectedRating]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  const filteredMovies = (movies) =>
    movies.filter((movie) => {
      const matchesGenre = selectedGenre
        ? movie.genre_ids.includes(parseInt(selectedGenre))
        : true;
      const matchesYear = selectedYear
        ? new Date(movie.release_date).getFullYear() === parseInt(selectedYear)
        : true;
      const matchesRating = selectedRating
        ? movie.vote_average >= parseFloat(selectedRating)
        : true;
      return matchesGenre && matchesYear && matchesRating;
    });

  return (
    <div className={styles.moviesContainer}>
      {featuredMovie && (
        <div
          className={styles.featuredMovie}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`,
          }}
        >
          <div className={styles.featuredContent}>
            <h1>{featuredMovie.title}</h1>
            <p>{featuredMovie.overview}</p>
            <div className={styles.buttons}>
              <button>Play</button>
              <Link to={`/movie/${featuredMovie.id}`}>
                <button>More Info</button>
              </Link>
            </div>
          </div>
          <div className={styles.fadeBottom}></div>
        </div>
      )}
      {Object.keys(categories).map((category) => (
        <div key={category} className={styles.movieCategory}>
          <h2>{category}</h2>
          <div className={styles.moviesRow}>
            {categories[category] &&
              filteredMovies(categories[category]).map((movie) => (
                <Link to={`/movie/${movie.id}`} key={movie.id}>
                  <div className={styles.movieItems}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className={styles.moviePoster}
                      loading="lazy"
                    />
                    <div className={styles.movieInfo}>
                      <h2 className={styles.movieTitle}>{movie.title}</h2>
                      <p className={styles.movieYear}>
                        Year: {new Date(movie.release_date).getFullYear()}
                      </p>
                      <p className={styles.movieRating}>
                        Rating: {movie.vote_average}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Movies;
