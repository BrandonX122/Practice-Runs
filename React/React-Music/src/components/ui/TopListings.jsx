import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

const TopListings = ({ token }) => {
  const BASE_URL = "https://api.spotify.com";
  const [topNewAlbums, setTopNewAlbums] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTopListing();
  }, []);

  const fetchTopListing = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!token) {
        throw new Error("Access token is missing. Cannot fetch albums.");
      }

      let currentYear = new Date().getFullYear();
      const query = `year:${currentYear}`;
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
        throw new Error(
          `Spotify API error (${response.status}): ${
            errorData.error?.message ||
            `Failed to fetch list of top ${currentYear} albums`
          }`
        );
      }

      const data = await response.json();

      if (!data.albums || !Array.isArray(data.albums.items)) {
        throw new Error(
          "Invalid response structure: albums data is missing or malformed"
        );
      }

      setTopNewAlbums(data.albums.items);
      console.log("Successfully fetched albums:", data.albums.items);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "An unknown error occurred";
      console.error("Failed to fetch top listings:", errorMsg);
      setError(errorMsg);
      setTopNewAlbums([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-center my-5 font-bold md:text-5xl sm:text-2xl">
          Top Albums This Year
        </h1>
        <div className="grid grid-cols-5 gap-3 border border-indigo-500 p-5">
          {topNewAlbums.map(
            (album) =>
              album.album_type === "album" && (
                <div key={album.id}>
                  <Card className="px-3">
                    <img src={album.images[1].url} />
                    <CardDescription>
                      <h1 className="text-xl font-bold truncate">
                        {album.name}
                      </h1>
                      <p className="font-semibold">
                        {album.artists.map((artist, i) => (
                          <span key={artist.id}>
                            {artist.name}
                            {i + 1 < album.artists.length && ", "}
                          </span>
                        ))}
                      </p>
                    </CardDescription>
                  </Card>
                </div>
              )
          )}
        </div>
      </div>
    </section>
  );
};

export default TopListings;
