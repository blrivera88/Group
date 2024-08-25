import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import styles from "../Styles/components/Cart.module.css"; // Import the CSS module

function Cart() {
  const { cart, removeFromCart, updateQuantity, totalAmount } =
    useContext(CartContext);

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.cartTitle}>Your Cart</h1>
      {cart.length > 0 ? (
        <div className={styles.cartItems}>
          {cart.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img
                src={item.img}
                alt={item.service}
                className={styles.cartItemImage}
              />
              <div className={styles.cartItemDetails}>
                <h3 className={styles.cartItemTitle}>{item.service}</h3>
                <p>{item.serviceInfo}</p>
                <p className={styles.cartItemPrice}>Price: ${item.price}</p>
                <div className={styles.cartItemQuantity}>
                  <label>Quantity: </label>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    className={styles.quantityInput}
                  />
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className={styles.cartItemButton}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.emptyCartMessage}>Your cart is empty.</p>
      )}
      <h2 className={styles.totalAmount}>Total: ${totalAmount.toFixed(2)}</h2>
      <button className={styles.cartCheckoutButton}>Proceed to Checkout</button>
    </div>
  );
}

export default Cart;
