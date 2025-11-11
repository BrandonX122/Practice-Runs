import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-indigo-500 border-b-3 border-white sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 flex justify-between items-center">
          <div>
            <Link to="/">
              <h1 className="font-bold font-sans text-2xl text-white">
                Music Mine
              </h1>
            </Link>
          </div>
          <div>
            <Link to="/search" className="text-white font-semibold text-lg">
              Search
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
