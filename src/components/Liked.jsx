import React, { useEffect, useRef, useState } from "react";
import { useCtx } from "../context/context";

import { PlayIcon } from "@heroicons/react/24/solid";
import likedImage from "../assets/liked.png";

import InfoLine from "../components/InfoLine";
import Song from "./Song";
import ButtonLoadNextSongs from "./ButtonLoadNextSongs";
import GoToTop from "./GoToTop";

import wheelHandler from "../utils/wheelHandler";
import goToTopHandler from "../utils/goToTopHandler";

const Liked = () => {
  const sectionRef = useRef();
  const [showGoToTop, setShowGoToTop] = useState(false);
  const [liked, setLiked] = useState([]);
  const { userLoggedToken, userInfo } = useCtx();

  const getLikedSongs = async () => {
    const res = await fetch(`https://api.spotify.com/v1/me/tracks?limit=50&offset=0`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + userLoggedToken,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    setLiked(data);
  };

  const getNextSongs = async offset => {
    const res = await fetch(
      `https://api.spotify.com/v1/me/tracks?limit=50&offset=${offset}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + userLoggedToken,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    data.items = [...liked.items, ...data.items];
    setLiked(data);
  };

  useEffect(() => {
    getLikedSongs();
  }, []);

  return (
    <section
      onScroll={() => wheelHandler(sectionRef, setShowGoToTop)}
      ref={sectionRef}
      className="fixed flex flex-col gap-5 top-24 bottom-36 left-0 right-0 m-2 mb-4 rounded-2xl md:left-80 md:ml-4 text-grayish bg-[#222] p-4 scroll-smooth overflow-y-auto bb"
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-around sm:gap-5 sm:justify-start w-[100%] items-center border-b-2 border-solid border-[#dedede] pb-3">
          <img
            src={likedImage}
            className="h-24 w-24 hidden xs:block sm:h-28 sm:w-28 md:h-36 md:w-36"
          />
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold sm:text-6xl md:text-7xl self-center cursor-default">
              Songs i liked
            </h1>
            <div className="flex gap-1 items-center">
              <img
                src={userInfo.image}
                className="h-8 w-8 md:h-10 md:w-10 rounded-full"
              />
              <p className="text-xl sm:text-2xl font-semibold hover:underline cursor-pointer">
                {userInfo.username}
              </p>
              <p className="text-xl sm:text-2xl cursor-default">
                <span className="font-medium">· {liked.total}</span> songs
              </p>
              <PlayIcon className="h-8 w-8 md:h-10 md:w-10 ease-linear duration-100 hover:text-green-500 cursor-pointer ml-3" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-[95%] md:m-auto">
          {/* Line with info */}
          <InfoLine />

          {/* .map() every song */}
          {liked.items && <Song data={liked.items} />}
        </div>

        {/* button for loading more songs */}
        {liked.offset + liked.limit < liked.total && (
          <ButtonLoadNextSongs click={getNextSongs} data={liked} />
        )}
      </div>

      {/* button for going back to top */}
      {showGoToTop && <GoToTop click={() => goToTopHandler(sectionRef)} />}
    </section>
  );
};

export default Liked;

// text-ellipsis whitespace-nowrap overflow-hidden
