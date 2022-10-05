import React, { useContext, useState, createContext } from "react";

const Context = createContext();

export const useCtx = () => useContext(Context);

export const ContextProvider = ({ children }) => {
  const [userLoggedToken, setUserLoggedToken] = useState(undefined);
  const [accessToken, setAccessToken] = useState(undefined);

  const [userInfo, setUserInfo] = useState({});
  const [playlists, setPlaylists] = useState([]);
  const [myTopSongs, setMyTopSongs] = useState({});
  const [newReleases, setNewReleases] = useState([]);

  const [section, setSection] = useState("library");

  return (
    <Context.Provider
      value={{
        userInfo,
        setUserInfo,
        accessToken,
        setAccessToken,
        playlists,
        setPlaylists,
        userLoggedToken,
        setUserLoggedToken,
        section,
        setSection,
        myTopSongs,
        setMyTopSongs,
        newReleases,
        setNewReleases,
      }}
    >
      {children}
    </Context.Provider>
  );
};
