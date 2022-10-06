import React from "react";

const GoToTop = ({ click }) => {
  return (
    <button
      onClick={click}
      className="sticky bottom-1 py-1 rounded-xl px-2 w-fit bg-blue-400 text-blackish text-2xl hover:bg-blue-300 active:bg-blue-400 ease-linear duration-100"
    >
      Go back
    </button>
  );
};

export default GoToTop;
