import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import styles from "../Styles/LogIn.module.css";

function LogIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setLoading(false);
      console.log(tokenResponse);
    },
    onError: (errorResponse) => {
      setLoading(false);
      setError("Login failed. Please try again.");
      console.error(errorResponse);
    },
  });

  const handleLogin = () => {
    setLoading(true);
    setError(null);
    login();
  };

  return (
    <div className={styles.loginContainer}>
      <button
        className={styles.googleBtn}
        onClick={handleLogin}
        disabled={loading}
        aria-label="Sign in with Google"
      >
        {loading ? (
          "Signing in..."
        ) : (
          <>
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google logo"
              width="20"
            />
            Sign in with Google
          </>
        )}
      </button>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
}

export default LogIn;
