import { useEffect, useRef, useState } from "react";
import { useCtx } from "../context/context";

import icon from "../assets/radio2.png";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  UserIcon,
  UserCircleIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/solid";

const Navbar = ({ openPanel, setOpenPanel }) => {
  const { userInfo, section, setSection, setSearchedValue } = useCtx();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const searchRef = useRef();

  const searchHandler = () => {
    const val = searchRef.current.value.trim();
    if (val === "") return setSection("library");

    setSearchedValue(val);
    setSection("search");
  };

  useEffect(() => {
    if (showSearchBar) searchRef.current.focus();
  }, [showSearchBar]);

  return (
    <nav className="flex items-center justify-between bg-[#222] h-24 w-full px-3 py-3 sm:justify-around ss:py-6 ">
      <img
        src={icon}
        onClick={() => setOpenPanel(!openPanel)}
        className="block md:hidden w-14 h-14 ss:w-16 ss:h-16 cursor-pointer"
      />
      <img
        onClick={() => setSection("library")}
        src={icon}
        className="hidden md:block w-16 h-16 cursor-pointer"
      />
      <div className="flex items-center gap-4 ss:gap-8">
        <div className="relative hidden ss:block">
          {searchRef.current?.value !== "" && section !== "search" && (
            <ArrowUturnLeftIcon
              onClick={() => setSection("search")}
              className="absolute left-[-50px] top-[50%] translate-y-[-50%] text-secondary w-10 h-10 cursor-pointer"
            />
          )}
          <input
            onChange={searchHandler}
            placeholder="Search..."
            ref={searchRef}
            className="text-2xl font-semibold w-[230px] ss:w-[270px] px-3 py-2 pr-10 outline-none rounded-2xl text-blackish placeholder:text-gray-400"
          />
          <XMarkIcon
            onClick={() => {
              searchRef.current.value = "";
              if (section === "search") setSection("library");
            }}
            className="absolute top-[50%] translate-y-[-50%] right-0 w-10 h-10 text-blackish cursor-pointer"
          />
        </div>
        <div className="block ss:hidden">
          <MagnifyingGlassIcon
            onClick={() => {
              setShowSearchBar(true);
            }}
            className="w-10 h-10 text-secondary"
          />
          {showSearchBar && (
            <>
              <input
                onChange={searchHandler}
                placeholder="Search..."
                ref={searchRef}
                className="absolute top-0 left-0 text-4xl w-full h-24 px-3 py-2 outline-none bg-[#202542f4] text-secondary font-medium text-center placeholder:text-[#d7d7d7]"
              />
              <button
                onClick={() => setShowSearchBar(false)}
                className="absolute top-[100px] left-1/2 translate-x-[-50%] z-10 bg-primary px-6 py-2 rounded-lg text-secondary text-2xl"
              >
                Close
              </button>
            </>
          )}
        </div>
        {userInfo.image ? (
          <img
            src={userInfo.image}
            className="w-12 h-12 ss:w-14 ss:h-14 rounded-full cursor-pointer border-4 border-solid border-blue-400"
          />
        ) : (
          <UserCircleIcon className="w-12 h-12 ss:w-14 ss:h-14 text-secondary" />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
