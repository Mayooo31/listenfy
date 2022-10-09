import React, { useEffect, useRef, useState } from "react";
import { useCtx } from "../../context/context";

import { PlayIcon } from "@heroicons/react/24/solid";
import likedImage from "../../assets/liked.png";

import InfoLine from "../InfoLine";
import Song from "../Song";
import ButtonLoadNextSongs from "../ButtonLoadNextSongs";
import GoToTop from "../GoToTop";

import wheelHandler from "../../utils/wheelHandler";
import goToTopHandler from "../../utils/goToTopHandler";
import countTime from "../../utils/countTime";
import styles from "../../styles";

const Playlist = () => {
  const sectionRef = useRef();
  const [reRender, setReRender] = useState(true);
  const [showGoToTop, setShowGoToTop] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState({
    owner: { display_name: "Loading" },
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

  useEffect(() => {
    getPlaylist();
  }, [selectedPlaylistId]);

  return (
    <section
      onScroll={() => wheelHandler(sectionRef, setShowGoToTop)}
      ref={sectionRef}
      className={styles.section}
    >
      {selectedPlaylist.owner.display_name !== "Loading" && (
        <div className="flex flex-col gap-2 items-center">
          <img
            src={selectedPlaylist.images[0]?.url}
            className="xs:hidden h-32 w-32 rounded-2xl ml-2 object-cover"
          />
          <div className="flex justify-around sm:gap-5 sm:justify-start w-[100%] items-center border-b-2 border-solid border-[#dedede] pb-3">
            <img
              src={selectedPlaylist.images[0]?.url}
              className="hidden h-36 w-36 shrink-0 rounded-2xl ml-2 object-cover xs:block"
            />
            <div className="flex flex-col gap-2 items-center md:items-start">
              <h1 className="text-[1.7rem] text-center md:text-left font-semibold sm:text-5xl md:text-7xl self-center cursor-default md:self-start">
                {selectedPlaylist.name}
              </h1>
              {selectedPlaylist.description && (
                <p className="text-xl sm:text-1xl font-medium text-center md:text-left">
                  {selectedPlaylist.description}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-1 items-center">
                <p className="text-xl sm:text-2xl font-semibold hover:underline cursor-pointer">
                  {selectedPlaylist.owner.display_name}
                </p>
                <div className="flex gap-2">
                  <p className="text-xl sm:text-2xl cursor-default">
                    <span className="font-medium">
                      <span className="hidden sm:inline-block">·</span>{" "}
                      {selectedPlaylist.tracks?.total}
                    </span>{" "}
                    songs,
                  </p>
                  <p className="text-xl sm:text-2xl cursor-default">
                    {countTime(selectedPlaylist.tracks.items)}
                  </p>
                </div>
                <PlayIcon className="h-12 w-12 ease-linear duration-100 hover:text-green-500 cursor-pointer ml-3" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-[95%] md:m-auto">
            {/* Line with info */}
            <InfoLine />

            {selectedPlaylist.tracks?.items.length === 0 && (
              <h1 className="text-3xl mx-auto mt-10">Playlist is empty</h1>
            )}

            {/* .map() every song */}
            {selectedPlaylist.tracks?.items && (
              <Song data={selectedPlaylist.tracks.items} />
            )}
          </div>

          {/* button for loading more songs */}
          {selectedPlaylist.tracks?.offset + selectedPlaylist.tracks?.limit <
            selectedPlaylist.tracks?.total && (
            <ButtonLoadNextSongs click={getNextSongs} data={selectedPlaylist.tracks}>
              NEXT SONGS
            </ButtonLoadNextSongs>
          )}
        </div>
      )}

      {/* button for going back to top */}
      {showGoToTop && <GoToTop click={() => goToTopHandler(sectionRef)} />}
    </section>
  );
};

export default Playlist;
