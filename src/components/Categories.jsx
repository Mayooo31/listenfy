import React, { useEffect, useState } from "react";
import { useCtx } from "../context/context";

import Playlists from "./Playlists";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const { userLoggedToken } = useCtx();

  const fetchCategories = async () => {
    const res = await fetch(
      "https://api.spotify.com/v1/browse/categories?limit=50&offset=0",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + userLoggedToken,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    setCategories(data.categories.items);
  };

  const selectCategory = async (id, name) => {
    if (categoryName.find(catName => catName.id.toLowerCase() === id.toLowerCase())) {
      const filteredCategoryName = categoryName.filter(
        catName => catName.id.toLowerCase() !== id.toLowerCase()
      );
      setCategoryName(filteredCategoryName);

      const filteredCategory = selectedCategory.filter(cat => {
        const categoryId = cat.href.split("categories/")[1].split("/")[0];

        if (categoryId.toLowerCase() !== id.toLowerCase()) return cat;
      });

      setSelectedCategory(filteredCategory);
      return;
    }

    if (categoryName.length === 5) {
      setSelectedCategory(lastState => lastState.slice(0, -1));
      setCategoryName(lastState => lastState.slice(0, -1));
    }

    categoryName.length === 0 && setCategoryName([{ name, id }]);
    categoryName.length !== 0 &&
      setCategoryName(lastState => [{ name, id }, ...lastState]);

    const res = await fetch(
      `https://api.spotify.com/v1/browse/categories/${id}/playlists?limit=50&offset=0`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + userLoggedToken,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    if (selectedCategory.length === 0) return setSelectedCategory([data.playlists]);
    setSelectedCategory(lastState => [data.playlists, ...lastState]);
  };

  useEffect(() => {
    fetchCategories();
    selectCategory("hiphop", "Hip Hop");
  }, []);

  return (
    <section className="fixed flex flex-col gap-5 top-24 bottom-36 left-0 right-0 m-2 mb-4 rounded-2xl md:left-80 md:ml-4 text-grayish bg-[#222] p-4 overflow-y-auto bb">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium">Categories</h1>
          <div className="flex gap-5 items-center">
            <button
              onClick={() => {
                setSelectedCategory([]);
                setCategoryName([]);
              }}
              className="text-xl hover:text-white"
            >
              Clear filter
            </button>
            <p className="text-xl">{categoryName.length}/5</p>
          </div>
        </div>
        <div className="flex justify-start gap-3 flex-wrap max-h-[200px] overflow-auto">
          {categories.map(category => (
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
          ))}
        </div>
      </div>

      {selectedCategory.length === 0 && (
        <h1 className="flex justify-center text-center pt-10 text-4xl">
          Select category 👌
        </h1>
      )}

      {/* .map() every selected category  */}
      {selectedCategory.map((cat, index) => (
        <Playlists
          key={cat.href}
          data={cat}
          name={categoryName[index].name}
          artist={false}
        />
      ))}

      {selectedCategory.length !== 0 && (
        <h1 className="flex justify-center text-center pt-5 pb-10 text-lg ss:text-2xl">
          - selected categories {categoryName.length} of 5 -
        </h1>
      )}
    </section>
  );
};

export default Categories;
