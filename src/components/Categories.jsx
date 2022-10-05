import { PlayIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useCtx } from "../context/context";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const { userLoggedToken } = useCtx([]);

  // console.log(categories);
  // console.log(selectedCategory);
  // console.log(categoryName);

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
    if (categoryName.find(catName => catName.toLowerCase() === name.toLowerCase())) {
      const filteredCategoryName = categoryName.filter(
        catName => catName.toLowerCase() !== name.toLowerCase()
      );
      setCategoryName(filteredCategoryName);

      const filteredCategory = selectedCategory.filter(cat => {
        const categoryId = cat.href.split("categories/")[1].split("/")[0];

        if (categoryId.toLowerCase() !== id.toLowerCase()) return cat;
      });

      setSelectedCategory(filteredCategory);
      return;
    }

    categoryName.length === 0 && setCategoryName([name]);
    categoryName.length !== 0 && setCategoryName(lastState => [name, ...lastState]);

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
    <div className="fixed flex flex-col gap-5 top-24 bottom-36 left-0 right-0 m-2 mb-4 rounded-2xl md:left-80 md:ml-4 text-grayish bg-[#222] p-4 overflow-y-auto bb">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium">Categories</h1>
          <div className="flex gap-3 items-center">
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
            <p
              onClick={() => {
                selectCategory(category.id, category.name);
              }}
              key={category.id}
              className={`${
                categoryName.find(
                  catName => catName.toLowerCase() === category.name.toLowerCase()
                )
                  ? "bg-[#669fd8] text-white"
                  : "bg-secondary text-blackish"
              } text-center flex-1 font-medium p-2 rounded-xl whitespace-nowrap cursor-pointer hover:bg-[#8ab2d7] hover:text-white`}
            >
              {category.name}
            </p>
          ))}
        </div>
      </div>

      {selectedCategory.length === 0 && (
        <h1 className="flex justify-center text-center pt-10 text-4xl">
          Select category 👌
        </h1>
      )}

      {selectedCategory.map((cat, index) => (
        <div key={cat.href} className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium">{categoryName[index]}</h1>
          <div className="flex gap-5 h-[155px] md:h-[187px] overflow-x-auto bb">
            {cat.items &&
              cat.items.map(category => {
                if (!category?.snapshot_id || !category?.images[0].url || !category?.name)
                  return;

                return (
                  <div
                    key={category?.snapshot_id + Math.random().toString()}
                    className="w-28 md:w-36 cursor-pointer group"
                  >
                    <div className="relative h-28 md:h-36 w-full">
                      <img
                        src={category?.images[0].url}
                        className="h-full w-full object-cover rounded-md"
                      />
                      <PlayIcon className="absolute h-10 w-10 right-1 bottom-1 text-white md:hidden md:group-hover:block hover:text-green-500 cursor-default" />
                    </div>
                    <p className="font-semibold w-28 md:w-36 pt-[2px] text-ellipsis whitespace-nowrap overflow-hidden group-hover:text-white duration-100 ease-linear">
                      {category?.name}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;

// className={`${categoryName.map(catName =>
//   catName.toLowerCase() === category.name.toLowerCase()
//     ? "bg-[#669fd8] text-white"
//     : "bg-secondary text-blackish"
// )} text-center flex-1 font-medium p-2 rounded-xl whitespace-nowrap cursor-pointer hover:bg-[#8ab2d7] hover:text-white`}
