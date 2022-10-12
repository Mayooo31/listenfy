import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useCtx } from "../../context/context";

import { HeartIcon, PlayIcon } from "@heroicons/react/24/solid";
import styles from "../../styles";

import ButtonLoadNextSongs from "../ButtonLoadNextSongs";
import GoToTop from "../GoToTop";
import wheelHandler from "../../utils/wheelHandler";
import goToTopHandler from "../../utils/goToTopHandler";
import convertDate from "../../utils/convertDate";
import convertTime from "../../utils/convertTime";
import countTime from "../../utils/countTime";

const Album = () => {
  const sectionRef = useRef();
  const [reRender, setReRender] = useState(true);
  const [showGoToTop, setShowGoToTop] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState();
  const { userLoggedToken, selectedAlbumId, setSection, setError, setSelectedArtistId } =
    useCtx();

  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userLoggedToken,
      "Content-Type": "application/json",
    },
  };

  const getAlbum = async () => {
    const resAlbum = await fetch(
      `https://api.spotify.com/v1/albums/${selectedAlbumId}`,
      options
    );
    const resIsFollowAlbum = await fetch(
      `https://api.spotify.com/v1/me/albums/contains?ids=${selectedAlbumId}`,
      options
    );

    try {
      const values = await Promise.all([resAlbum, resIsFollowAlbum]);
      const [dataAlbum, dataIsFollowAlbum] = await Promise.all(values.map(r => r.json()));

      if (dataAlbum.error) throw dataAlbum.error;
      if (dataIsFollowAlbum.error) throw dataIsFollowAlbum.error;

      setSelectedAlbum({ ...dataAlbum, isFollow: dataIsFollowAlbum[0] });
      sectionRef.current.scrollTop = 0;
    } catch (err) {
      setError(err);
      setSection("error");
    }
  };

  const getNextSongs = async offset => {
    try {
      const res = await fetch(
        `https://api.spotify.com/v1/albums/${selectedAlbumId}/tracks?offset=${offset}`,
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

      const newData = selectedAlbum;
      newData.tracks.offset = data.offset;
      newData.tracks.items = [...newData.tracks.items, ...data.items];

      setSelectedAlbum(newData);
      setReRender(!reRender);
    } catch (err) {
      setError(err);
      setSection("error");
    }
  };

  console.log(selectedAlbum);

  const likeThisAlbum = async id => {
    try {
      const res = await fetch(`https://api.spotify.com/v1/me/albums?ids=${id}`, {
        method: selectedAlbum.isFollow ? "DELETE" : "PUT",
        headers: {
          Authorization: "Bearer " + userLoggedToken,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw "Something went wrong...";
      getAlbum();
    } catch (err) {
      setError(err);
      setSection("error");
    }
  };

  useEffect(() => {
    getAlbum();
  }, [selectedAlbumId]);

  return (
    <section
      onScroll={() => wheelHandler(sectionRef, setShowGoToTop)}
      ref={sectionRef}
      className={styles.section}
    >
      {selectedAlbum && (
        <Helmet>
          <title>Listenfy - Album - {selectedAlbum.name}</title>
        </Helmet>
      )}

      {selectedAlbum && (
        <div className="flex flex-col gap-2 items-center">
          <img
            src={selectedAlbum?.images[0]?.url}
            className="xs:hidden h-32 w-32 rounded-2xl ml-2 object-cover"
          />
          <div className="flex justify-around sm:gap-5 sm:justify-start w-[100%] items-center border-b-2 border-solid border-[#dedede] pb-3">
            <img
              src={selectedAlbum?.images[0]?.url}
              className="h-36 w-36 rounded-2xl ml-2 object-cover hidden xs:block"
            />
            <div className="flex flex-col items-center md:items-start">
              <h1 className="text-2xl text-center md:text-left font-semibold sm:text-5xl md:text-7xl self-center cursor-default md:self-start pb-2 break-all">
                {selectedAlbum.name}
              </h1>
              <p className="text-lg sm:text-1xl font-medium">
                {selectedAlbum.type} {convertDate(selectedAlbum.release_date)}
              </p>

              <div className="flex gap-1 flex-col sm:flex-row flex-wrap items-center">
                <div className="flex gap-1">
                  {selectedAlbum.artists.map((artist, index) => (
                    <p
                      key={artist.id}
                      className="text-xl sm:text-2xl font-semibold text-ellipsis whitespace-nowrap overflow-x-hidden cursor-pointer hover:underline"
                      onClick={() => {
                        setSelectedArtistId(artist.id);
                        setSection("artist");
                      }}
                    >
                      {artist.name}
                      {selectedAlbum.artists.length !== index + 1 && ","}
                    </p>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xl sm:text-2xl cursor-default">
                    <span className="font-medium">
                      <span className="hidden xs:inline-block">·</span>{" "}
                      {selectedAlbum.tracks?.total}
                    </span>{" "}
                    songs,
                  </p>
                  <p className="text-xl sm:text-2xl cursor-default">
                    {countTime(selectedAlbum.tracks.items)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <PlayIcon className="h-12 w-12 ease-linear duration-100 hover:text-blue-400 cursor-pointer ml-3" />
                  <HeartIcon
                    onClick={() => likeThisAlbum(selectedAlbum.id)}
                    className={`${
                      selectedAlbum.isFollow && "text-blue-400 hover:text-grayish"
                    } h-12 w-12 ease-linear duration-100 hover:text-blue-400 cursor-pointer ml-3`}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-[95%] md:m-auto">
            {/* Line with info */}
            <div className="group flex w-[95%] xs:w-full md:w-[100%] items-center pb-1 cursor-default hover:bg-[#292929]">
              <span className="flex items-center gap-2 w-[90%]">
                <p className="hidden sm:block text-lg font-semibold w-8">#</p>
                <p className="w-[75%] text-lg font-semibold text-ellipsis whitespace-nowrap overflow-x-hidden">
                  name
                </p>
              </span>
              <span className="text-lg font-semibold w-[10%] lg:w-[10%] text-right">
                time
              </span>
            </div>

            {/* .map() every song */}
            {selectedAlbum.tracks.items.map((song, index) => {
              if (!song?.id || !song?.name || !song?.artists || !song?.duration_ms) {
                return;
              }
              return (
                <div
                  key={song.id}
                  className="group flex gap-3 lg:gap-0 w-full md:w-[100%] items-center cursor-pointer hover:bg-[#292929]"
                >
                  <div className="flex items-center gap-2 w-[85%] xs:w-[90%]">
                    <p className="hidden sm:block text-lg font-semibold w-8">
                      {index + 1}
                    </p>
                    <div className="relative w-10 h-10">
                      <img
                        src={selectedAlbum?.images[0]?.url}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                      <PlayIcon className="absolute h-10 w-10 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] ease-linear duration-100 text-[#e2e2e2] md:hidden md:group-hover:block hover:text-blue-400" />
                    </div>
                    <div className="flex flex-col w-[75%]">
                      <p className="w-fit max-w-[100%] text-lg font-semibold text-ellipsis whitespace-nowrap overflow-x-hidden hover:underline">
                        {song.name}
                      </p>
                      <span className="flex gap-2">
                        {song.artists.map((artist, index) => (
                          <p
                            key={artist.id}
                            className="font-medium text-ellipsis whitespace-nowrap overflow-x-hidden hover:underline"
                            onClick={() => {
                              setSelectedArtistId(artist.id);
                              setSection("artist");
                            }}
                          >
                            {artist.name}
                            {song.artists.length !== index + 1 && ","}
                          </p>
                        ))}
                      </span>
                    </div>
                  </div>
                  <div className="font-medium w-[10%] lg:w-[10%] text-right">
                    {convertTime(song.duration_ms)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* button for loading more songs */}
          {selectedAlbum.tracks?.offset + selectedAlbum.tracks?.limit <
            selectedAlbum.tracks?.total && (
            <ButtonLoadNextSongs click={getNextSongs} data={selectedAlbum.tracks}>
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

export default Album;
