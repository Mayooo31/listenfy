import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCtx } from "../context/context";

import Navbar from "../components/Navbar";
import Panel from "../components/Panel";
import Player from "../components/Player";
import Library from "../components/sections/Library";
import Categories from "../components/sections/Categories";
import Liked from "../components/sections/Liked";
import NewPlaylist from "../components/sections/NewPlaylist";
import Playlist from "../components/sections/Playlist";
import Album from "../components/sections/Album";
import Artist from "../components/sections/Artist";
import Search from "../components/sections/Search";

const Home = ({ openPanel, setOpenPanel }) => {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);
  const [myTopSongs, setMyTopSongs] = useState({});
  const [newReleases, setNewReleases] = useState([]);
  const { setUserLoggedToken, setUserInfo, section } = useCtx();

  const fetchData = async id => {
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + id,
        "Content-Type": "application/json",
      },
    };

    const resUserInfo = await fetch("https://api.spotify.com/v1/me", options);
    const resPlaylists = await fetch(
      "https://api.spotify.com/v1/me/playlists?limit=50&offset=0",
      options
    );
    const resTopSongs = await fetch(
      "https://api.spotify.com/v1/me/top/tracks?limit=50&offset=0",
      options
    );
    const resNewReleases = await fetch(
      "https://api.spotify.com/v1/browse/new-releases?limit=50&offset=0",
      options
    );

    // Playback needs spotify premium
    // const resPlaybackState = await fetch("https://api.spotify.com/v1/me/player", options);
    // const data = await resPlaybackState.json();
    // console.log(data);

    Promise.all([resUserInfo, resPlaylists, resTopSongs, resNewReleases])
      .then(values => Promise.all(values.map(r => r.json())))
      .then(([dataUserInfo, dataPlaylists, dataTopSongs, dataNewReleases]) => {
        setUserInfo({
          username: dataUserInfo.display_name,
          id: dataUserInfo.id,
          url: dataUserInfo.external_urls.spotify,
          image: dataUserInfo.images[0].url,
        });
        setPlaylists(dataPlaylists);
        setMyTopSongs(dataTopSongs);
        setNewReleases(dataNewReleases.albums);
      });
  };

  useEffect(() => {
    const { hash } = window.location;
    if (!hash) return navigate("/");
    const token = hash.substring(1).split("&")[0].split("=")[1];
    fetchData(token);
    setUserLoggedToken(token);
  }, []);

  return (
    <div className="h-screen w-screen">
      <Navbar openPanel={openPanel} setOpenPanel={setOpenPanel} />
      <Panel
        openPanel={openPanel}
        setOpenPanel={setOpenPanel}
        playlists={playlists}
        setPlaylists={setPlaylists}
      />
      <div className="fixed flex flex-col justify-end top-24 bottom-0 left-0 right-0 m-2 md:left-80 md:ml-4">
        {section === "library" && (
          <Library
            playlists={playlists}
            setPlaylists={setPlaylists}
            myTopSongs={myTopSongs}
            setMyTopSongs={setMyTopSongs}
            newReleases={newReleases}
            setNewReleases={setNewReleases}
          />
        )}
        {section === "categories" && <Categories />}
        {section === "songs i liked" && <Liked />}
        {section === "new playlist" && <NewPlaylist />}
        {section === "playlist" && <Playlist />}
        {section === "album" && <Album />}
        {section === "artist" && <Artist />}
        {section === "search" && <Search />}
        <Player />
      </div>
    </div>
  );
};

export default Home;
