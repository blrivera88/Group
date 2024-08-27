// src/Components/Login.js
import React, { useContext, useState } from "react";
import { GoogleAuthContext } from "../contexts/GoogleAuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import styles from "../Styles/components/Login.module.css";

const Login = () => {
  const { user, login } = useContext(GoogleAuthContext);
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
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Login to MovieSearch</h1>
      {user ? (
        <p className={styles.loggedInMessage}>You are logged in!</p>
      ) : (
        <>
          <button
            className={styles.loginButton}
            onClick={handleLogin}
            disabled={loading}
            aria-label="Sign in with Google"
          >
            {loading ? "Signing in..." : "Login with Google"}
          </button>
          {error && <div className={styles.errorMessage}>{error}</div>}
        </>
      )}
    </div>
  );
};

export default Login;
