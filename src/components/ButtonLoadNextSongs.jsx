import React from "react";
import styles from "../styles";

const ButtonLoadNextSongs = props => {
  return (
    <button
      onClick={() => props.click(props.data.offset + props.data.limit)}
      className={styles.button}
    >
      {props.children}
    </button>
  );
};

export default ButtonLoadNextSongs;
