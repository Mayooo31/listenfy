import React, { useRef, useState } from "react";
import { useCtx } from "../../context/context";
import styles from "../../styles";

const NewPlaylist = () => {
  const [isPublic, setIsPublic] = useState(false);
  const [error, setError] = useState(undefined);
  const newPlaylistRef = useRef();
  const descriptionRef = useRef();
  const { userLoggedToken, userInfo, setSection, setSelectedPlaylistId } = useCtx();

  const createPlaylist = async e => {
    e.preventDefault();

    if (newPlaylistRef.current.value === "") return setError("Missing playlist name...");

    const res = await fetch(`https://api.spotify.com/v1/users/${userInfo.id}/playlists`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + userLoggedToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newPlaylistRef.current.value.trim(),
        description: descriptionRef.current.value.trim(),
        public: isPublic,
      }),
    });

    const data = await res.json();
    // console.log(data);

    setSelectedPlaylistId(data.id);
    setSection("playlist");
  };

  return (
    <section className={styles.section}>
      <div className="flex flex-col h-full items-center gap-5 w-[100%]">
        <h1 className="text-3xl mt-3 font-semibold sm:text-6xl md:text-6xl self-center md:my-5 md:self-start">
          Create new playlist
        </h1>

        <form className="flex flex-col gap-3 rounded-2xl p-3 xs:w-[400px] md:w-[450px]">
          <div className="flex flex-col">
            <label
              className={`${error && "text-red-400"} text-lg font-medium pb-1`}
              htmlFor="name"
            >
              {error ? error : "Playlist name"}
            </label>
            <input
              onClick={() => setError(undefined)}
              className="text-white border-2 border-solid border-[#dedede] bg-transparent font-semibold w-full self-center outline-none p-2 px-4 rounded-2xl text-2xl md:text-4xl focus:border-blue-400"
              ref={newPlaylistRef}
              type="text"
              id="name"
              placeholder="Add a name"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium pb-1" htmlFor="description">
              Description
            </label>
            <textarea
              className="text-white border-2 border-solid border-[#dedede] bg-transparent font-semibold w-full h-20 self-center outline-none p-3 rounded-2xl text-1xl md:text-2xl focus:border-blue-400"
              ref={descriptionRef}
              type="text"
              id="description"
              placeholder="Add an optional description"
            />
          </div>
          <div className="flex justify-around mt-2">
            <button
              onClick={e => {
                e.preventDefault();
                setIsPublic(true);
              }}
              className={`text-2xl rounded-2xl ${
                isPublic && "bg-green-500 border-green-500"
              } py-1 px-2 border-2 border-solid border-[#dedede] text-secondary font-medium m-auto ease-linear duration-100 md:text-3xl`}
            >
              Public
            </button>
            <button
              onClick={e => {
                e.preventDefault();
                setIsPublic(false);
              }}
              className={`text-2xl rounded-2xl ${
                !isPublic && "bg-red-400 border-red-400"
              } py-1 px-2 border-2 border-solid border-[#dedede] text-secondary font-medium m-auto ease-linear duration-100 md:text-3xl`}
            >
              Private
            </button>
          </div>
          <button
            onClick={createPlaylist}
            type="submit"
            className="text-2xl rounded-2xl bg-blue-400 p-2 my-5 text-secondary font-medium m-auto  hover:bg-blue-300 ease-linear duration-100 active:bg-blue-400 md:text-3xl"
          >
            Create playlist
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewPlaylist;
