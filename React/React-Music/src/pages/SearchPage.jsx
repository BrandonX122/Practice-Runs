import React from "react";
import { useState } from "react";
import Search from "../components/Search";
import TopListings from "../components/ui/TopListings";

const SearchPage = ({ token }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <TopListings token={token} isHome={false} searchTerm={searchTerm} />
    </>
  );
};

export default SearchPage;
