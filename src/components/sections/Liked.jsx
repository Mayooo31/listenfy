import React, { useEffect, useRef, useState } from "react";
import { useCtx } from "../../context/context";
import { Helmet } from "react-helmet";

import { PlayIcon } from "@heroicons/react/24/solid";
import likedImage from "../../assets/liked.png";

import InfoLine from "../InfoLine";
import Song from "../Song";
import ButtonLoadNextSongs from "../ButtonLoadNextSongs";
import GoToTop from "../GoToTop";
import wheelHandler from "../../utils/wheelHandler";
import goToTopHandler from "../../utils/goToTopHandler";
import styles from "../../styles";
import useFetch from "../../hooks/useFetch";

const Liked = () => {
  const sectionRef = useRef();
  const [showGoToTop, setShowGoToTop] = useState(false);
  const [liked, setLiked] = useState([]);
  const { userInfo } = useCtx();
  const { fetchData, loading } = useFetch();

  const getLikedSongs = async () => {
    const { data } = await fetchData(
      "https://api.spotify.com/v1/me/tracks?limit=50&offset=0",
      "GET"
    );
    setLiked(data);
  };

  const getNextSongs = async offset => {
    const { data } = await fetchData(
      `https://api.spotify.com/v1/me/tracks?limit=50&offset=${offset}`,
      "GET"
    );
    data.items = [...liked.items, ...data.items];
    setLiked(data);
  };

  useEffect(() => {
    getLikedSongs();
  }, []);

  return (
    <section
      onScroll={() => wheelHandler(sectionRef, setShowGoToTop)}
      ref={sectionRef}
      className={styles.section}
    >
      <Helmet>
        <title>Listenfy - Songs i liked</title>
      </Helmet>

      <div className="flex flex-col gap-2">
        {liked.items && (
          <div className="relative flex justify-around sm:gap-5 sm:justify-start w-[100%] items-center border-b-2 border-solid border-[#dedede] pb-3">
            <img
              src={likedImage}
              className="absolute z-[-1] top-[50%] xs:left-[0%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-[60%] h-full rounded-full blur-[150px]"
            />
            <img
              src={likedImage}
              className="h-24 w-24 hidden xs:block sm:h-28 sm:w-28 md:h-36 md:w-36"
            />
            <div className="flex flex-col items-center gap-2 xs:items-start">
              <img
                src={likedImage}
                className="h-24 w-24 xs:hidden sm:h-28 sm:w-28 md:h-36 md:w-36"
              />
              <h1 className="text-3xl font-semibold sm:text-6xl md:text-7xl self-center cursor-default">
                Songs i liked
              </h1>
              <div className="flex flex-col xs:flex-row gap-1 items-center">
                <div className="flex items-center gap-2">
                  <img src={userInfo.image} className="h-10 w-10 rounded-full" />
                  <p className="text-xl sm:text-2xl font-semibold hover:underline cursor-pointer">
                    {userInfo.username}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-xl font-medium sm:text-2xl cursor-default">
                    <span className="hidden xs:inline-block">·</span> {liked.total} songs
                  </p>
                  <PlayIcon className="h-12 w-12 ease-linear duration-100 hover:text-blue-400 cursor-pointer ml-3" />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-2 w-full md:w-[95%] md:m-auto">
          {/* Line with info */}
          {liked.items && <InfoLine />}

          {/* .map() every song */}
          {liked.items && <Song data={liked.items} />}
        </div>

        {/* button for loading more songs */}
        {liked.offset + liked.limit < liked.total && (
          <ButtonLoadNextSongs click={getNextSongs} data={liked}>
            NEXT SONGS
          </ButtonLoadNextSongs>
        )}
      </div>

      {/* button for going back to top */}
      {showGoToTop && <GoToTop click={() => goToTopHandler(sectionRef)} />}
    </section>
  );
};

export default Liked;
