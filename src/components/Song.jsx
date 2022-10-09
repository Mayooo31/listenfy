import React from "react";

import { PlayIcon } from "@heroicons/react/24/solid";

import convertDate from "../utils/convertDate";
import convertTime from "../utils/convertTime";
import { useCtx } from "../context/context";

const Song = ({ data }) => {
  const { setSection, setSelectedAlbumId, setSelectedArtistId } = useCtx();

  return data.map((song, index) => {
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
        key={song.track.id + index}
        className="group flex gap-3 lg:gap-0 w-full items-center cursor-pointer hover:bg-[#292929]"
      >
        <div className="flex items-center gap-2 w-[85%] xs:w-[90%] ss:w-[60%] lg:w-[40%]">
          <p className="hidden sm:block text-lg font-semibold w-8">{index + 1}</p>
          <div className="relative w-10 h-10">
            <img
              src={song.track.album.images[0].url}
              className="w-10 h-10 object-contain rounded-md group-hover:opacity-60 ease-linear duration-100"
            />
            <PlayIcon className="absolute h-10 w-10 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] ease-linear duration-100 text-[#e2e2e2] md:hidden md:group-hover:block hover:text-green-500" />
          </div>
          <div className="flex flex-col w-[75%]">
            <p className="w-fit max-w-[98%] text-lg font-semibold text-ellipsis whitespace-nowrap overflow-x-hidden hover:underline">
              {song.track.name}
            </p>
            <span className="flex gap-1">
              {song.track.artists.map((artist, index) => (
                <p
                  key={artist.id}
                  className="font-medium text-ellipsis whitespace-nowrap overflow-x-hidden hover:underline"
                  onClick={() => {
                    setSelectedArtistId(artist.id);
                    setSection("artist");
                  }}
                >
                  {artist.name}
                  {song.track.artists.length !== index + 1 && ","}
                </p>
              ))}
            </span>
          </div>
        </div>
        <div className="hidden font-medium lg:block lg:w-[35%] lg:pr-4">
          <p
            onClick={() => {
              if (song.track.album.type === "album") {
                setSelectedAlbumId(song.track.album.id);
                setSection("album");
              }
            }}
            className="w-fit max-w-[95%] text-ellipsis whitespace-nowrap overflow-hidden hover:underline"
          >
            {song.track.album.name}
          </p>
        </div>
        <div className="hidden font-medium ss:block w-[30%] lg:w-[15%]">
          {convertDate(song.added_at)}
        </div>
        <div className="font-medium w-[10%] lg:w-[10%] text-right">
          {convertTime(song.track.duration_ms)}
        </div>
      </div>
    );
  });
};

export default Song;
