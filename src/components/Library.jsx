import React from "react";
import { useCtx } from "../context/context";

import { PlayIcon } from "@heroicons/react/24/solid";

const Library = () => {
  const { playlists, myTopSongs, newReleases } = useCtx();

  return (
    <section className="fixed flex flex-col gap-5 top-24 bottom-36 left-0 right-0 m-2 mb-4 rounded-2xl md:left-80 md:ml-4 text-grayish bg-[#222] p-4 overflow-y-auto bb">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium">Your playlists</h1>
        <div className="flex gap-5 h-[155px] md:h-[187px] overflow-x-auto bb">
          {playlists.map(playlist => (
            <div key={playlist.id} className="w-28 md:w-36 cursor-pointer group">
              <div className="relative h-28 md:h-36 w-full">
                <img
                  src={playlist.images[0]?.url && playlist.images[0]?.url}
                  className="h-full w-full object-cover rounded-md"
                />
                <PlayIcon className="absolute h-10 w-10 right-1 bottom-1 text-white md:hidden md:group-hover:block hover:text-green-500 cursor-default" />
              </div>
              <p className="font-medium w-28 md:w-36 pt-[2px] text-ellipsis whitespace-nowrap overflow-hidden group-hover:text-white duration-100 ease-linear">
                {playlist.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium">Your most listening songs</h1>
        <div className="flex gap-5 h-[181px] md:h-[213px] overflow-x-auto bb">
          {myTopSongs.items &&
            myTopSongs.items.map(song => (
              <div key={song.id} className="w-28 md:w-36 cursor-pointer group">
                <div className="relative h-28 md:h-36 w-full">
                  <img
                    src={song.album.images[1].url}
                    className="h-full w-full object-cover rounded-md"
                  />
                  <PlayIcon className="absolute h-20 w-20 left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] text-white md:hidden md:group-hover:block hover:text-green-500" />
                </div>
                <p className="font-medium w-28 md:w-36 pt-[2px] text-ellipsis whitespace-nowrap overflow-hidden group-hover:text-white duration-100 ease-linear">
                  {song.artists[0].name}
                </p>
                <p className="font-semibold w-28 md:w-36 pt-[2px] text-ellipsis whitespace-nowrap overflow-hidden group-hover:text-white duration-100 ease-linear">
                  {song.name}
                </p>
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium">New releases</h1>
        <div className="flex gap-5 h-[181px] md:h-[213px] overflow-x-auto bb">
          {newReleases.items &&
            newReleases.items.map(release => (
              <div key={release.id} className="w-28 md:w-36 cursor-pointer group">
                <div className="relative h-28 md:h-36 w-full">
                  <img
                    src={release.images[0].url}
                    className="h-full w-full object-cover rounded-md"
                  />
                  <PlayIcon className="absolute h-10 w-10 right-1 bottom-1 text-white md:hidden md:group-hover:block hover:text-green-500 cursor-default" />
                </div>
                <p className="font-medium w-28 md:w-36 pt-[2px] text-ellipsis whitespace-nowrap overflow-hidden group-hover:text-white duration-100 ease-linear">
                  {release.artists[0].name}
                </p>
                <p className="font-semibold w-28 md:w-36 pt-[2px] text-ellipsis whitespace-nowrap overflow-hidden group-hover:text-white duration-100 ease-linear">
                  {release.name}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Library;

{
  /* <div className="fixed top-24 bottom-36 left-0 right-0 m-2 mb-4 rounded-2xl md:left-80 md:ml-4 text-grayish bg-[#222] p-2">
      Library
    </div> */
}
