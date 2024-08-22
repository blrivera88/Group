import React from "react";
import { NavLink } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import styles from "../Styles/NavigationMenu.module.css";

function NavigationMenu() {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>MovieSearch</div>
      <div className={styles.menu}>
        <NavLink to="/" exact activeClassName={styles.active}>
          Home
        </NavLink>
        <NavLink to="/stream-list" activeClassName={styles.active}>
          Stream List
        </NavLink>
        <NavLink to="/movies" activeClassName={styles.active}>
          Movies
        </NavLink>
        <NavLink to="/subscriptions" activeClassName={styles.active}>
          Subscriptions
        </NavLink>
        <NavLink to="/cart" activeClassName={styles.active}>
          Cart (0)
        </NavLink>
        <NavLink to="/about" activeClassName={styles.active}>
          About
        </NavLink>
        <button className={styles.loginButton} onClick={() => login()}>
          Login
        </button>
      </div>
    </nav>
  );
}

export default NavigationMenu;
