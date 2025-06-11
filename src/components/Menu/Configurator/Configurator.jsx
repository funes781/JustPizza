import { useState, useEffect } from "react";

function Configurator({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(product.rozmiary[0]);
  const [ingredients, setIngredients] = useState([...product.skladniki]);
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageModules = import.meta.glob(
          "../../../assets/products/*.{png,jpg,jpeg,gif,webp}"
        );
        const imagePath = `../../../assets/products/${product.image}`;

        if (imageModules[imagePath]) {
          const module = await imageModules[imagePath]();
          setCurrentImage(module.default);
        } else {
          setCurrentImage("/placeholder.jpg");
        }
      } catch (error) {
        console.error("Error loading image:", error);
        setCurrentImage("/placeholder.jpg");
      }
    };
    loadImage();
  }, [product.image]);

  const handleIngredientToggle = (ingredient) => {
    if (ingredients.includes(ingredient)) {
      setIngredients(ingredients.filter((item) => item !== ingredient));
    } else {
      setIngredients([...ingredients, ingredient]);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      selectedOptions: {
        nazwa: product.nazwa,
        rozmiar: selectedSize.nazwa,
        cena: selectedSize.cena,
        dodatki: ingredients,
        quantity: quantity,
      },
    };
    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-30 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
          <h3 className="text-xl font-bold">{product.nazwa}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <img
              src={currentImage}
              alt={product.nazwa}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          {product.kategoria === "sosy" ? (
            <div className="mb-6">
              <h4 className="font-medium mb-3">Wybierz rozmiar:</h4>
              <div className="grid grid-cols-3 gap-2">
                {product.rozmiary.map((size) => (
                  <button
                    key={size.nazwa}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 border rounded-md text-sm cursor-pointer ${
                      selectedSize.nazwa === size.nazwa
                        ? "border-orange-500 bg-orange-50 text-orange-600"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="text-sm sm:text-base truncate">
                      {size.nazwa}
                    </div>
                    <div className="font-bold">{size.cena} zł</div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <h4 className="font-medium mb-3">Wybierz rozmiar:</h4>
              <div className="grid grid-cols-3 gap-2">
                {product.rozmiary.map((size) => (
                  <button
                    key={size.nazwa}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 border rounded-md text-sm cursor-pointer ${
                      selectedSize.nazwa === size.nazwa
                        ? "border-orange-500 bg-orange-50 text-orange-600"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div>{size.nazwa}</div>
                    <div className="font-bold">{size.cena} zł</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.kategoria !== "pizza" ? (
            <div className="mb-6"></div>
          ) : (
            product.skladniki &&
            product.skladniki.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium mb-3">Dostosuj składniki:</h4>
                <div className="space-y-2">
                  {product.skladniki.map((ingredient) => (
                    <div
                      key={ingredient}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                    >
                      <span>{ingredient}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={ingredients.includes(ingredient)}
                          onChange={() => handleIngredientToggle(ingredient)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}

          <div className="mb-6 w-full">
            <h4 className="font-medium mb-3 text-center">Ilość:</h4>
            <div className="flex justify-center">
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center cursor-pointer hover:bg-gray-50"
                >
                  -
                </button>
                <div className="w-16 h-10 border-t border-b border-gray-300 flex items-center justify-center">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center cursor-pointer hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-md font-medium transition-colors cursor-pointer"
          >
            Dodaj do koszyka za {selectedSize.cena * quantity} zł
          </button>
        </div>
      </div>
    </div>
  );
}

export default Configurator;
