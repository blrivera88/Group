import React, { useState } from "react";
import styles from "../Styles/StreamList.module.css"; // Import the CSS module

function StreamList({ onUserInput }) {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.trim()) {
      if (isEditing) {
        setMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie.id === currentMovie.id ? { ...movie, title: input } : movie
          )
        );
        setIsEditing(false);
        setCurrentMovie(null);
      } else {
        setMovies((prevMovies) => [
          ...prevMovies,
          { id: Date.now(), title: input, isCompleted: false },
        ]);
      }
      setInput(""); // Clear the input field after submission
    }
  };

  const handleEdit = (movie) => {
    setIsEditing(true);
    setInput(movie.title);
    setCurrentMovie(movie);
  };

  const handleDelete = (id) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  };

  const handleComplete = (id) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, isCompleted: !movie.isCompleted } : movie
      )
    );
  };

  return (
    <div className={styles.streamListContainer}>
      <h1 className={styles.streamListTitle}>Stream List</h1>
      <form onSubmit={handleSubmit} className={styles.streamListSearch}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter movie title..."
          className={styles.streamListInput}
        />
        <button type="submit" className={styles.streamListButton}>
          {isEditing ? "Update Movie" : "Add Movie"}
        </button>
      </form>
      <div className={styles.userEvents}>
        <h2>Stream List Movies:</h2>
        <ul>
          {movies.map((movie) => (
            <li
              key={movie.id}
              style={{
                textDecoration: movie.isCompleted ? "line-through" : "none",
              }}
              className={styles.movieItem}
            >
              {movie.title}
              <button
                onClick={() => handleComplete(movie.id)}
                className={styles.movieActionButton}
              >
                {movie.isCompleted ? "Undo" : "Watch"}
              </button>
              <button
                onClick={() => handleEdit(movie)}
                className={styles.movieActionButton}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(movie.id)}
                className={styles.movieActionButton}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StreamList;
