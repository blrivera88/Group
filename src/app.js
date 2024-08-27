import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavigationMenu";
import Home from "./Components/StreamList";
import Movies from "./Components/Movies";
import Cart from "./Components/Cart";
import About from "./Components/About";
import Subscriptions from "./Components/Subscriptions";
import Checkout from "./Components/Checkout";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="content-container">
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
                <Route path="/subscriptions" element={<Subscriptions />} />
                <Route path="/checkout" element={<Checkout />} />{" "}
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
