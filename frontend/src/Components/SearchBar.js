import React, { useState } from "react";
import search from "../assets/images/search.png";
import "../styles/searchBar.css";
import API from "./../Services/API";

const SearchBar = ({ setResult }) => {
  const [input, setInput] = useState("");
  const [userData, setUserData] = useState([]);
  const fetchData = async (value) => {
    try {
      // Fetch data from API
      const response = await API.get("/usage/get-all-user");
      const users = response.data.results;

      // Filter out admins and users without names, then search by name
      const result = users
        .filter(user => user.role !== "admin" && user.name) // Filter admins and ensure name exists
        .filter(user => value && user.name.toLowerCase().includes(value.toLowerCase())); // Search by name

      // Update state
      setResult(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
