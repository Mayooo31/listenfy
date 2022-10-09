import { PlayIcon } from "@heroicons/react/24/solid";
import { useCtx } from "../context/context";

import ScrollContainer from "react-indiana-drag-scroll";

const CategoryItem = ({ data, name, artist, type }) => {
  const { setSection, setSelectedPlaylistId, setSelectedAlbumId, setSelectedArtistId } =
    useCtx();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-medium">{name}</h1>
      <ScrollContainer
        vertical="false"
        hideScrollbars="false"
        className={`flex gap-5 ${
          artist ? "h-[181px] md:h-[213px]" : "h-[155px] md:h-[187px]"
        } overflow-x-auto bb`}
      >
        {data && data.length === 0 && (
          <h1 className="text-xl font-medium uppercase m-auto">
            It's empty. Listen something! 🤠
          </h1>
        )}

        {data &&
          data.map((category, index) => {
            if (type === "track") {
              if (!category?.album.images[0].url || !category?.name) return;
            } else {
              if (!category?.images[0]?.url || !category?.name) return;
            }

            return (
              <div
                key={
                  category?.snapshot_id
                    ? category.snapshot_id + index
                    : category.id + index
                }
                className="w-28 md:w-36 cursor-pointer group"
                onClick={() => {
                  if (type === "track") return;
                  type === "playlist" && setSelectedPlaylistId(category.id);
                  type === "album" && setSelectedAlbumId(category.id);
                  setSection(type);
                }}
              >
                <div className="relative h-28 md:h-36 w-full">
                  <img
                    src={
                      type === "track"
                        ? category?.album.images[1].url
                        : category?.images[0].url
                    }
                    className="h-full w-full object-cover rounded-md"
                  />
                  <PlayIcon
                    className={`absolute ${
                      type === "track"
                        ? "h-28 w-28 md:h-36 md:w-36 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
                        : "h-10 w-10 right-1 bottom-1"
                    } text-white md:hidden md:group-hover:block`}
                  />
                </div>
                {artist && (
                  <p
                    className="font-medium w-28 md:w-36 pt-[2px] text-ellipsis whitespace-nowrap overflow-hidden hover:text-white duration-100 ease-linear"
                    onClick={e => {
                      e.stopPropagation();
                      setSelectedArtistId(category?.artists[0].id);
                      setSection("artist");
                    }}
                  >
                    {category?.artists[0].name}
                  </p>
                )}
                <p className="font-semibold w-28 md:w-36 pt-[2px] text-ellipsis whitespace-nowrap overflow-hidden group-hover:text-white duration-100 ease-linear">
                  {category?.name}
                </p>
              </div>
            );
          })}
      </ScrollContainer>
    </div>
  );
};

export default CategoryItem;
