import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/index.css";
import App from "./app.js";
import GoogleAuthProviderComponent from "./contexts/GoogleAuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleAuthProviderComponent>
      <App />
    </GoogleAuthProviderComponent>
  </React.StrictMode>
);
