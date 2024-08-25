import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { GoogleAuthContext } from "../contexts/GoogleAuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import styles from "../Styles/components/NavigationMenu.module.css";

function NavigationMenu() {
  const { user, login, logout } = useContext(GoogleAuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setLoading(false);
      login(tokenResponse);
    },
    onError: (errorResponse) => {
      setLoading(false);
      setError("Login failed. Please try again.");
      console.error("Login error:", errorResponse);
    },
  });

  const handleLogin = () => {
    setLoading(true);
    setError(null);
    googleLogin();
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>MovieSearch</div>
      <div className={styles.menu}>
        <NavLink to="/" exact activeClassName={styles.active}>
          Home
        </NavLink>
        <NavLink to="/streamlist" activeClassName={styles.active}>
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
        {user ? (
          <button className={styles.loginButton} onClick={logout}>
            Logout
          </button>
        ) : (
          <button
            className={styles.loginButton}
            onClick={handleLogin}
            disabled={loading}
            aria-label="Sign in with Google"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        )}
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </nav>
  );
}

export default NavigationMenu;
