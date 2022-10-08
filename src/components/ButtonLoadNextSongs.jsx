import React from "react";

const ButtonLoadNextSongs = ({ click, data }) => {
  return (
    <button
      onClick={() => click(data.offset + data.limit)}
      className="text-1xl rounded-2xl bg-blue-400 p-2 my-3 text-blackish font-medium m-auto  hover:bg-blue-300 ease-linear duration-100 active:bg-blue-400"
    >
      NEXT SONGS
    </button>
  );
};

export default ButtonLoadNextSongs;
