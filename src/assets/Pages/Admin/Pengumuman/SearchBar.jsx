"use client";
import React from "react";

const SearchBar = () => {
  return (
    <div className="search-container d-flex align-items-center p-3">
      <input
        type="text"
        placeholder="Search"
        className="border-0 bg-transparent flex-grow-1"
        style={{ outline: "none" }}
      />
      <img src="https://cdn.builder.io/api/v1/image/assets/6e56f22283ca426d8ccf6afbc1731b56/7d324a11d19de8fbd804298d8135ece2db18bb3a?placeholderIfAbsent=true" alt="Search" width="16" />
    </div>
  );
};

export default SearchBar;
