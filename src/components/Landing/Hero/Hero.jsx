import { useState, useEffect, useRef } from "react";
import "./style.css";
import "../../../App.css";
import products from "../../../products.json";

function Hero() {
  const pizzaProducts = products.filter(
    (product) => product.kategoria === "pizza"
  );

  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const timerRef = useRef(null);
  const currentProduct = pizzaProducts[currentProductIndex];
  const accentColor = currentProduct?.kolor_baner || "#c53030";

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const heroRef = useRef(null);

  const imageModules = import.meta.glob(
    "../../../assets/products/*.{png,jpg,jpeg,gif,webp}"
  );

  useEffect(() => {
    const loadImage = async () => {
      const imagePath = `../../../assets/products/${currentProduct?.image}`;
      const imageModule = await imageModules[imagePath]();
      setCurrentImage(imageModule.default);
    };
    loadImage();
  }, [currentProduct?.image]);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentProductIndex((prev) => (prev + 1) % products.length);
    }, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const handleDotClick = (index) => {
    setCurrentProductIndex(index);
    startTimer();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    clearInterval(timerRef.current);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    startTimer();
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      setCurrentProductIndex((prev) => (prev + 1) % pizzaProducts.length);
      startTimer();
    }

    if (touchStart - touchEnd < -50) {
      setCurrentProductIndex(
        (prev) => (prev - 1 + pizzaProducts.length) % pizzaProducts.length
      );
      startTimer();
    }
  };

  function hexToRGBA(hex, alpha = 1) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function adjustBrightness(hex, percent) {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;
    return `#${(
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)}`;
  }

  return (
    <section
      id="Hero"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="touch-pan-y select-none"
    >
      <div className="relative flex flex-col md:flex-row h-[90vh] overflow-hidden bg-gradient-to-br from-gray-900 to-gray-950 z-10">
        <div className="flex-1 h-full flex items-center justify-center md:justify-start px-4 md:pl-10 lg:pl-20 z-20 order-2 md:order-1">
          <div className="max-w-md backdrop-blur-sm bg-black/10 p-6 md:p-8 rounded-2xl border border-white/10 mx-auto md:mx-0">
            <h1 className="text-4xl md:text-7xl font-bold mb-4 text-white font-serif tracking-tight">
              <span className="drop-shadow-md" style={{ color: accentColor }}>
                {currentProduct?.nazwa}
              </span>
            </h1>

            <p className="text-lg text-white/90 mb-6 leading-relaxed">
              {currentProduct?.opis}
            </p>

            <div className="flex gap-6 mb-8 text-white/80">
              <div className="flex items-center">
                <span
                  className="text-2xl font-bold mr-2"
                  style={{ color: accentColor }}
                >
                  {
                    currentProduct?.rozmiary.find((r) => r.nazwa === "Średnia")
                      .cena
                  }
                  zł
                </span>
                <span className="text-sm">(średnia)</span>
              </div>
              <div className="flex items-center">
                <span>⏱️ {currentProduct?.czas_wykonania}</span>
              </div>
            </div>

            <button
              className="relative px-10 py-4 text-white font-bold rounded-full overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${accentColor}, ${adjustBrightness(
                  accentColor,
                  -20
                )})`,
                boxShadow: `0 0 20px ${hexToRGBA(accentColor, 0.5)}`,
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span>Zamów teraz</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </span>
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></span>
            </button>
          </div>
        </div>

        <div
          className="w-[70vmin] h-[70vmin] md:w-[60vmin] md:h-[60vmin] lg:w-[90vmin] lg:h-[90vmin] 
                      mx-auto md:absolute md:top-0 md:right-0 md:mr-[5vmin] md:mt-[5vmin] 
                      lg:top-1/2 lg:-mt-[45vmin] lg:-mr-[15vmin] 
                      z-10 transition-all duration-1000 cursor-pointer 
                      order-1 md:order-2 mt-4 md:mt-0"
        >
          <div
            className="w-full h-full rounded-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${currentImage || ""})`,
              boxShadow: `0 0 80px ${hexToRGBA(accentColor, 0.5)}`,
            }}
          >
            <div className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-br from-transparent via-black/10 to-transparent"></div>
          </div>
        </div>

        {pizzaProducts.length > 1 && (
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30 order-3">
            {pizzaProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  currentProductIndex === index ? "w-6" : "bg-white/50"
                }`}
                style={{
                  backgroundColor:
                    currentProductIndex === index ? accentColor : undefined,
                }}
              />
            ))}
          </div>
        )}

        <div className="absolute inset-0 bg-black/20 z-0"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 to-transparent z-20"></div>
      </div>
    </section>
  );
}

export default Hero;
