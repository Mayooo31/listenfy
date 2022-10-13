import React from "react";
import styles from "../styles";
import loginHandler from "../utils/loginHandler";

import spotify from "../assets/spotify.png";

const Mode = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center text-secondary bg-blackish">
      <h1 className="text-lg font-medium mt-6 mb-1">Do you have a spotify account ?</h1>
      <button
        onClick={loginHandler}
        className={`${styles.button} text-xl py-0 px-2 ss:text-3xl ss:py-4 ss:px-6 ease-linear duration-200 rounded-2xl flex items-center`}
      >
        <img src={spotify} className="w-20 h-20" />
        LOGIN WITH OWN ACCOUNT
      </button>
    </div>
  );
};

export default Mode;
