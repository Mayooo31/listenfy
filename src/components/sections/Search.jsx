import React, { useEffect, useState } from "react";
import { useCtx } from "../../context/context";
import { Helmet } from "react-helmet";

import styles from "../../styles";

import CategoryItem from "../CategoryItem";
import useFetch from "../../hooks/useFetch";

const Search = () => {
  const [searchedData, setSearchedData] = useState();
  const { userLoggedToken, searchedValue } = useCtx();
  const { fetchData, loading } = useFetch();

  const getPlaylist = async () => {
    const { data } = await fetchData(
      `https://api.spotify.com/v1/search?q=${searchedValue}&type=artist,track,album,playlist`,
      "GET"
    );
    setSearchedData(data);
  };

  useEffect(() => {
    if (userLoggedToken) getPlaylist();
  }, [searchedValue]);

  return (
    <div className={styles.section}>
      <Helmet>
        <title>Listenfy - Searching...🥶</title>
      </Helmet>

      {/* Artists */}
      {searchedData?.artists?.items && (
        <CategoryItem
          data={searchedData?.artists?.items}
          name="Artists"
          artist={false}
          type="artist"
        />
      )}

      {/* Songs */}
      {searchedData?.tracks?.items && (
        <CategoryItem
          data={searchedData?.tracks?.items}
          name="Songs"
          artist={true}
          type="track"
        />
      )}

      {/* Albums */}
      {searchedData?.albums?.items && (
        <CategoryItem
          data={searchedData?.albums?.items}
          name="Albums"
          artist={true}
          type="album"
        />
      )}

      {/* Playlists */}
      {searchedData?.playlists?.items && (
        <CategoryItem
          data={searchedData?.playlists?.items}
          name="Playlists"
          artist={false}
          type="playlist"
        />
      )}
    </div>
  );
};

export default Search;
