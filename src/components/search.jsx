import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../components/search.css";
import CastCard from "../constants/components/CastCard";
import MovieCard from "../constants/components/MovieCard";
import { ENDPOINTS, fetchMovies } from "../constants/constants";
import { setFilter } from "../redux/slices/filtersSlice";

const Search = ({ setIsSearchVisible }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [visibility, setVisibility] = useState([]); // State to track visibility of cards
  const timeoutRef = useRef(null);
  const dispatch = useDispatch();
  const activeFilter = useSelector((state) => state.filters.activeFilter);

  const handleSearch = async (searchQuery, type = "all") => {
    if (!searchQuery.trim()) {
      setResults([]);
      setFilteredResults([]);
      setVisibility([]); // Reset visibility
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        let data;
        if (type === "all") {
          data = await fetchMovies(
            ENDPOINTS.multiSearch,
            `&query=${searchQuery}`,
            1
          );
        } else if (type === "movie") {
          data = await fetchMovies(
            ENDPOINTS.movies.search,
            `&query=${searchQuery}`,
            1
          );
        } else if (type === "tv") {
          data = await fetchMovies(
            ENDPOINTS.tv.search,
            `&query=${searchQuery}`,
            1
          );
        } else if (type === "person") {
          data = await fetchMovies(
            ENDPOINTS.person.search,
            `&query=${searchQuery}`,
            1
          );
        }

        setResults(data.results || []);
        setFilteredResults(data.results || []);
        setVisibility(data.results.map(() => true));
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }, 1000);
  };

  const handleFilter = (type) => {
    dispatch(setFilter(type));
    handleSearch(query, type);
  };

  const handleKeyUp = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    handleSearch(searchQuery, activeFilter);
  };

  const handleImageError = (index) => {
    setVisibility((prevVisibility) => {
      const updatedVisibility = [...prevVisibility];
      updatedVisibility[index] = false; // Set visibility to false for the failed image
      return updatedVisibility;
    });
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
          className={`btn btn-outline-primary ${
            activeFilter === "all" ? "active" : ""
          }`}
          onClick={() => handleFilter("all")}
        >
          All
        </button>
        <button
          className={`btn btn-outline-primary ${
            activeFilter === "movie" ? "active" : ""
          }`}
          onClick={() => handleFilter("movie")}
        >
          Movies
        </button>
        <button
          className={`btn btn-outline-primary ${
            activeFilter === "tv" ? "active" : ""
          }`}
          onClick={() => handleFilter("tv")}
        >
          TV Shows
        </button>
        <button
          className={`btn btn-outline-primary ${
            activeFilter === "person" ? "active" : ""
          }`}
          onClick={() => handleFilter("person")}
        >
          Actors
        </button>
      </div>
      <div className="searchResults mt-3">
        {filteredResults.length > 0 ? (
          <div className="cardsGrid" onClick={() => setIsSearchVisible(false)}>
            {filteredResults.map((result, index) => {
              const type = result.title
                ? "movie"
                : result.first_air_date
                ? "tv"
                : "cast";

              if (
                !visibility[index] ||
                !(result.poster_path || result.profile_path)
              ) {
                return null; // Do not render the card if the image failed to load
              }

              if (type === "movie" || type === "tv")
                return (
                  <MovieCard
                    key={result.id}
                    movie={result}
                    isMovie={type}
                    onImageError={() => handleImageError(index)} // Hide the card if the image fails to load
                  />
                );
              else return CastCard(result);
            })}
          </div>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default Search;
