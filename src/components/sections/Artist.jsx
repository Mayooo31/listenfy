import React, { useEffect, useRef, useState } from "react";
import { useCtx } from "../../context/context";

import { PlayIcon } from "@heroicons/react/24/solid";

import InfoLine from "../InfoLine";

import styles from "../../styles";
import convertTime from "../../utils/convertTime";
import convertDate from "../../utils/convertDate";
import CategoryItem from "../CategoryItem";

const Artist = () => {
  const sectionRef = useRef();
  const { userLoggedToken, selectedArtistId, setSelectedAlbumId, setSection } = useCtx();
  const [showMore, setShowMore] = useState(5);
  const [selectedArtist, setSelectedArtist] = useState(undefined);

  const getArtist = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + userLoggedToken,
        "Content-Type": "application/json",
      },
    };

    const resArtistInfo = await fetch(
      `https://api.spotify.com/v1/artists/${selectedArtistId}`,
      options
    );
    const resArtistTopSongs = await fetch(
      `https://api.spotify.com/v1/artists/${selectedArtistId}/top-tracks?market=CZ`,
      options
    );
    const resArtistAlbums = await fetch(
      `https://api.spotify.com/v1/artists/${selectedArtistId}/albums`,
      options
    );

    Promise.all([resArtistInfo, resArtistTopSongs, resArtistAlbums])
      .then(values => Promise.all(values.map(r => r.json())))
      .then(([dataArtistInfo, dataArtistTopSongs, dataArtistAlbums]) => {
        setSelectedArtist({
          artist_info: dataArtistInfo,
          artist_top_songs: dataArtistTopSongs,
          artist_albums: dataArtistAlbums,
        });
      });
  };

  useEffect(() => {
    getArtist();
    sectionRef.current.scrollTop = 0;
  }, [selectedArtistId]);

  return (
    <section ref={sectionRef} className={styles.section}>
      {selectedArtist && (
        <div className="flex flex-col gap-2 items-center">
          <img
            src={selectedArtist.artist_info.images[0]?.url}
            className="xs:hidden h-32 w-32 rounded-2xl ml-2 object-cover"
          />
          <div className="flex justify-around sm:gap-5 sm:justify-start w-[100%] items-center border-b-2 border-solid border-[#dedede] pb-3">
            <img
              src={selectedArtist.artist_info.images[0]?.url}
              className="hidden h-36 w-36 rounded-2xl ml-2 object-cover xs:block"
            />
            <div className="flex flex-col gap-2 items-center md:items-start">
              <h1
                className="text-2xl text-center md:text-left font-semibold sm:text-5xl md:text-7xl self-center cursor-default
            md:self-start"
              >
                {selectedArtist.artist_info.name}
              </h1>
              {selectedArtist.artist_info && (
                <div className="flex flex-col md:flex-row gap-2">
                  <p className="text-xl sm:text-1xl font-medium text-center md:text-left">
                    {selectedArtist.artist_info.followers.total}{" "}
                    <span className="font-normal">followers</span>
                  </p>
                  {selectedArtist.artist_info.genres[0] &&
                    selectedArtist.artist_info.followers.total && (
                      <span className="text-xl sm:text-1xl font-medium text-center hidden md:block">
                        |
                      </span>
                    )}
                  <p className="text-xl sm:text-1xl font-medium text-center md:text-left">
                    {selectedArtist.artist_info.genres[0]}
                  </p>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-1 items-center">
                <p className="text-xl sm:text-2xl font-semibold">
                  {selectedArtist.artist_info.type}
                </p>
                <div className="flex gap-2">
                  <p className="text-xl sm:text-2xl cursor-default">
                    <span className="font-medium">
                      <span className="hidden sm:inline-block">·</span>{" "}
                      {selectedArtist.artist_albums.total}
                    </span>{" "}
                    albums
                  </p>
                </div>
                <PlayIcon className="h-12 w-12 ease-linear duration-100 hover:text-green-500 cursor-pointer ml-3" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-[95%] md:m-auto">
            <h1 className="text-2xl mt-2 font-bold">Most Popular songs</h1>

            {/* Line with info */}
            <InfoLine options={true} />

            {/* .map() every song */}
            {selectedArtist.artist_top_songs.tracks.map((song, index) => {
              if (index >= showMore) return;

              return (
                <div
                  key={song.id + index}
                  className="group flex gap-3 lg:gap-0 w-full items-center cursor-pointer hover:bg-[#292929]"
                >
                  <div className="flex items-center gap-2 w-[85%] xs:w-[90%] ss:w-[60%] lg:w-[40%]">
                    <p className="hidden sm:block text-lg font-semibold w-8">
                      {index + 1}
                    </p>
                    <div className="relative w-10 h-10">
                      <img
                        src={song.album.images[0].url}
                        className="w-10 h-10 object-contain rounded-md group-hover:opacity-60 ease-linear duration-100"
                      />
                      <PlayIcon className="absolute h-10 w-10 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] ease-linear duration-100 text-[#e2e2e2] md:hidden md:group-hover:block hover:text-green-500" />
                    </div>
                    <div className="flex flex-col w-[75%]">
                      <p className="w-fit max-w-[98%] text-lg font-semibold text-ellipsis whitespace-nowrap overflow-x-hidden hover:underline py-[10px]">
                        {song.name}
                      </p>
                    </div>
                  </div>
                  <div className="hidden font-medium lg:block lg:w-[35%] lg:pr-4">
                    <p
                      onClick={() => {
                        if (song.album.type === "album") {
                          setSelectedAlbumId(song.album.id);
                          setSection("album");
                        }
                      }}
                      className="w-fit max-w-[95%] text-ellipsis whitespace-nowrap overflow-hidden hover:underline"
                    >
                      {song.album.name}
                    </p>
                  </div>
                  <div className="hidden font-medium ss:block w-[30%] lg:w-[15%]">
                    {convertDate(song.album.release_date)}
                  </div>
                  <div className="font-medium w-[10%] lg:w-[10%] text-right">
                    {convertTime(song.duration_ms)}
                  </div>
                </div>
              );
            })}

            <button
              onClick={() => {
                showMore === 5 && setShowMore(10);
                showMore === 10 && setShowMore(5);
              }}
              className={styles.button}
            >
              {showMore === 5 ? "SHOW MORE" : "SHOW LESS"}
            </button>

            <CategoryItem
              data={selectedArtist.artist_albums.items}
              name="Albums"
              artist={false}
              type="album"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Artist;
