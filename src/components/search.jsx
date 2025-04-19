import React, { useState, useRef } from "react";
import { fetchMovies, ENDPOINTS } from "../constants/constants";
import MovieCard from "../constants/components/MovieCard";
import "../components/search.css";

const Search = ({ setIsSearchVisible }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all"); // State to track the active filter
  const timeoutRef = useRef(null); // Ref to store the timeout ID

  const handleSearch = async (searchQuery, type = "all") => {
    if (!searchQuery.trim()) {
      setResults([]);
      setFilteredResults([]);
      return;
    }

    // Clear any existing timeout to avoid overlapping calls
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a delay of 2 seconds before fetching
    timeoutRef.current = setTimeout(async () => {
      try {
        let data;
        if (type === "all") {
          data = await fetchMovies(ENDPOINTS.multiSearch, `&query=${searchQuery}`, 1);
        } else if (type === "movie") {
          data = await fetchMovies(ENDPOINTS.movies.search, `&query=${searchQuery}`, 1);
        } else if (type === "tv") {
          data = await fetchMovies(ENDPOINTS.tv.search, `&query=${searchQuery}`, 1);
        } else if (type === "person") {
          data = await fetchMovies(ENDPOINTS.person.search, `&query=${searchQuery}`, 1);
        }

        setResults(data.results || []);
        setFilteredResults(data.results || []); // Update filtered results
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }, 2000); // 2-second delay
  };

  const handleFilter = (type) => {
    setActiveFilter(type); // Set the active filter
    handleSearch(query, type); // Fetch data based on the selected filter
  };

  const handleKeyUp = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    handleSearch(searchQuery, activeFilter); // Search based on the active filter
  };

  return (
    <div className="searchContainer">
      <button
        className="exitSearch btn btn-primary"
        onClick={() => setIsSearchVisible(false)}
      >
        <i className="bi bi-x-lg"></i>
      </button>
      <div className="searchInput">
        <input
          type="text"
          className="form-control searchInputField"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={handleKeyUp}
        />
        <button
          className="btn btn-primary"
          onClick={() => handleSearch(query, activeFilter)}
        >
          <i className="bi bi-search"></i>
        </button>
      </div>
      <div className="searchTypeBtns">
        <button
          className={`btn btn-outline-primary ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => handleFilter("all")}
        >
          All
        </button>
        <button
          className={`btn btn-outline-primary ${activeFilter === "movie" ? "active" : ""}`}
          onClick={() => handleFilter("movie")}
        >
          Movies
        </button>
        <button
          className={`btn btn-outline-primary ${activeFilter === "tv" ? "active" : ""}`}
          onClick={() => handleFilter("tv")}
        >
          TV Shows
        </button>
        <button
          className={`btn btn-outline-primary ${activeFilter === "person" ? "active" : ""}`}
          onClick={() => handleFilter("person")}
        >
          Cast
        </button>
      </div>
      <div className="searchResults mt-3">
        {filteredResults.length > 0 ? (
          <div className="cardsGrid" onClick={() => setIsSearchVisible(false)}>
            {filteredResults.map((result) => (
              <MovieCard
                key={result.id}
                movie={{
                  id: result.id,
                  title: result.title || result.name,
                  image: result.poster_path
                    ? `https://image.tmdb.org/t/p/w440_and_h660_face${result.poster_path}`
                    : "https://via.placeholder.com/440x660?text=No+Image",
                  year: result.release_date
                    ? result.release_date.split("-")[0]
                    : result.first_air_date
                    ? result.first_air_date.split("-")[0]
                    : "N/A",
                  rating: result.vote_average || "N/A",
                }}
                isMovie={result.media_type === "movie"}
              />
            ))}
          </div>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default Search;