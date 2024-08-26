import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import styles from "../Styles/components/Cart.module.css";

function Cart() {
  const { cart, removeFromCart, updateQuantity, totalAmount } =
    useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

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
                <p className={styles.cartItemInfo}>{item.serviceInfo}</p>
                <p className={styles.cartItemPrice}>${item.price}</p>
                <div className={styles.cartItemQuantity}>
                  <label htmlFor={`quantity-${item.id}`}>Quantity: </label>
                  <input
                    id={`quantity-${item.id}`}
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
      <div className={styles.cartSummary}>
        <h2 className={styles.totalAmount}>Total: ${totalAmount.toFixed(2)}</h2>
        <button onClick={handleCheckout} className={styles.cartCheckoutButton}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
