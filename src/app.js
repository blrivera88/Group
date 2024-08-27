// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavigationMenu";
import Home from "./Components/StreamList";
import Movies from "./Components/Movies";
import Cart from "./Components/Cart";
import About from "./Components/About";
import Subscriptions from "./Components/Subscriptions";
import Checkout from "./Components/Checkout";
import Login from "./Components/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import { CartProvider } from "./contexts/CartContext";
import ThemeProvider from "./contexts/ThemeContext"; // Import ThemeProvider

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Navbar />
            <div className="content-container">
              <div className="main-content">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Home />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/movies"
                    element={
                      <ProtectedRoute>
                        <Movies />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/subscriptions"
                    element={
                      <ProtectedRoute>
                        <Subscriptions />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </div>
            </div>
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
