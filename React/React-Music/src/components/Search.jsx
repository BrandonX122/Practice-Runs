import React from "react";
const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-center">
      <input
        type="text"
        placeholder="Search for any album or artist"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-white focus:outline-none my-5 p-4 w-full max-w-3xl rounded-2xl"
      />
    </div>
  );
};

export default Search;
