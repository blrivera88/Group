import React from "react";
import styles from "../Styles/components/About.module.css";

function About() {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.aboutTitle}>About Us</h1>
      <p className={styles.aboutContent}>
        Welcome to our movie streaming service! We offer a wide variety of
        movies and TV shows for you to enjoy. Our goal is to provide the best
        streaming experience for our users.
      </p>
      <img
        src="path_to_your_image.jpg"
        alt="About Us"
        className={styles.aboutImage}
      />
      <p className={styles.aboutContent}>
        Our service allows you to create personalized watchlists, rate your
        favorite movies, and much more. Join us today and start exploring the
        world of movies like never before!
      </p>
    </div>
  );
}

export default About;
