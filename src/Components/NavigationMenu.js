import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { GoogleAuthContext } from "../contexts/GoogleAuthContext";
import { CartContext } from "../contexts/CartContext"; // Import CartContext
import { useGoogleLogin } from "@react-oauth/google";
import styles from "../Styles/components/NavigationMenu.module.css";

function NavigationMenu() {
  const { user, login, logout } = useContext(GoogleAuthContext);
  const { cart } = useContext(CartContext); // Use CartContext to get cart data
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

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>MovieSearch</div>
      <div className={styles.menu}>
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Movies
        </NavLink>
        <NavLink
          to="/subscriptions"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Subscriptions
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Cart ({cartItemCount})
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
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
