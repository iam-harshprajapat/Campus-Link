import React, { useState } from "react";
import search from "../assets/images/search.png";
import "../styles/searchBar.css";
import API from "./../Services/API";

const SearchBar = ({ setResult }) => {
  const [input, setInput] = useState("");
  const [userData, setUserData] = useState([]);
  const fetchData = async (value) => {
    const response = await API.get("/usage/get-all-user");
    // console.log(response.data.results);
    const result = response.data.results.filter((user) => {
      return (
        value && user && user.name && user.name.toLowerCase().includes(value)
      );
    });
    setResult(result);
  };
  const handleInput = (value) => {
    setInput(value);
    fetchData(value.toLowerCase());
  };
  return (
    <>
      <div className="search-bar">
        <img alt="search-icon" src={search} />
        <input
          type="text"
          placeholder="Type to search..."
          value={input}
          onChange={(e) => handleInput(e.target.value)}
        />
      </div>
    </>
  );
};

export default SearchBar;
