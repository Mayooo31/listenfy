import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCtx } from "../context/context";

import Navbar from "../components/Navbar";
import Panel from "../components/Panel";
import Library from "../components/Library";
import Player from "../components/Player";
import Categories from "../components/Categories";
import Liked from "../components/Liked";

const Home = ({ openPanel, setOpenPanel }) => {
  const navigate = useNavigate();
  const {
    setUserLoggedToken,
    setUserInfo,
    setPlaylists,
    setMyTopSongs,
    setNewReleases,
    section,
  } = useCtx();

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

    Promise.all([resUserInfo, resPlaylists, resTopSongs, resNewReleases])
      .then(values => Promise.all(values.map(r => r.json())))
      .then(([dataUserInfo, dataPlaylists, dataTopSongs, dataNewReleases]) => {
        setUserInfo({
          username: dataUserInfo.display_name,
          id: dataUserInfo.id,
          url: dataUserInfo.external_urls.spotify,
          image: dataUserInfo.images[0].url,
        });
        setPlaylists(dataPlaylists.items);
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
      <Panel openPanel={openPanel} setOpenPanel={setOpenPanel} />
      <div className="fixed flex flex-col justify-end top-24 bottom-0 left-0 right-0 m-2 md:left-80 md:ml-4">
        {section === "library" && <Library />}
        {section === "categories" && <Categories />}
        {section === "songs i liked" && <Liked />}
        <Player />
      </div>
    </div>
  );
};

export default Home;

// const getLikedSongs = async id => {
//   const res = await fetch(`https://api.spotify.com/v1/me/tracks?limit=50&offset=0`, {
//     method: "GET",
//     headers: {
//       Authorization: "Bearer " + id,
//       "Content-Type": "application/json",
//     },
//   });
//   const data = await res.json();

//   // console.log(data);
// };
