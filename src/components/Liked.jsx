import React, { useEffect, useState } from "react";
import { useCtx } from "../context/context";

import convertDate from "../utils/convertDate";
import convertTime from "../utils/convertTime";

import { PlayIcon } from "@heroicons/react/24/solid";
import likedImage from "../assets/liked.png";

const Liked = () => {
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
    <div className="fixed flex flex-col gap-5 top-24 bottom-36 left-0 right-0 m-2 mb-4 rounded-2xl md:left-80 md:ml-4 text-grayish bg-[#222] p-4 overflow-y-auto bb">
      <div className="flex flex-col gap-2">
        <div className="flex justify-around sm:gap-5 sm:justify-start w-[100%] items-center border-b-2 border-solid border-[#dedede] pb-3">
          <img
            src={likedImage}
            className="h-24 w-24 hidden xs:block sm:h-28 sm:w-28 md:h-36 md:w-36"
          />
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold sm:text-6xl md:text-7xl">
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
              <p className="text-xl sm:text-2xl">
                <span className="font-medium">· {liked.total}</span> songs
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-[95%] md:m-auto">
          {liked.items &&
            liked.items.map((song, index) => {
              if (
                !song?.track?.id ||
                !song?.track?.album?.images[0]?.url ||
                !song?.track?.name ||
                !song?.track?.artists ||
                !song?.track?.album?.name ||
                !song?.added_at ||
                !song?.track?.duration_ms
              ) {
                return;
              }
              return (
                <div
                  key={song.track.id}
                  className="group flex gap-3 w-full items-center cursor-pointer hover:bg-[#292929]"
                >
                  <div className="flex items-center gap-2 w-[85%] xs:w-[90%] ss:w-[60%] lg:w-[40%]">
                    <p className="hidden sm:block text-lg font-semibold w-8">
                      {index + 1}
                    </p>
                    <div className="relative">
                      <img
                        src={song.track.album.images[0].url}
                        className="w-10 h-10 object-contain rounded-md group-hover:opacity-60 ease-linear duration-100"
                      />
                      <PlayIcon className="absolute h-10 w-10 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] ease-linear duration-100 text-[#e2e2e2] md:hidden md:group-hover:block hover:text-green-500" />
                    </div>
                    <div className="flex flex-col w-[80%]">
                      <p className="text-lg font-semibold text-ellipsis whitespace-nowrap overflow-x-hidden hover:underline">
                        {song.track.name}
                      </p>
                      <span className="flex gap-2">
                        {song.track.artists.map(artist => (
                          <p
                            key={artist.id}
                            className="font-medium text-ellipsis whitespace-nowrap overflow-x-hidden hover:underline"
                          >
                            {artist.name}
                          </p>
                        ))}
                      </span>
                    </div>
                  </div>
                  <div className="hidden font-medium lg:block lg:w-[35%] text-ellipsis whitespace-nowrap overflow-hidden hover:underline">
                    {song.track.album.name}
                  </div>
                  <div className="hidden font-medium ss:block w-[30%] lg:w-[15%]">
                    {convertDate(song.added_at)}
                  </div>
                  <div className="font-medium w-[10%] lg:w-[10%] text-center">
                    {convertTime(song.track.duration_ms)}
                  </div>
                </div>
              );
            })}
        </div>
        {liked.offset + liked.limit < liked.total && (
          <button
            onClick={() => getNextSongs(liked.offset + liked.limit)}
            className="text-1xl rounded-2xl bg-blue-400 p-2 my-3 text-blackish font-medium m-auto  hover:bg-blue-300 ease-linear duration-100"
          >
            NEXT SONGS
          </button>
        )}
      </div>
    </div>
  );
};

export default Liked;

// text-ellipsis whitespace-nowrap overflow-hidden
