import { Link } from "react-router-dom";
import { useState } from "react";

import "./style.css";
import "../../../App.css";

import JustPizza from "../../../assets/JustPizza_logo.svg";

function MenuNavbar({ toggleCart }) {
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  return (
    <section id="MenuNavbar">
      <div className="bg-gray-50">
        <header className="bg-white shadow-lg sticky top-0 z-40">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0">
                <Link to={"/"} className="flex items-center">
                  <img
                    src={JustPizza}
                    alt="Just Pizza Logo"
                    className={`h-12 md:h-10 mr-2 md:mr-3 transition-transform duration-500 ease-in-out ${
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

              <div className="flex items-center">
                <button
                  onClick={toggleCart}
                  className="p-2 text-gray-700 hover:text-orange-600 transition-colors cursor-pointer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                  >
                    <path
                      d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    ></path>
                    <path
                      d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    ></path>
                    <path
                      d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>
    </section>
  );
}

export default MenuNavbar;