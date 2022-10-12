import React from "react";
import { Helmet } from "react-helmet";

import styles from "../../styles";

import CategoryItem from "../CategoryItem";

const Library = ({ playlists, myTopSongs, newReleases }) => {
  return (
    <section className={styles.section}>
      <Helmet>
        <title>Listenfy - My library</title>
      </Helmet>

      {/* Your playlists */}
      {playlists?.items && (
        <CategoryItem
          data={playlists?.items}
          name="Your playlists"
          artist={false}
          type="playlist"
        />
      )}

      {/* Your most listening songs */}
      {myTopSongs?.items && (
        <CategoryItem
          data={myTopSongs.items}
          name="Your most listening songs"
          artist={true}
          type="track"
        />
      )}

      {/* New releases */}
      {newReleases?.items && (
        <CategoryItem
          data={newReleases.items}
          name="New releases"
          artist={true}
          type="album"
        />
      )}
    </section>
  );
};

export default Library;
