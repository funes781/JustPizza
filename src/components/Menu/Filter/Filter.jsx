import { useState } from "react";
import "./style.css";
import "../../../App.css";
import products from "../../../products.json";

function Filter({ onCategorySelect }) {
  const categories = [
    "Wszystkie",
    ...new Set(products.map((product) => product.kategoria)),
  ];

  const [selectedCategory, setSelectedCategory] = useState("Wszystkie");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  return (
    <section id="filter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-full transition-colors cursor-pointer ${
                selectedCategory === category
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              } shadow-sm`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Filter;
