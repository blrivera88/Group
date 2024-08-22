import React, { useContext } from "react";
import list from "../subscriptionList";
import { CartContext } from "../contexts/CartContext";
import styles from "../Styles/Subscriptions.module.css"; // Import the CSS module

function Subscriptions() {
  const { addToCart, cart } = useContext(CartContext);

  const isInCart = (id) => cart.some((item) => item.id === id);

  return (
    <div className={styles.subscriptionsContainer}>
      <h1 className={styles.subscriptionsTitle}>Choose Your Subscription</h1>
      <div className={styles.subscriptionsGrid}>
        {list.map((item) => (
          <div key={item.id} className={styles.subscriptionCard}>
            <img
              src={item.img}
              alt={item.service}
              className={styles.subscriptionImg}
            />
            <div className={styles.subscriptionDetails}>
              <h3 className={styles.subscriptionTitle}>{item.service}</h3>
              <p className={styles.subscriptionInfo}>{item.serviceInfo}</p>
              <p className={styles.subscriptionPrice}>
                ${item.price.toFixed(2)}
              </p>
              <button
                className={`${styles.addToCartButton} ${
                  isInCart(item.id) ? styles.inCart : ""
                }`}
                onClick={() => addToCart(item)}
                disabled={isInCart(item.id)}
              >
                {isInCart(item.id) ? "In Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subscriptions;
