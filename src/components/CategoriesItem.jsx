import React from "react";

const CategoriesItem = ({ category, categoryName, selectCategory }) => {
  return (
    <button
      onClick={() => {
        selectCategory(category.id, category.name);
      }}
      key={category.id}
      className={`${
        categoryName.find(
          catName => catName.id.toLowerCase() === category.id.toLowerCase()
        )
          ? "bg-[#669fd8] text-white"
          : "bg-secondary text-blackish"
      } text-center flex-1 font-medium p-2 rounded-xl whitespace-nowrap cursor-pointer hover:bg-[#8ab2d7] hover:text-white`}
    >
      {category.name}
    </button>
  );
};

export default CategoriesItem;
