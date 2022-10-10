import React, { useEffect, useState } from "react";
import { useCtx } from "../../context/context";

import CategoryItem from "../CategoryItem";

import styles from "../../styles";

const Search = () => {
  const { userLoggedToken, searchedValue } = useCtx();
  const [searchedData, setSearchedData] = useState();

  const getPlaylist = async () => {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${searchedValue}&type=artist,track,album,playlist`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + userLoggedToken,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    console.log(data);

    setSearchedData(data);
  };

  useEffect(() => {
    if (userLoggedToken) getPlaylist();
  }, [searchedValue]);

  return (
    <div className={styles.section}>
      {/* Artists */}
      {searchedData && (
        <CategoryItem
          data={searchedData.artists.items}
          name="Artists"
          artist={false}
          type="artist"
        />
      )}

      {/* Songs */}
      {searchedData && (
        <CategoryItem
          data={searchedData.tracks.items}
          name="Songs"
          artist={true}
          type="track"
        />
      )}

      {/* Albums */}
      {searchedData && (
        <CategoryItem
          data={searchedData.albums.items}
          name="Albums"
          artist={true}
          type="album"
        />
      )}

      {/* Playlists */}
      {searchedData && (
        <CategoryItem
          data={searchedData.playlists.items}
          name="Playlists"
          artist={false}
          type="playlist"
        />
      )}
    </div>
  );
};

export default Search;
