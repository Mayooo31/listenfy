import React, { useEffect, useRef, useState } from "react";
import { useCtx } from "../context/context";

import convertDate from "../utils/convertDate";
import convertTime from "../utils/convertTime";

import { PlayIcon } from "@heroicons/react/24/solid";
import likedImage from "../assets/liked.png";
import GoToTop from "./GoToTop";

const Playlist = () => {
  const sectionRef = useRef();
  const [reRender, setReRender] = useState(true);
  const [showGoToTop, setShowGoToTop] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState({
    owner: { display_name: "AO" },
    images: { 0: { url: likedImage } },
  });
  const { userLoggedToken, selectedPlaylistId } = useCtx();

  const getPlaylist = async () => {
    const res = await fetch(
      `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + userLoggedToken,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    setSelectedPlaylist(data);
    sectionRef.current.scrollTop = 0;
  };

  const getNextSongs = async offset => {
    const res = await fetch(
      `https://api.spotify.com/v1/playlists/${selectedPlaylistId}/tracks?offset=${offset}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + userLoggedToken,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    const newData = selectedPlaylist;
    newData.tracks.offset = data.offset;
    newData.tracks.items = [...newData.tracks.items, ...data.items];

    setSelectedPlaylist(newData);
    setReRender(!reRender);
  };

  const wheelHandler = () => {
    if (sectionRef.current.scrollTop < 700) return setShowGoToTop(false);
    setShowGoToTop(true);
  };

  const GoToTopHandler = () => {
    sectionRef.current.scrollTop = 0;
  };

  useEffect(() => {
    getPlaylist();
  }, [selectedPlaylistId]);

  return (
    <section
      onScroll={wheelHandler}
      ref={sectionRef}
      className="fixed flex flex-col gap-5 top-24 bottom-36 left-0 right-0 m-2 mb-4 rounded-2xl md:left-80 md:ml-4 text-grayish bg-[#222] p-4 scroll-smooth overflow-y-auto bb"
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-around sm:gap-5 sm:justify-start w-[100%] items-center border-b-2 border-solid border-[#dedede] pb-3">
          <img
            src={selectedPlaylist.images[0]?.url}
            className="h-24 w-24 rounded-2xl ml-2 object-cover hidden xs:block sm:h-28 sm:w-28 md:h-36 md:w-36"
          />
          <div className="flex flex-col items-center md:items-start">
            <h1
              className="text-3xl text-center md:text-left font-semibold sm:text-6xl md:text-7xl self-center cursor-default
            md:self-start"
            >
              {selectedPlaylist.name}
            </h1>
            {selectedPlaylist.description && (
              <p className="text-xl sm:text-1xl font-medium text-gray-400">
                {selectedPlaylist.description}
              </p>
            )}
            <div className="flex gap-1 items-center">
              <p className="text-xl sm:text-2xl font-semibold hover:underline cursor-pointer">
                {selectedPlaylist.owner.display_name}
              </p>
              <p className="text-xl sm:text-2xl cursor-default">
                <span className="font-medium">· {selectedPlaylist.tracks?.total}</span>{" "}
                songs
              </p>
              <PlayIcon className="h-8 w-8 md:h-10 md:w-10 ease-linear duration-100 hover:text-green-500 cursor-pointer ml-3" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-[95%] md:m-auto">
          {/* Line with info */}
          <div className="group flex w-full items-center pb-1 cursor-default hover:bg-[#292929]">
            <div className="flex items-center gap-2 w-[85%] xs:w-[90%] ss:w-[60%] lg:w-[40%]">
              <p className="hidden sm:block text-lg font-semibold w-8">#</p>
              <p className="w-[75%] text-lg font-semibold text-ellipsis whitespace-nowrap overflow-x-hidden">
                name
              </p>
            </div>
            <div className="hidden text-lg font-semibold lg:block lg:w-[35%] text-ellipsis whitespace-nowrap overflow-hidden">
              album
            </div>
            <div className="hidden text-lg font-semibold ss:block w-[30%] lg:w-[15%]">
              added at
            </div>
            <div className="text-lg font-semibold w-[10%] lg:w-[10%] text-right">
              time
            </div>
          </div>

          {/* mapped every song */}
          {selectedPlaylist.tracks?.items &&
            selectedPlaylist.tracks?.items.map((song, index) => {
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
                  className="group flex gap-3 lg:gap-0 w-full items-center cursor-pointer hover:bg-[#292929]"
                >
                  <div className="flex items-center gap-2 w-[85%] xs:w-[90%] ss:w-[60%] lg:w-[40%]">
                    <p className="hidden sm:block text-lg font-semibold w-8">
                      {index + 1}
                    </p>
                    <div className="relative w-10 h-10">
                      <img
                        src={song.track.album.images[0].url}
                        className="w-10 h-10 object-contain rounded-md group-hover:opacity-60 ease-linear duration-100"
                      />
                      <PlayIcon className="absolute h-10 w-10 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] ease-linear duration-100 text-[#e2e2e2] md:hidden md:group-hover:block hover:text-green-500" />
                    </div>
                    <div className="flex flex-col w-[75%]">
                      <p className="text-lg font-semibold text-ellipsis whitespace-nowrap overflow-x-hidden hover:underline">
                        {song.track.name}
                      </p>
                      <span className="flex gap-2">
                        {song.track.artists.map((artist, index) => (
                          <p
                            key={artist.id}
                            className="font-medium text-ellipsis whitespace-nowrap overflow-x-hidden hover:underline"
                          >
                            {artist.name}
                            {song.track.artists.length !== index + 1 && ","}
                          </p>
                        ))}
                      </span>
                    </div>
                  </div>
                  <div className="hidden font-medium lg:block lg:w-[35%] text-ellipsis whitespace-nowrap overflow-hidden hover:underline lg:pr-4">
                    {song.track.album.name}
                  </div>
                  <div className="hidden font-medium ss:block w-[30%] lg:w-[15%]">
                    {convertDate(song.added_at)}
                  </div>
                  <div className="font-medium w-[10%] lg:w-[10%] text-right">
                    {convertTime(song.track.duration_ms)}
                  </div>
                </div>
              );
            })}
        </div>

        {/* button for loading songs */}
        {selectedPlaylist.tracks?.offset + selectedPlaylist.tracks?.limit <
          selectedPlaylist.tracks?.total && (
          <button
            onClick={() =>
              getNextSongs(
                selectedPlaylist.tracks?.offset + selectedPlaylist.tracks?.limit
              )
            }
            className="text-1xl rounded-2xl bg-blue-400 p-2 mt-3 mb-2 text-blackish font-medium m-auto  hover:bg-blue-300 ease-linear duration-100 active:bg-blue-400"
          >
            NEXT SONGS
          </button>
        )}
      </div>

      {showGoToTop && <GoToTop click={GoToTopHandler} />}
    </section>
  );
};

export default Playlist;
