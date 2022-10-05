import React, { useEffect } from "react";
import { useCtx } from "../context/context";

import Navbar from "../components/Navbar";
import Panel from "../components/Panel";

const Demo = ({ openPanel, setOpenPanel }) => {
  const { setAccessToken, setUserInfo, setPlaylists } = useCtx();

  const getPlaylists = async id => {
    const res = await fetch(`https://api.spotify.com/v1/users/mayooo31/playlists`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + id,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    setPlaylists(data.items);
  };

  const getUserInfo = async id => {
    const res = await fetch("https://api.spotify.com/v1/users/mayooo31", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + id,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    setUserInfo({
      username: data.display_name,
      id: data.id,
      url: data.external_urls.spotify,
      image: data.images[0].url,
    });
  };

  useEffect(() => {
    const getToken = async () => {
      const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `grant_type=client_credentials&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`,
      });
      const data = await res.json();

      setAccessToken(data.access_token);
      getUserInfo(data.access_token);
      getPlaylists(data.access_token);
    };
    getToken();
  }, []);

  return (
    <div className="h-screen w-screen">
      <Navbar openPanel={openPanel} setOpenPanel={setOpenPanel} />
      <Panel openPanel={openPanel} setOpenPanel={setOpenPanel} />
    </div>
  );
};

export default Demo;
