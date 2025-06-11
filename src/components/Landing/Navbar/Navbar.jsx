import { useState } from "react";
import { Link } from "react-router-dom";

import JustPizza from "../../../assets/JustPizza_logo.svg";

import "./style.css";
import "../../../App.css";

function Navbar() {
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  return (
    <section id="Navbar">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-5 bg-white shadow-md z-1100">
        <div className="flex items-center mb-4 md:mb-0">
          <Link to={"/"} className="flex items-center">
            <img
              src={JustPizza}
              alt="Just Pizza Logo"
              className={`h-12 md:h-10 mr-4 md:mr-6 transition-transform duration-500 ease-in-out ${
                isLogoHovered ? "animate-wiggle" : ""
              }`}
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            />
            <span className="text-2xl md:text-3xl font-medium cursor-pointer">
              JustPizza
            </span>
          </Link>
        </div>

        <nav className="flex flex-wrap justify-center gap-2 md:gap-0 md:flex md:space-x-8">
          <Link to={"/"}>
            <span className="nav-link text-sm md:text-lg font-medium text-gray-700 hover:text-red-600 px-2 py-1 md:px-0 md:py-0">
              Start
            </span>
          </Link>
          <Link to={"/Menu"}>
            <span className="nav-link text-sm md:text-lg font-medium text-gray-700 hover:text-red-600 px-2 py-1 md:px-0 md:py-0">
              Menu
            </span>
          </Link>
          <Link to={"/Contact"}>
            <span className="nav-link text-sm md:text-lg font-medium text-gray-700 hover:text-red-600 px-2 py-1 md:px-0 md:py-0">
              Kontakt
            </span>
          </Link>
        </nav>
      </div>
    </section>
  );
}

export default Navbar;
