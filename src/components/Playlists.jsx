import React from "react";

import { PlayIcon } from "@heroicons/react/24/solid";
import { useCtx } from "../context/context";

const Playlists = ({ data, name, artist }) => {
  const { setSection, setSelectedPlaylistId } = useCtx();
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-medium">{name}</h1>
      <div
        className={`flex gap-5 ${
          artist ? "h-[181px] md:h-[213px]" : "h-[155px] md:h-[187px]"
        } overflow-x-auto bb`}
      >
        {data.items &&
          data.items.map((category, index) => {
            if (!category?.images[0].url || !category?.name) return;

            return (
              <div
                key={
                  category?.snapshot_id
                    ? category.snapshot_id + index
                    : category.id + index
                }
                className="w-28 md:w-36 cursor-pointer group"
              >
                <div
                  onClick={() => {
                    setSelectedPlaylistId(category.id);
                    setSection("playlist");
                  }}
                  className="relative h-28 md:h-36 w-full"
                >
                  <img
                    src={category?.images[0].url}
                    className="h-full w-full object-cover rounded-md"
                  />
                  <PlayIcon className="absolute h-10 w-10 right-1 bottom-1 text-white md:hidden md:group-hover:block hover:text-green-500 cursor-default" />
                </div>
                {artist && (
                  <p className="font-medium w-28 md:w-36 pt-[2px] text-ellipsis whitespace-nowrap overflow-hidden group-hover:text-white duration-100 ease-linear">
                    {category?.artists[0].name}
                  </p>
                )}
                <p className="font-semibold w-28 md:w-36 pt-[2px] text-ellipsis whitespace-nowrap overflow-hidden group-hover:text-white duration-100 ease-linear">
                  {category?.name}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Playlists;
