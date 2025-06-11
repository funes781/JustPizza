import { useState, useEffect } from "react";
import { useCart } from "./CartContext";

function Cart({ isOpen, onClose, cartItems }) {
  const [isMobile, setIsMobile] = useState(false);
  const { removeFromCart } = useCart();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const groupedCartItems = cartItems;
  console.log(groupedCartItems);

  return (
    <>
      <div
        className={`fixed inset-0 bg-transparent bg-opacity-50 z-40 transition-opacity duration-300 cursor-pointer ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } ${isMobile ? "w-full" : "w-96"}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold">Twój koszyk</h2>
            <button
              onClick={onClose}
              className="text-2xl text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              &times;
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {groupedCartItems.length > 0 ? (
              <div className="space-y-4">
                {groupedCartItems.map((item, index) => (
                  <div
                    key={index}
                    className="border-b pb-4 group" // Dodajemy klasę group dla hover
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium">
                          {item.nazwa}{" "}
                          {item.quantity > 1 && `×${item.quantity}`}
                        </h3>
                        {item?.rozmiar && (
                          <p className="text-sm text-gray-600">
                            Rozmiar: {item.rozmiar}
                          </p>
                        )}
                        {item.dodatki && item.dodatki.length > 0 && (
                          <p className="text-sm text-gray-600">
                            Dodatki: {item.dodatki.join(", ")}
                          </p>
                        )}
                        {item.skladniki && (
                          <p className="text-sm text-gray-600">
                            Składniki: {item.skladniki.join(", ")}
                          </p>
                        )}
                      </div>
                      <div className="ml-4 flex items-center gap-2">
                        <span className="font-bold text-orange-600">
                          {(item.cena || item.rozmiary[0].cena) * item.quantity}{" "}
                          zł
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromCart(index);
                          }}
                          className="md:opacity-0 md:group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity duration-200"
                          aria-label="Usuń przedmiot"
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Twój koszyk jest pusty
              </div>
            )}
          </div>

          {groupedCartItems.length > 0 && (
            <div className="p-4 border-t">
              <div className="flex justify-between mb-4">
                <span className="font-bold">Suma:</span>
                <span className="font-bold text-orange-600">
                  {groupedCartItems.reduce((total, item) => {
                    const price = item.cena || item.rozmiary[0].cena;
                    return total + parseFloat(price) * item.quantity;
                  }, 0)}{" "}
                  zł
                </span>
              </div>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors cursor-pointer">
                Przejdź do zamówienia
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
