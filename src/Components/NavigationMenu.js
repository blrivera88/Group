import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import styles from "../Styles/NavigationMenu.css";

function NavigationMenu() {
  const { cart } = useContext(CartContext);
  const totalItemsInCart = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className={styles.navigationMenu}>
      <ul>
        <NavItem to="/" label="Home" />
        <NavItem to="/streamlist" label="Stream List" />
        <NavItem to="/favorites" label="Favorites" />
        <NavItem to="/movies" label="Movies" />
        <NavItem to="/subscriptions" label="Subscriptions" />
        <NavItem to="/cart" label={`Cart (${totalItemsInCart})`} />
        <NavItem to="/about" label="About" />
      </ul>
    </nav>
  );
}

function NavItem({ to, label }) {
  return (
    <li>
      <Link to={to} className={styles.navLink}>
        {label}
      </Link>
    </li>
  );
}

export default NavigationMenu;
