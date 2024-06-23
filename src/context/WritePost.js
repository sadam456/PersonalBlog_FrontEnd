import { React, createContext, useState } from "react";
const WritePost = createContext();

function Provider({ children }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [customCategory, setCustomCategory] = useState("");

  const categories = [
    "Technology",
    "Science",
    "Sports",
    "Entertainment",
    "Travel",
    "Food",
    "Fashion",
    "Health",
    "Business",
    "Education",
  ];

  const handleCategorySelection = (category) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
      setCustomCategory("");
    }
  };

  const handleRemoveCategory = (category) => {
    setSelectedCategories(selectedCategories.filter((c) => c !== category));
  };

  const handleCustomCategoryChange = (event) => {
    setCustomCategory(event.target.value);
  };

  const handleCustomCategorySubmit = (event) => {
    event.preventDefault();
    const trimmedCategory = customCategory.trim();
    if (trimmedCategory !== "") {
      if (!categories.includes(trimmedCategory)) {
        handleCategorySelection(trimmedCategory);
      }
      setCustomCategory("");
    }
  };

  const valueToShare = {
    selectedCategories,
    customCategory,
    categories,
    handleCategorySelection,
    handleRemoveCategory,
    setSelectedCategories,
    handleCustomCategoryChange,
    handleCustomCategorySubmit,
  };
  return (
    <WritePost.Provider value={valueToShare}>{children}</WritePost.Provider>
  );
}

export { Provider };
export default WritePost;
