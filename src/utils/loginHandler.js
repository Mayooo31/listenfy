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
    "app-remote-control",
    "streaming",
  ];

  window.location.href = `${process.env.REACT_APP_LOGIN_URL}?client_id=${
    process.env.REACT_APP_CLIENT_ID
  }&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&scope=${scope.join(
    " "
  )}&response_type=token&show_daialog=true`;
};

export default loginHandler;
