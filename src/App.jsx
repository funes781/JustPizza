import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

// LANDING
import Navbar from "./components/Landing/Navbar/Navbar";
import Hero from "./components/Landing/Hero/Hero";
import Newsletter from "./components/Landing/Newsletter/Newsletter";
import Footer from "./components/Landing/Footer/Footer";

// MENU
import MenuNavbar from "./components/Menu/Navbar/Navbar";
import Filter from "./components/Menu/Filter/Filter";
import Article from "./components/Menu/Article/Article";
import { CartProvider } from "./components/Menu/Cart/CartContext";

// CONTACT
import Contact from "./components/Contact/Contact";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("Wszystkie");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartProvider>
      <Router>
        <div className="overflow-hidden">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Hero />

                  <Newsletter />
                  <Footer />
                </>
              }
            />

            <Route
              path="/Menu"
              element={
                <>
                  {/* <MenuNavbar />
                  <Filter onCategorySelect={setSelectedCategory} />
                  <Article selectedCategory={selectedCategory} /> */}
                   <MenuNavbar toggleCart={toggleCart} />
                  <Filter onCategorySelect={setSelectedCategory} />
                  <Article 
                    selectedCategory={selectedCategory} 
                    isCartOpen={isCartOpen}
                    setIsCartOpen={setIsCartOpen}
                  />
                </>
              }
            />

            <Route
              path="/Contact"
              element={
                <>
                  <Navbar />
                  <Contact />
                  <Footer />
                </>
              }
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
