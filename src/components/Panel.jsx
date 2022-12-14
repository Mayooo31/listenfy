import { useCtx } from "../context/context";
import useFetch from "../hooks/useFetch";

import ButtonLoadNextSongs from "./ButtonLoadNextSongs";

import icon from "../assets/tape2.png";
import library from "../assets/library.png";
import add from "../assets/add.png";
import liked from "../assets/liked.png";
import categories from "../assets/categories.png";

const Panel = ({ openPanel, setOpenPanel, playlists, setPlaylists }) => {
  const { setSection, section, selectedPlaylistId, setSelectedPlaylistId } = useCtx();
  const { fetchData, loading } = useFetch();

  const getNextPlaylists = async offset => {
    const { data } = await fetchData(
      `https://api.spotify.com/v1/me/playlists?limit=50&offset=${offset}`,
      "GET"
    );
    data.items = [...playlists.items, ...data.items];
    setPlaylists(data);
  };

  return (
    <div
      className={`${
        openPanel ? "translate-x-[0%]" : "translate-x-[-110%]"
      } fixed flex flex-col top-24 bottom-0 md:bottom-0 left-0 right-0 m-2 ease-linear duration-150 xs:w-96 md:translate-x-[0%] md:w-80 rounded-2xl bg-blackish text-grayish py-2 pb-4 px-3 md:py-6 z-10 shadow-xxx`}
    >
      <img
        src={icon}
        onClick={() => setOpenPanel(false)}
        className="ml-auto w-12 object-contain md:hidden"
      />

      <div className="flex flex-col gap-2">
        <span
          onClick={() => {
            setSection("library");
            setOpenPanel(false);
          }}
          className="flex gap-3 hover:text-[white] cursor-pointer"
        >
          <img src={library} className="w-8 h-8" />
          <p
            className={`${
              section === "library" && "text-white"
            } text-xl font-medium ease-linear duration-100`}
          >
            My library
          </p>
        </span>
        <span
          onClick={() => {
            setSection("new playlist");
            setOpenPanel(false);
          }}
          className="flex gap-3 hover:text-[white] cursor-pointer"
        >
          <img src={add} className="w-8 h-8" />
          <p
            className={`${
              section === "new playlist" && "text-white"
            } text-xl font-medium ease-linear duration-100`}
          >
            New playlist
          </p>
        </span>
        <span
          onClick={() => {
            setSection("categories");
            setOpenPanel(false);
          }}
          className="flex gap-3 hover:text-[white] cursor-pointer"
        >
          <img src={categories} className="w-8 h-8" />
          <p
            className={`${
              section === "categories" && "text-white"
            } text-xl font-medium ease-linear duration-100`}
          >
            Categories
          </p>
        </span>
        <span
          onClick={() => {
            setSection("songs i liked");
            setOpenPanel(false);
          }}
          className="flex gap-3 hover:text-[white] cursor-pointer"
        >
          <img src={liked} className="w-8 h-8" />
          <p
            className={`${
              section === "songs i liked" && "text-white"
            } text-xl font-medium ease-linear duration-100`}
          >
            Songs i liked
          </p>
        </span>
      </div>

      <span className="w-[100%] h-[2px] bg-[#ababab] mt-2 self-center"></span>

      <div className="overflow-y-auto sb">
        <h1 className="text-2xl font-bold my-2">Playlists:</h1>
        {playlists.items &&
          playlists.items.map(playlist => (
            <p
              onClick={() => {
                setSelectedPlaylistId(playlist.id);
                setSection("playlist");
                setOpenPanel(false);
              }}
              key={playlist.id}
              className={`${
                selectedPlaylistId === playlist.id &&
                section === "playlist" &&
                "text-white"
              } text-xl font-medium hover:text-[white] cursor-pointer ease-linear duration-100 text-ellipsis whitespace-nowrap overflow-hidden mb-3`}
            >
              {playlist.name}
            </p>
          ))}

        {/* button for loading more songs */}
        <div className="w-full flex items-center">
          {playlists.offset + playlists.limit < playlists.total && (
            <ButtonLoadNextSongs click={getNextPlaylists} data={playlists}>
              NEXT PLAYLISTS
            </ButtonLoadNextSongs>
          )}
        </div>
      </div>
    </div>
  );
};

export default Panel;
