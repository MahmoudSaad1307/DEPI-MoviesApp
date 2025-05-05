import React, { useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useParams, Link } from "react-router-dom";
import {
  API_KEY,
  BASE_URL,
  BACKDROP_PATH,
  IMAGE_URL,
  ENDPOINTS,
} from "../constants/constants";
import 'animate.css';
import "./MovieDetails.css";
import "./styles.css";
import "./responsive.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faPlay,
  faClock,
  faCommentSlash,
  faUser,
  faExternalLink,
} from "@fortawesome/free-solid-svg-icons";
import MovieCard from "../constants/components/MovieCard";
import InteractionPanel from "../constants/components/InteractionPanel";
import CastCard from "../constants/components/CastCard";
import ReviewCard from "../constants/components/ReviewCard";
import { addReview } from "../api/api";
import CustomToast from "../constants/components/Toast";


const MovieDetails = () => {
  const [showListModal, setShowListModal] = useState(false);
  const toggleModal = () => {
    if (showListModal) {
      // If closing, add a delay to allow for animation
      const modalElement = document.querySelector('.modal-dialog');
      if (modalElement) {
        modalElement.classList.remove('animate__fadeInDown');
        modalElement.classList.add('animate__fadeOutUp');
        
        setTimeout(() => {
          setShowListModal(false);
        }, 300); // Match this delay with your CSS transition duration
      } else {
        setShowListModal(false);
      }
    } else {
      // If opening, just show it
      setShowListModal(true);
    }
  };
  
  const userLists = [
    { id: 1, name: "Favorites" },
    { id: 2, name: "Watch Later" },
    { id: 3, name: "Holiday Movies" },
    { id: 4, name: "Documentaries" },
  ];

  const addToList = (listId) => {
    // This would handle the actual adding to the list functionality
    console.log(`Added to list with ID: ${listId}`);
    toggleModal();
  };
  
  const { id, media_type } = useParams();
  const isMovie = media_type === "movie";
  const [movieData, setMovieData] = useState(null);
  const [activeTab, setActiveTab] = useState("cast");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewContent, setReviewContent] = useState("");

  // Simplified function to handle review submission
  const handleSubmitReview = async () => {
    // Validate form
    if (!reviewContent.trim()) {
      alert("Please enter your review");
      return;
    }

    // Here you would typically send the review to your backend API
    try {
      await addReview({
        userId: "680f57fe84a68879a79ff410",
        movieId: id,
        mediaType: media_type,
        content: {
          text: `review from ${
            movieData.title ? movieData.title : movieData.name
          }`,
        },
      });
      alert("Thanks for the review");
    } catch (error) {
      console.error("Error adding review:", error);
    }

    // Clear form
    setReviewContent("");

    // Close modal
    const modal = document.getElementById("addReviewModal");
    const bootstrapModal = window.bootstrap.Modal.getInstance(modal);
    bootstrapModal.hide();
  };

  useEffect(() => {
    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  // Function to fetch movie details
  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const endpoint = isMovie
        ? ENDPOINTS.movies.details(id)
        : ENDPOINTS.tv.details(id);

      const response = await fetch(
        `${BASE_URL}${endpoint}?api_key=${API_KEY}&append_to_response=credits,recommendations,videos,reviews`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movie details");
      }

      const data = await response.json();
      console.log("Movie data fetched:", data);
      setMovieData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  // Function to find the best trailer
  const findBestTrailer = (videos) => {
    if (!videos || videos.length === 0) return null;

    // Filter for YouTube trailers
    const trailers = videos.filter(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    );

    // Return the first trailer
    return trailers.length > 0 ? trailers[0] : null;
  };

  // Handle watch later button click
  const handleWatchLater = () => {
    if (localStorage.getItem("user") !== null) {
      alert("Added to watch later list successfully");
    } else {
      alert("Please sign in first");
    }
  };

  // Format runtime to hours and minutes
  const formatRuntime = (minutes) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} h ${mins} m`;
  };

  // Return loading or error state
  if (loading) {
    return (
      <div className="container text-center my-5">Loading movie details...</div>
    );
  }

  if (error) {
    return (
      <div className="container text-center my-5 text-danger">
        Error: {error}
      </div>
    );
  }

  if (!movieData) {
    return (
      <div className="container text-center my-5">No movie data available</div>
    );
  }

  // Get best trailer
  const bestTrailer = movieData.videos
    ? findBestTrailer(movieData.videos.results)
    : null;

  // Find director
  const director =
    isMovie && movieData.credits
      ? movieData.credits.crew.find((person) => person.job === "Director")
          ?.name || "Unknown"
      : "Unknown";

  // Get main cast for summary
  const mainCast = movieData.credits
    ? movieData.credits.cast
        .slice(0, 3)
        .map((actor) => actor.name)
        .join(", ")
    : "Unknown";

  return (
    <>
      {/* Movie Info Section */}
      <div className="movie-container container">
        {movieData.backdrop_path && (
          <div
            className="movie-poster"
            style={{
              backgroundImage: `url(${BACKDROP_PATH}${movieData.backdrop_path})`,
              borderRadius: "5px",
            }}
          ></div>
        )}

        <div className="container px-4">
          <div className="row movie-header">
            <div className="col-lg-7">
              <h1 className="movie-title">
                {isMovie ? movieData.title : movieData.name}
              </h1>

              <div className="movie-rating">
                <span className="rating-star">
                  <i className="fas fa-star"></i>
                </span>
                <span className="fw-bold">
                  {movieData.vote_average.toFixed(1)}
                </span>
              </div>

              <div className="movie-info">
                <span>
                  {new Date(
                    isMovie ? movieData.release_date : movieData.first_air_date
                  ).getFullYear()}
                </span>
                {movieData.runtime && (
                  <span>{formatRuntime(movieData.runtime)}</span>
                )}
              </div>

              <div className="movie-tags">
                {movieData.genres &&
                  movieData.genres.map((genre) => (
                    <span key={genre.id} className="movie-tag">
                      {genre.name}
                    </span>
                  ))}
              </div>

              <div className="movie-meta">
                <span className="meta-label">Director:</span>
                <span className="director-name">{director}</span>
              </div>

              <div className="movie-meta">
                <span className="meta-label">Cast:</span>
                <span>{mainCast}</span>
              </div>

              <div className="movie-description">
                <span className="meta-label">Description:</span>
                <span id="description-text">{movieData.overview}</span>
              </div>

              {/* <div className="action-buttons">
                 <button
                  className="btn-play"
                  onClick={() =>
                    bestTrailer &&
                    window.open(
                      `https://www.youtube.com/watch?v=${bestTrailer.key}`,
                      "_blank"
                    )
                  }
                >
                  <span className="btn-icon">
                    <FontAwesomeIcon icon={faPlay} />
                  </span>
                  Play
                </button> 

                
                <button className="btn-secondary btn-add-to-list" onClick={toggleModal}>
                  <span className="btn-icon">
                    <i className="fas fa-list"></i>
                  </span>
                  Add to List
                </button>
              </div> */}
              <InteractionPanel
                showModal={showListModal}
                setShowModal={setShowListModal}
              />


            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="tabs-section container">
        <div className="container px-4">
          <div className="tabs">
            <div
              className={`tab ${activeTab === "cast" ? "active" : ""}`}
              onClick={() => setActiveTab("cast")}
            >
              Cast
            </div>
            <div
              className={`tab ${activeTab === "recommended" ? "active" : ""}`}
              onClick={() => setActiveTab("recommended")}
            >
              Recommended
            </div>
            <div
              className={`tab ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </div>
            <div
              className="add-review tab"
              data-bs-toggle="modal"
              data-bs-target="#addReviewModal"
            >
              Add Review
            </div>
          </div>

          {/* Cast Tab */}
          <div
            id="cast"
            className={`tab-content ${activeTab === "cast" ? "active" : ""}`}
          >
            <div className="cast-grid">
              {movieData.credits &&
                movieData.credits.cast
                  .slice(0, 8)
                  .map((actor) => actor.profile_path && CastCard(actor))}
            </div>
          </div>

          {/* Recommended Tab */}
          <div
            id="recommended"
            className={`tab-content ${
              activeTab === "recommended" ? "active" : ""
            }`}
          >
            <div className="row movie-cards">
              {movieData.recommendations &&
                movieData.recommendations.results
                  .slice(0, 6)
                  .map((movie, index) => (
                    <div
                      className="col-md-3 col-sm-6 col-lg-2 movie-container"
                      key={movie.id}
                    >
                      <div className="movie-card">
                        <MovieCard
                          movie={movie}
                          index={index}
                          isMovie={movie.title ? "movie" : "tv"}
                        />
                      </div>
                    </div>
                  ))}
            </div>
          </div>

          {/* Reviews Tab */}
          <div
            id="reviews"
            className={`tab-content ${activeTab === "reviews" ? "active" : ""}`}
          >
            {!movieData.reviews || movieData.reviews.results.length === 0 ? (
              <div className="no-reviews">
                <div className="text-center py-5">
                  <FontAwesomeIcon icon={faCommentSlash} className="fa-3x mb-3 text-muted" />
                  <h3>No Reviews Yet</h3>
                  <p>
                    Be the first to review this {isMovie ? "movie" : "show"}!
                  </p>
                </div>
              </div>
            ) : (
              <div className="reviews-container">
                {movieData.reviews.results.slice(0, 10).map((review, index) => {
                  return <ReviewCard review={review} index={index} key={index} />;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Add Review Modal */}
      <div
        className="modal fade"
        id="addReviewModal"
        tabIndex="-1"
        aria-labelledby="addReviewModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addReviewModalLabel">
                Add Your Review
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="reviewForm">
                <div className="mb-3">
                  <label htmlFor="reviewContent" className="form-label">
                    Your Review
                  </label>
                  <textarea
                    className="form-control"
                    id="reviewContent"
                    rows="5"
                    placeholder="Share your thoughts about this movie..."
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmitReview}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add to List Modal */}
      {showListModal && (
  <div 
    className="modal fade show" 
    style={{
      display: 'block',
      backgroundColor: 'rgba(0,0,0,0.5)'
    }}
  >
    <div className="modal-dialog modal-dialog-centered animate__animated animate__fadeInDown">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add to List</h5>
          <button type="button" className="btn-close" onClick={toggleModal}></button>
        </div>
        
        <div className="modal-body">
          <ul className="list-group list-group-flush">
            {userLists.map(list => (
              <li key={list.id} className="list-group-item">
                <button 
                  onClick={() => addToList(list.id)}
                  className="btn btn-link text-decoration-none d-flex justify-content-between align-items-center w-100"
                >
                  <span>{list.name}</span>
                  <i className="fas fa-plus"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="modal-footer">
          <button 
            className="btn btn-primary w-100"
            onClick={() => {
              console.log("Create new list");
              toggleModal();
            }}
          >
            Create New List
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default MovieDetails;