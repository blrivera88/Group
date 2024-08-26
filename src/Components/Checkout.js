import React, { useState } from "react";
import styles from "../Styles/components/Checkout.module.css";
import "../Styles/utilities.css";

function Checkout() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.substring(0, 16);
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formattedValue.trim());
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) {
      value = value.substring(0, 4);
    }
    if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    }
    setExpiryDate(value);
  };

  const handleCvcChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.substring(0, 3);
    setCvc(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulating payment processing and email sending
    setTimeout(() => {
      setIsProcessing(false);
      setConfirmation(
        "Payment successful! A receipt has been sent to your email."
      );
      // TODO: In a real application, handle the payment and send the email here; Stripe.
    }, 2000);
  };

  return (
    <div className="flex-center" style={{ height: "100vh" }}>
      <div className={styles.checkoutContainer}>
        <h1 className={styles.title}>Checkout</h1>
        <form onSubmit={handleSubmit} className={styles.checkoutForm}>
          <div className={styles.formGroup}>
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="0000 0000 0000 0000"
              maxLength="19"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              maxLength="5"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="cvc">CVC</label>
            <input
              type="text"
              id="cvc"
              value={cvc}
              onChange={handleCvcChange}
              placeholder="123"
              maxLength="3"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={styles.checkoutButton}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Submit Payment"}
          </button>
        </form>
        {confirmation && (
          <p className={styles.confirmationMessage}>{confirmation}</p>
        )}
      </div>
    </div>
  );
}

export default Checkout;
