import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Actor.css";
import { useParams, Link } from "react-router-dom";
import Pagination, {
  paginate,
  getPageNumbers,
  getItemRange,
} from "../../src/constants/Pagintaion/Pagintaion";
import {
  API_KEY,
  BASE_URL,
  BACKDROP_PATH,
  IMAGE_URL,
  ENDPOINTS,
} from "../constants/constants";
import MovieCard from "../constants/components/MovieCard";

const ActorPage = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [activeTab, setActiveTab] = useState("movies");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentMoviePage, setCurrentMoviePage] = useState(1);
  const [currentTvPage, setCurrentTvPage] = useState(1);
  const itemsPerPage = 10; 

  useEffect(() => {
    const fetchActorData = async () => {
      try {
        console.log("================================================");
        setLoading(true);

        const response = await fetch(
          `${BASE_URL}${ENDPOINTS.person.details(
            id
          )}?api_key=${API_KEY}&append_to_response=movie_credits,tv_credits`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`${IMAGE_URL}${data.profile_path}`);

        setActor(data);

        const actorMovies = data.movie_credits?.cast || [];
        actorMovies.sort((a, b) => b.popularity - a.popularity);
        setMovies(actorMovies);

        const actorTvShows = data.tv_credits?.cast || [];
        actorTvShows.sort((a, b) => b.popularity - a.popularity);
        setTvShows(actorTvShows);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching actor data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchActorData();
    }
  }, [id]);

  // Pagination handlers
  const handlePaginateMovies = (pageNumber) => {
    setCurrentMoviePage(pageNumber);
    paginate(pageNumber); 
    window.scrollTo(0, 0);
  };

  const handlePaginateTvShows = (pageNumber) => {
    setCurrentTvPage(pageNumber);
    paginate(pageNumber); 
    window.scrollTo(0, 0);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "movies") {
      setCurrentMoviePage(1);
    } else {
      setCurrentTvPage(1);
    }
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5 alert alert-danger">
        Error loading actor data: {error}
      </div>
    );
  }

  if (!actor) {
    return (
      <div className="container my-5 alert alert-warning">Actor not found</div>
    );
  }

  const {
    pageNumbers: moviePageNumbers,
    totalPages: totalMoviePages,
    startPage: movieStartPage,
    endPage: movieEndPage,
  } = getPageNumbers(currentMoviePage, movies.length, itemsPerPage);
  const {
    pageNumbers: tvPageNumbers,
    totalPages: totalTvPages,
    startPage: tvStartPage,
    endPage: tvEndPage,
  } = getPageNumbers(currentTvPage, tvShows.length, itemsPerPage);

  const { indexOfFirstItem: movieFirstItem, indexOfLastItem: movieLastItem } =
    getItemRange(currentMoviePage, movies.length, itemsPerPage);
  const { indexOfFirstItem: tvFirstItem, indexOfLastItem: tvLastItem } =
    getItemRange(currentTvPage, tvShows.length, itemsPerPage);

  const currentMovies = movies.slice(movieFirstItem - 1, movieLastItem);
  const currentTvShows = tvShows.slice(tvFirstItem - 1, tvLastItem);

  return (
    <main className="container my-5">
      <div className="row d-flex justify-content-center main-container">
        <div className="col-lg-8">
          <div className="mb-4">
            <p className="  mb-1">Appearances by</p>
            <h1 className="mb-4">{actor.name}</h1>

            <ul className="nav nav-tabs mb-4">
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "movies" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("movies")}
                >
                  Movies ({movies.length})
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "tvShows" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("tvShows")}
                >
                  TV Shows ({tvShows.length})
                </button>
              </li>
            </ul>

            {activeTab === "movies" && (
              <>
                <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
                  {movies.length > 0 ? (
                    currentMovies.map(
                      (movie, index) =>
                        movie.poster_path && (
                          //  {/* the problem fixed after i wrapped the movie card in a div */}
                          <div>
                            <MovieCard
                              movie={movie}
                              index={index}
                              isMovie={"movie"}
                            />
                          </div>
                        )
                    )
                  ) : (
                    <div className="col-12">
                      <p className=" ">No movie appearances found.</p>
                    </div>
                  )}
                </div>

                {movies.length > itemsPerPage && (
                  <div className="my-5">
                    <div className="pagination-container">
                      <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-center">
                          <li
                            className={`page-item ${
                              currentMoviePage === 1 ? "disabled" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() =>
                                handlePaginateMovies(currentMoviePage - 1)
                              }
                              disabled={currentMoviePage === 1}
                              aria-label="Previous page"
                            >
                              Previous
                            </button>
                          </li>

                          {movieStartPage > 1 && (
                            <>
                              <li className="page-item">
                                <button
                                  className="page-link"
                                  onClick={() => handlePaginateMovies(1)}
                                  aria-label="First page"
                                >
                                  1
                                </button>
                              </li>
                              {movieStartPage > 2 && (
                                <li className="page-item disabled">
                                  <span className="page-link">...</span>
                                </li>
                              )}
                            </>
                          )}

                          {moviePageNumbers.map((number) => (
                            <li
                              key={number}
                              className={`page-item ${
                                currentMoviePage === number ? "active" : ""
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => handlePaginateMovies(number)}
                                aria-label={`Page ${number}`}
                                aria-current={
                                  currentMoviePage === number ? "page" : null
                                }
                              >
                                {number}
                              </button>
                            </li>
                          ))}

                          {movieEndPage < totalMoviePages && (
                            <>
                              {movieEndPage < totalMoviePages - 1 && (
                                <li className="page-item disabled">
                                  <span className="page-link">...</span>
                                </li>
                              )}
                              <li className="page-item">
                                <button
                                  className="page-link"
                                  onClick={() =>
                                    handlePaginateMovies(totalMoviePages)
                                  }
                                  aria-label={`Last page, page ${totalMoviePages}`}
                                >
                                  {totalMoviePages}
                                </button>
                              </li>
                            </>
                          )}

                          <li
                            className={`page-item ${
                              currentMoviePage === totalMoviePages
                                ? "disabled"
                                : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() =>
                                handlePaginateMovies(currentMoviePage + 1)
                              }
                              disabled={currentMoviePage === totalMoviePages}
                              aria-label="Next page"
                            >
                              Next
                            </button>
                          </li>
                        </ul>
                      </nav>

                      {true && movies.length > 0 && (
                        <p className="text-center   small mt-2">
                          Showing {movieFirstItem}-{movieLastItem} of{" "}
                          {movies.length} items
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {activeTab === "tvShows" && (
              <>
                <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
                  {tvShows.length > 0 ? (
                    currentTvShows.map(
                      (show, index) =>
                        show.poster_path && (
                          <div>
                            {" "}
                            <MovieCard
                              movie={show}
                              index={index}
                              isMovie={"tv"}
                            />
                          </div>
                        )
                    )
                  ) : (
                    <div className="col-12">
                      <p className=" ">No TV show appearances found.</p>
                    </div>
                  )}
                </div>

                {tvShows.length > itemsPerPage && (
                  <div className="mt-4">
                    <div className="pagination-container">
                      <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-center">
                          <li
                            className={`page-item ${
                              currentTvPage === 1 ? "disabled" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() =>
                                handlePaginateTvShows(currentTvPage - 1)
                              }
                              disabled={currentTvPage === 1}
                              aria-label="Previous page"
                            >
                              Previous
                            </button>
                          </li>

                          {tvStartPage > 1 && (
                            <>
                              <li className="page-item">
                                <button
                                  className="page-link"
                                  onClick={() => handlePaginateTvShows(1)}
                                  aria-label="First page"
                                >
                                  1
                                </button>
                              </li>
                              {tvStartPage > 2 && (
                                <li className="page-item disabled">
                                  <span className="page-link">...</span>
                                </li>
                              )}
                            </>
                          )}

                          {tvPageNumbers.map((number) => (
                            <li
                              key={number}
                              className={`page-item ${
                                currentTvPage === number ? "active" : ""
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => handlePaginateTvShows(number)}
                                aria-label={`Page ${number}`}
                                aria-current={
                                  currentTvPage === number ? "page" : null
                                }
                              >
                                {number}
                              </button>
                            </li>
                          ))}

                          {tvEndPage < totalTvPages && (
                            <>
                              {tvEndPage < totalTvPages - 1 && (
                                <li className="page-item disabled">
                                  <span className="page-link">...</span>
                                </li>
                              )}
                              <li className="page-item">
                                <button
                                  className="page-link"
                                  onClick={() =>
                                    handlePaginateTvShows(totalTvPages)
                                  }
                                  aria-label={`Last page, page ${totalTvPages}`}
                                >
                                  {totalTvPages}
                                </button>
                              </li>
                            </>
                          )}

                          <li
                            className={`page-item ${
                              currentTvPage === totalTvPages ? "disabled" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() =>
                                handlePaginateTvShows(currentTvPage + 1)
                              }
                              disabled={currentTvPage === totalTvPages}
                              aria-label="Next page"
                            >
                              Next
                            </button>
                          </li>
                        </ul>
                      </nav>

                      {true && tvShows.length > 0 && (
                        <p className="text-center   small mt-2">
                          Showing {tvFirstItem}-{tvLastItem} of {tvShows.length}{" "}
                          items
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <aside className="aboutActor col-4">
          {actor.profile_path ? (
            <img src={`${IMAGE_URL}${actor.profile_path}`} alt={actor.name} />
          ) : (
            <img src="../assets/images/placeholder.jpg" alt="Actor profile" />
          )}
          <h3 className="actorName">
            {actor.name}{" "}
            {actor.birthday &&
              `(born ${new Date(actor.birthday).toLocaleDateString()})`}
          </h3>
          <p className="actorBio">
            {actor.biography.slice(0,700) || "No biography available."}
          </p>
          {actor.place_of_birth && (
            <p className="actorBio small">From: {actor.place_of_birth}</p>
          )}
        </aside>
      </div>
    </main>
  );
};

export default ActorPage;
