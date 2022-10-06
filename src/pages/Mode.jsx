import React from "react";
import { useNavigate } from "react-router-dom";

const Mode = () => {
  const navigate = useNavigate();

  const loginHandler = () => {
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-modify-playback-state",
      "playlist-modify-public",
      "playlist-modify-private",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-read-playback-position",
      "user-top-read",
      "user-library-read",
      "user-library-modify",
      "ugc-image-upload",
      "playlist-read-collaborative",
      "playlist-read-private",
    ];

    window.location.href = `${process.env.REACT_APP_LOGIN_URL}?client_id=${
      process.env.REACT_APP_CLIENT_ID
    }&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&scope=${scope.join(
      " "
    )}&response_type=token&show_daialog=true`;
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center text-secondary bg-blackish">
      <button
        onClick={() => navigate("/demo")}
        className="text-xl font-medium py-2 px-4 ss:text-3xl ss:py-4 ss:px-6 bg-[#1864ab] hover:bg-[#1c7ed6] ease-linear duration-200 rounded-2xl"
      >
        LOGIN WITH MARIO (DEMO)
      </button>
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
