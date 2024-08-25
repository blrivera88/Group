import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavigationMenu";
import Home from "./Components/Home";
import Movies from "./Components/Movies";
import StreamList from "./Components/StreamList";
import Cart from "./Components/Cart";
import About from "./Components/About";
import Subscriptions from "./Components/Subscriptions";
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
                <Route path="/streamlist" element={<StreamList />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
                <Route path="/subscriptions" element={<Subscriptions />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
