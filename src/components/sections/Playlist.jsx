import React, { useEffect, useRef, useState } from "react";
import { useCtx } from "../../context/context";

import { PlayIcon, HeartIcon } from "@heroicons/react/24/solid";
import likedImage from "../../assets/liked.png";

import InfoLine from "../InfoLine";
import Song from "../Song";
import ButtonLoadNextSongs from "../ButtonLoadNextSongs";
import GoToTop from "../GoToTop";

import wheelHandler from "../../utils/wheelHandler";
import goToTopHandler from "../../utils/goToTopHandler";
import countTime from "../../utils/countTime";
import styles from "../../styles";

const Playlist = ({ fetchData }) => {
  const sectionRef = useRef();
  const [reRender, setReRender] = useState(true);
  const [showGoToTop, setShowGoToTop] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState({
    owner: { display_name: "Loading" },
    images: { 0: { url: likedImage } },
  });
  const { userLoggedToken, selectedPlaylistId, setError, setSection, userInfo } =
    useCtx();

  // console.log(selectedPlaylist);
  // console.log(selectedPlaylist.isFollow);

  const getPlaylist = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + userLoggedToken,
        "Content-Type": "application/json",
      },
    };
    const resPlaylist = await fetch(
      `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
      options
    );
    const resIsFollowPlaylist = await fetch(
      `https://api.spotify.com/v1/playlists/${selectedPlaylistId}/followers/contains?ids=mayooo31`,
      options
    );

    try {
      const values = await Promise.all([resPlaylist, resIsFollowPlaylist]);

      const data = await Promise.all(values.map(r => r.json()));

      const [dataPlaylist, dataIsFollowPlaylist] = data;
      if (dataPlaylist.error) throw dataPlaylist.error;
      if (dataIsFollowPlaylist.error) throw dataIsFollowPlaylist.error;

      setSelectedPlaylist({ ...dataPlaylist, isFollow: dataIsFollowPlaylist[0] });
      sectionRef.current.scrollTop = 0;
    } catch (err) {
      setError(err);
      setSection("error");
    }
  };

  const getNextSongs = async offset => {
    try {
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
      if (data.error) throw data.error;

      const newData = selectedPlaylist;
      newData.tracks.offset = data.offset;
      newData.tracks.items = [...newData.tracks.items, ...data.items];

      setSelectedPlaylist(newData);
      setReRender(!reRender);
    } catch (err) {
      setError(err);
      setSection("error");
    }
  };

  const likeThisPlaylist = async () => {
    try {
      const res = await fetch(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}/followers`,
        {
          method: selectedPlaylist.isFollow ? "DELETE" : "PUT",
          headers: {
            Authorization: "Bearer " + userLoggedToken,
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) throw "Something went wrong...";
      fetchData(userLoggedToken);
      getPlaylist();
    } catch (err) {
      setError(err);
      setSection("error");
    }
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
                <div className="flex gap-2">
                  <PlayIcon className="h-12 w-12 ease-linear duration-100 hover:text-blue-400 cursor-pointer ml-3" />
                  {userInfo.id !== selectedPlaylist.owner.id && (
                    <HeartIcon
                      onClick={() => likeThisPlaylist()}
                      className={`${
                        selectedPlaylist.isFollow && "text-blue-500"
                      } h-12 w-12 ease-linear duration-100 hover:text-blue-400 cursor-pointer ml-3`}
                    />
                  )}
                </div>
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
