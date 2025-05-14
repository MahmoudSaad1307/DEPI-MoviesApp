import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../components/search.css";
import CastCard from "../constants/components/CastCard";
import MovieCard from "../constants/components/MovieCard";
import { fetchMovies, ENDPOINTS, IMAGE_URL } from "../constants/constants";
import { setFilter } from "../redux/slices/filtersSlice";

const Search = ({ setIsSearchVisible }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [visibility, setVisibility] = useState([]);
  const timeoutRef = useRef(null);
  const dispatch = useDispatch();
  const activeFilter = useSelector((state) => state.filters.activeFilter);

  useEffect(() => {
    document.body.classList.add("search-active");

    return () => {
      document.body.classList.remove("search-active");
    };
  }, []);

  const handleSearch = async (searchQuery, type = "all") => {
    if (!searchQuery.trim()) {
      setResults([]);
      setFilteredResults([]);
      setVisibility([]);
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
      updatedVisibility[index] = false;
      return updatedVisibility;
    });
  };

  return (
    <div className="mainSearchContainer">
      <button
        className="mainExitSearch btn "
        onClick={() => setIsSearchVisible(false)}
      >
        <i className="bi bi-x-lg"></i>
      </button>
      <div className="mainSearchInput">
        <input
          type="text"
          className="form-control mainSearchInputField"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={handleKeyUp}
        />
        <button
          className="btn search-btn btn-primary"
          onClick={() => handleSearch(query, activeFilter)}
        >
          <i className="bi bi-search"></i>
        </button>
      </div>
      <div className="mainSearchTypeBtns">
        <button
          className={`btn  ${activeFilter === "all" ? "activesearch" : ""}`}
          onClick={() => handleFilter("all")}
        >
          All
        </button>
        <button
          className={`btn  ${activeFilter === "movie" ? "activesearch" : ""}`}
          onClick={() => handleFilter("movie")}
        >
          Movies
        </button>
        <button
          className={`btn  ${activeFilter === "tv" ? "activesearch" : ""}`}
          onClick={() => handleFilter("tv")}
        >
          TV Shows
        </button>
        <button
          className={`btn  ${activeFilter === "person" ? "activesearch" : ""}`}
          onClick={() => handleFilter("person")}
        >
          Actors
        </button>
      </div>
      <div className="mainSearchResults mt-3 d-flex justify-content-center">
        {filteredResults.length > 0 ? (
          <div
            className="mainCardsGrid row-cols-lg-6 row-cols-md-4 row-cols-1 g-3 row d-flex justify-content-center"
            onClick={() => setIsSearchVisible(false)}
          >
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
                return null;
              }

              if (type === "movie" || type === "tv")
                return (
                  <div>
                    <MovieCard
                      key={result.id}
                      movie={result}
                      isMovie={type}
                      onImageError={() => handleImageError(index)}
                    />
                  </div>
                );
              else
                return (
                  <div className="search-cast-card">
                    <CastCard 
                      key={result.id}
                      name={result.name}
                      character={result.known_for[0]?.title || ""}
                      profile_path={result.profile_path}
                      onImageError={() => handleImageError(index)}
                    ></CastCard>
                  </div>
                );
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
