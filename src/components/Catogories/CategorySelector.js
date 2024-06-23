import React, { useContext, useState, useEffect, useRef } from "react";
import "./Category.css";
import WritePost from "../../context/WritePost";
import { TiDelete } from "react-icons/ti";
const CategorySelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const {
    selectedCategories,
    customCategory,
    categories,
    handleCategorySelection,
    handleRemoveCategory,
    handleCustomCategoryChange,
    handleCustomCategorySubmit,
  } = useContext(WritePost);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="category-selector">
      <h2>Select Categories</h2>
      <div className="dropdown" ref={dropdownRef}>
        <form onSubmit={handleCustomCategorySubmit}>
          <input
            type="text"
            value={customCategory}
            onChange={handleCustomCategoryChange}
            onClick={toggleDropdown}
            placeholder="Type or select a category..."
            className="category-input"
          />
        </form>
        {isOpen && (
          <div className="options">
            {categories
              .filter(
                (category) =>
                  !selectedCategories.includes(category) &&
                  category.toLowerCase().includes(customCategory.toLowerCase())
              )
              .map((category) => (
                <div
                  key={category}
                  onClick={() => handleCategorySelection(category)}
                  className="option"
                >
                  {category}
                </div>
              ))}
          </div>
        )}
      </div>
      <h2>Selected Categories</h2>
      <div className="selected-categories">
        {selectedCategories.map((category) => (
          <div key={category} className="selected-category">
            {category}{" "}
            <button onClick={() => handleRemoveCategory(category)}>
              <TiDelete />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
