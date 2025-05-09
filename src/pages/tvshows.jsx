import React, { useState, useEffect, useRef } from "react";
import { ClipLoader } from "react-spinners";
import "./tvshows.css";
import { fetchMovies, ENDPOINTS, TV_GENRES as genres } from "../constants/constants";
import MovieCard from "../constants/components/MovieCard";
import { getPageNumbers, getItemRange } from "../constants/Pagintaion/Pagintaion";

const TVShowsPage = () => {
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilters, setActiveFilters] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [genreMenuOpen, setGenreMenuOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const genreMenuRef = useRef(null);
  const itemsPerPage = 10;

  // Close genre dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (genreMenuRef.current && !genreMenuRef.current.contains(event.target)) {
        setGenreMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const toggleGenreMenu = () => {
    setGenreMenuOpen(!genreMenuOpen);
  };

  const toggleGenre = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter(id => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  const getGenreDisplayText = () => {
    if (selectedGenres.length === 0) return "Select genres";
    return selectedGenres
      .map(id => genres.find(g => g.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  const resetFilters = () => {
    setSelectedGenres([]);
    setSortBy("popularity.desc");
    setYearFrom("");
    setYearTo("");
    setActiveFilters(null);
  };

  const applyFilters = () => {
    const filters = {
      genres: selectedGenres.join(","),
      sort_by: sortBy,
      "first_air_date.gte": yearFrom ? `${yearFrom}-01-01` : "",
      "first_air_date.lte": yearTo ? `${yearTo}-12-31` : "",
    };
    setActiveFilters(filters);
    setPage(1);
  };

  useEffect(() => {
    const fetchShowsData = async () => {
      try {
        setLoading(true);
        setError(null);

        let data;
        
        if (activeFilters) {
          let queryParams = "";
          
          if (activeFilters.genres && activeFilters.genres.length > 0) {
            queryParams += `&with_genres=${activeFilters.genres}`;
          }
          
          if (activeFilters.sort_by) queryParams += `&sort_by=${activeFilters.sort_by}`;
          
          if (activeFilters["first_air_date.gte"]) {
            queryParams += `&first_air_date.gte=${activeFilters["first_air_date.gte"]}`;
          }
          
          if (activeFilters["first_air_date.lte"]) {
            queryParams += `&first_air_date.lte=${activeFilters["first_air_date.lte"]}`;
          }
          
          console.log("Fetching with filters:", `/discover/tv`, queryParams);
          data = await fetchMovies(`/discover/tv`, queryParams, page);
        } else {
          const categories = ["popular", "topRated", "onTheAir", "airingToday"];
          const allShows = [];
          
          for (const category of categories) {
            const endpoint = ENDPOINTS.tv[category];
            const catData = await fetchMovies(endpoint, "", page);
            if (catData && catData.results) {
              allShows.push(...catData.results);
            }
          }
          
          data = {
            results: Array.from(
              new Map(allShows.map((show) => [show.id, show])).values()
            )
          };
        }

        if (!data || !data.results) {
          console.error("API Response Error:", data);
          throw new Error("Invalid response from API");
        }

        setShows(data.results);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching TV shows:", err);
        setError("Failed to load TV shows. Please try again later.");
        setLoading(false);
      }
    };

    fetchShowsData();
  }, [page, activeFilters]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <ClipLoader color="#eaeaea" size={60} />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const { pageNumbers, totalPages, startPage, endPage } = getPageNumbers(page, shows.length, itemsPerPage);
  const { indexOfFirstItem, indexOfLastItem } = getItemRange(page, shows.length, itemsPerPage);
  const currentShows = shows.slice(indexOfFirstItem - 1, indexOfLastItem);

  return (
    <main className="container mt-4">
      {/* Filter Section */}
      <div className="container mx-0 px-0 mt-3 mb-2">
        <div className="card bg-dark text-white">
          <div className="card-header d-flex justify-content-between align-items-center py-2">
            <div className="d-flex align-items-center">
              <h6 className="mb-0 me-2">Filters</h6>
              <button
                className="btn btn-sm btn-link text-white px-2"
                type="button"
                onClick={toggleCollapse}
                aria-expanded={!collapsed}
                aria-controls="filterOptions"
              >
                <i className={`fas fa-chevron-${collapsed ? 'down' : 'up'} collapse-icon`}></i>
              </button>
            </div>
            <button className="btn btn-sm" onClick={resetFilters}>
              Reset
            </button>
          </div>
          
          {!collapsed && (
            <div className="card-body py-2">
              <div className="row gx-2">
                {/* Genre Filter */}
                <div className="col-md-4 mb-2">
                  <label htmlFor="genreSelect" className="form-label small mb-1">
                    Genre
                  </label>
                  <div 
                    className={`custom-select-container ${genreMenuOpen ? 'open' : ''}`} 
                    ref={genreMenuRef}
                  >
                    <div 
                      className="custom-select-display" 
                      onClick={toggleGenreMenu}
                    >
                      {getGenreDisplayText()}
                    </div>
                    {genreMenuOpen && (
                      <div className="custom-select-options">
                        {genres.map((genre) => (
                          <div
                            key={genre.id}
                            className={`custom-select-option ${selectedGenres.includes(genre.id) ? 'selected' : ''}`}
                            onClick={() => toggleGenre(genre.id)}
                          >
                            {genre.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Sort By Filter */}
                <div className="col-md-4 mb-2">
                  <label htmlFor="sortSelect" className="form-label small mb-1">
                    Sort By
                  </label>
                  <select 
                    className="form-select form-select-sm" 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="popularity.desc">Popularity (Desc)</option>
                    <option value="popularity.asc">Popularity (Asc)</option>
                    <option value="vote_average.desc">Rating (Desc)</option>
                    <option value="vote_average.asc">Rating (Asc)</option>
                    <option value="first_air_date.desc">Release Date (Desc)</option>
                    <option value="first_air_date.asc">Release Date (Asc)</option>
                  </select>
                </div>

                {/* Year Filter */}
                <div className="col-md-4 mb-2">
                  <label htmlFor="yearRange" className="form-label small mb-1">
                    Release Year
                  </label>
                  <div className="d-flex gap-2">
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      placeholder="From"
                      min="1900"
                      max="2025"
                      value={yearFrom}
                      onChange={(e) => setYearFrom(e.target.value)}
                    />
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      placeholder="To"
                      min="1900"
                      max="2025"
                      value={yearTo}
                      onChange={(e) => setYearTo(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-1">
                <div className="col-12 d-flex justify-content-end">
                  <button 
                    className="btn btn-sm" 
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Shows Grid */}
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3 mt-3">
        {currentShows.length > 0 ? (
          currentShows.map((show, index) => (
            show.poster_path && (
              <MovieCard
                movie={show}
                key={show.id}
                index={index}
                isMovie="tv"
                hoverWindow={true}
              />
            )
          ))
        ) : (
          <div className="col-12 text-center py-4">
            <p>No TV shows found matching your criteria. Try adjusting your filters.</p>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {shows.length > itemsPerPage && (
        <div className="mt-4">
          <div className="pagination-container">
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    aria-label="Previous page"
                  >
                    Previous
                  </button>
                </li>
                {startPage > 1 && (
                  <>
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(1)}
                        aria-label="First page"
                      >
                        1
                      </button>
                    </li>
                    {startPage > 2 && (
                      <li className="page-item disabled">
                        <span className="page-link">...</span>
                      </li>
                    )}
                  </>
                )}
                {pageNumbers.map((number) => (
                  <li key={number} className={`page-item ${page === number ? "active" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(number)}
                      aria-label={`Page ${number}`}
                      aria-current={page === number ? "page" : null}
                    >
                      {number}
                    </button>
                  </li>
                ))}
                {endPage < totalPages && (
                  <>
                    {endPage < totalPages - 1 && (
                      <li className="page-item disabled">
                        <span className="page-link">...</span>
                      </li>
                    )}
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(totalPages)}
                        aria-label={`Last page, page ${totalPages}`}
                      >
                        {totalPages}
                      </button>
                    </li>
                  </>
                )}
                <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    aria-label="Next page"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
            {shows.length > 0 && (
              <p className="text-center small mt-2">
                Showing {indexOfFirstItem}-{indexOfLastItem} of {shows.length} items
              </p>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default TVShowsPage;