import React from "react";

import CategoryItem from "../CategoryItem";
import styles from "../../styles";

const Library = ({ playlists, myTopSongs, newReleases }) => {
  return (
    <section className={styles.section}>
      {/* Your playlists */}
      <CategoryItem
        data={playlists.items}
        name="Your playlists"
        artist={false}
        type="playlist"
      />

      {/* Your most listening songs */}
      <CategoryItem
        data={myTopSongs.items}
        name="Your most listening songs"
        artist={true}
        type="track"
      />

      {/* New releases */}
      <CategoryItem
        data={newReleases.items}
        name="New releases"
        artist={true}
        type="album"
      />
    </section>
  );
};

export default Library;