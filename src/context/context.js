import React, { useContext, useState, createContext } from "react";

const Context = createContext();

export const useCtx = () => useContext(Context);

export const ContextProvider = ({ children }) => {
  const [userLoggedToken, setUserLoggedToken] = useState(undefined);

  const [userInfo, setUserInfo] = useState({});
  const [selectedPlaylistId, setSelectedPlaylistId] = useState();
  const [selectedAlbumId, setSelectedAlbumId] = useState();
  const [selectedArtistId, setSelectedArtistId] = useState();

  const [section, setSection] = useState("library");

  return (
    <Context.Provider
      value={{
        userInfo,
        setUserInfo,
        userLoggedToken,
        setUserLoggedToken,
        section,
        setSection,
        selectedPlaylistId,
        setSelectedPlaylistId,
        selectedAlbumId,
        setSelectedAlbumId,
        selectedArtistId,
        setSelectedArtistId,
      }}
    >
      {children}
    </Context.Provider>
  );
};
