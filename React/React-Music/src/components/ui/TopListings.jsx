import React from "react";
import { useEffect, useState } from "react";

const TopListings = ({ token }) => {
  const BASE_URL = "https://api.spotify.com";
  const [topNewAlbums, setTopNewAlbums] = useState([]);
  useEffect(() => {
    fetchTopListing();
  }, []);

  const fetchTopListing = async () => {
    try {
      const query = "tag:new";
      const response = await fetch(
        `${BASE_URL}/v1/search?q=${encodeURIComponent(
          query
        )}&type=album&market=US&limit=50`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new error("Failed to fetch list of new releases");
      }

      const data = await response.json();
      setTopNewAlbums(data.albums.items);
      console.log(data.albums.items);
    } catch (error) {
      console.log("Failed to fetch toplisiting", error);
    }
  };

  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gird-cols-5 gap-5">
          {topNewAlbums.map((album) => (
            <div key={album.id}>
              <h1 className="text-xl font-bold">{album.name}</h1>
              <p className="font-semibold">
                By:{" "}
                {album.artists.map((artist, i) => (
                  <span key={artist.id}>
                    {artist.name}
                    {i + 1 < album.artists.length && ", "}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopListings;
