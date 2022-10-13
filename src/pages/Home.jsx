import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCtx } from "../context/context";
import useFetch from "../hooks/useFetch";

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
import Error from "../components/sections/Error";

const apiUserInfo = "https://api.spotify.com/v1/me";
const apiPlaylists = "https://api.spotify.com/v1/me/playlists?limit=50&offset=0";
const apiTopSongs = "https://api.spotify.com/v1/me/top/tracks?limit=50&offset=0";
const apiNewReleases = "https://api.spotify.com/v1/browse/new-releases?limit=50&offset=0";

const Home = ({ openPanel, setOpenPanel }) => {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);
  const [myTopSongs, setMyTopSongs] = useState({});
  const [newReleases, setNewReleases] = useState([]);
  const { setUserLoggedToken, setUserInfo, section } = useCtx();
  const { fetchPromiseAllData, loading } = useFetch();

  const fetchData = async id => {
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + id,
        "Content-Type": "application/json",
      },
    };

    const resUserInfo = await fetch(apiUserInfo, options);
    const resPlaylists = await fetch(apiPlaylists, options);
    const resTopSongs = await fetch(apiTopSongs, options);
    const resNewReleases = await fetch(apiNewReleases, options);

    const { data } = await fetchPromiseAllData([
      resUserInfo,
      resPlaylists,
      resTopSongs,
      resNewReleases,
    ]);

    setUserInfo({
      username: data[0].display_name,
      id: data[0].id,
      url: data[0].external_urls.spotify,
      image: data[0].images[0].url,
    });
    setPlaylists(data[1]);
    setMyTopSongs(data[2]);
    setNewReleases(data[3].albums);
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
            myTopSongs={myTopSongs}
            newReleases={newReleases}
          />
        )}
        {section === "categories" && <Categories />}
        {section === "songs i liked" && <Liked />}
        {section === "new playlist" && <NewPlaylist />}
        {section === "playlist" && <Playlist fetchData={fetchData} />}
        {section === "album" && <Album />}
        {section === "artist" && <Artist />}
        {section === "search" && <Search />}
        {section === "error" && <Error />}
        <Player />
      </div>
    </div>
  );
};

export default Home;
