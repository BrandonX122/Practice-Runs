import React from "react";
import { useState, useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const App = () => {
  const BASE_URL = "https://api.spotify.com";
  const { VITE_SPOTIFY_CLIENT_ID, VITE_SPOTIFY_CLIENT_SECRET } = import.meta
    .env;
  const [accessToken, setAccessToken] = useState(null);

  //acquire access token from Spotify Web API
  useEffect(() => {
    async function getAccessToken() {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: VITE_SPOTIFY_CLIENT_ID,
          client_secret: VITE_SPOTIFY_CLIENT_SECRET,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to pass credentials for access token");
      }
      const data = await response.json();
      setAccessToken(data.access_token);
    }
    getAccessToken();
  }, []);

  if (!accessToken) {
    return <div>Loading...</div>;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage token={accessToken} />} />
        <Route path="/search" element={<SearchPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
