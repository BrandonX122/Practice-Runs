import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SkeletonCard from "./SkeletonCard";
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
import { useDebounce } from "react-use";

const TopListings = ({ token, isHome = true, searchTerm = "" }) => {
  const BASE_URL = "https://api.spotify.com";
  const [topNewAlbums, setTopNewAlbums] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showFullList, setShowFullList] = useState(false);
  const [debouncedTerm, setDebouncedTerm] = useState("");

  useDebounce(() => setDebouncedTerm(searchTerm), 500, [searchTerm]);
  useEffect(() => {
    fetchTopListing(debouncedTerm);
  }, [debouncedTerm]);

  const fetchTopListing = async (query = "") => {
    setIsLoading(true);
    setError(null);

    try {
      if (!token) {
        throw new Error("Access token is missing. Cannot fetch albums.");
      }

      let currentYear = new Date().getFullYear();
      const endpoint =
        query !== ""
          ? `${BASE_URL}/v1/search?q=${encodeURIComponent(
              query
            )}&type=album,artist&market=US&limit=50`
          : `${BASE_URL}/v1/search?q=${encodeURIComponent(
              `year:${currentYear}`
            )}&type=album&market=US&limit=50`;

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Spotify API error (${response.status}): ${
            errorData.error?.message || `Failed to fetch list`
          }`
        );
      }

      const data = await response.json();

      if (!data.albums || !Array.isArray(data.albums.items)) {
        throw new Error("Invalid response structure");
      }

      setTopNewAlbums(data.albums.items);
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

  const handleToggle = () => {
    setShowFullList((prevState) => !prevState);
  };
  const showAlbums = showFullList ? topNewAlbums : topNewAlbums.slice(0, 10);

  return (
    <section className="bg-indigo-500 border-t-3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center my-5">
        {isHome && (
          <h1 className="self-center my-5 text-white border-b-3 pb-3 font-bold md:text-5xl sm:text-2xl">
            Top Albums This Year
          </h1>
        )}
        <div className="grid grid-cols-5 gap-3 rounded-xl bg-indigo-400 p-5">
          {isLoading
            ? Array.from({ length: 10 }).map((i) => <SkeletonCard key={i} />)
            : showAlbums.map((album) => (
                <div key={album.id}>
                  <Link to="/search">
                    <Card className="px-3 cursor-pointer hover:bg-[#ced4da] transition duration-300">
                      <img
                        src={album.images[1]?.url}
                        className="rounded-md shadow-md"
                      />
                      <CardDescription>
                        <h1 className="text-xl font-bold truncate text-black">
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
                  </Link>
                </div>
              ))}
        </div>
        <Button
          onClick={handleToggle}
          className="my-5 cursor-pointer self-center bg-indigo-700 hover:bg-indigo-600 transition duration-300"
        >
          {showFullList ? "Show Less" : "Show More"}
        </Button>
      </div>
    </section>
  );
};

export default TopListings;
