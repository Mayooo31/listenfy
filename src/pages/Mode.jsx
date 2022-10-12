import React from "react";
import loginHandler from "../utils/loginHandler";

const Mode = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center text-secondary bg-blackish">
      <h1 className="text-lg font-medium mt-6 mb-1">Do you have a spotify account ?</h1>
      <button
        onClick={loginHandler}
        className="text-xl font-medium py-2 px-4 ss:text-3xl ss:py-4 ss:px-6 bg-[#66a80f] hover:bg-[#82c91e] ease-linear duration-200 rounded-2xl"
      >
        LOGIN WITH OWN ACCOUNT
      </button>
    </div>
  );
};

export default Mode;
