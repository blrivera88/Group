// src/Components/NavigationMenu.js
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { GoogleAuthContext } from "../contexts/GoogleAuthContext";
import { ThemeContext } from "../contexts/ThemeContext"; // Import ThemeContext
import styles from "../Styles/components/NavigationMenu.module.css";

function NavigationMenu() {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(GoogleAuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext); // Use ThemeContext
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
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            Login
          </NavLink>
        )}
        {/* Theme Toggle Button */}
        <button onClick={toggleTheme} className={styles.themeToggle}>
          {theme === "light" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
    </nav>
  );
}

export default NavigationMenu;
