import { useEffect, useState, useRef } from "react";
import Configurator from "../Configurator/Configurator";

import "./style.css";
import "../../../App.css";
import products from "../../../products.json";

import Cart from "../Cart/Cart";
import { useCart } from "../Cart/CartContext";

function Article({ selectedCategory, isCartOpen, setIsCartOpen }) {
  const [productImages, setProductImages] = useState({});
  const categoryRefs = useRef({});

  const { cartItems, addToCart } = useCart();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showConfigurator, setShowConfigurator] = useState(false);

  const imageModules = import.meta.glob(
    "../../../assets/products/*.{png,jpg,jpeg,gif,webp}"
  );

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = {};

      for (const product of products) {
        try {
          const imagePath = `../../../assets/products/${product.image}`;
          if (imageModules[imagePath]) {
            const module = await imageModules[imagePath]();
            loadedImages[product.image] = module.default;
          }
        } catch (error) {
          console.error(`Error loading image ${product.image}:`, error);
          loadedImages[product.image] = "/placeholder.jpg";
        }
      }

      setProductImages(loadedImages);
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (
      selectedCategory &&
      selectedCategory !== "Wszystkie" &&
      categoryRefs.current[selectedCategory]
    ) {
      categoryRefs.current[selectedCategory].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedCategory]);

  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.kategoria]) {
      acc[product.kategoria] = [];
    }
    acc[product.kategoria].push(product);
    return acc;
  }, {});

  const handleAddToCart = (cartItem) => {
    addToCart(cartItem.selectedOptions);
    setShowConfigurator(false);
  };

  return (
    <>
      <section id="Article" className="py-12">
        <div className="container mx-auto px-4">
          {Object.entries(groupedProducts).map(
            ([category, categoryProducts]) => (
              <div
                key={category}
                ref={(el) => (categoryRefs.current[category] = el)}
                className="mb-12"
              >
                {" "}
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-orange-200">
                  {category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categoryProducts.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer"
                      onClick={() => {
                        setSelectedProduct(item);
                        setShowConfigurator(true);
                      }}
                    >
                      <div className="aspect-w-16 aspect-h-9">
                        <img
                          src={productImages[item.image] || "/placeholder.jpg"}
                          alt={item.nazwa}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <div className="p-6 flex-grow flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {item.nazwa}
                          </h3>
                          <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded">
                            {item.kategoria}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4 flex-grow">
                          {item.opis}
                        </p>
                        <div className="flex justify-between items-center mt-auto">
                          <span className="text-2xl font-bold text-orange-600">
                            {item.rozmiary[0].cena} zł
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProduct(item);
                              setShowConfigurator(true);
                            }}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                          >
                            Dodaj
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>

        {showConfigurator && selectedProduct && (
          <Configurator
            product={selectedProduct}
            onClose={() => setShowConfigurator(false)}
            onAddToCart={handleAddToCart}
          />
        )}

        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
        />
      </section>
    </>
  );
}

export default Article;
