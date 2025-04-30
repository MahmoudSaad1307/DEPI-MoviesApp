import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  API_KEY,
  BASE_URL,
  BACKDROP_PATH,
  IMAGE_URL,
  ENDPOINTS,
} from "../constants/constants";
import "./MovieDetails.css";
import "./styles.css";
import "./responsive.css";
// import Test from "../Vanilla/shared/test";
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

const MovieDetails = () => {
  const { id, media_type } = useParams();
  const isMovie = media_type === "movie";
  const [movieData, setMovieData] = useState(null);
  const [activeTab, setActiveTab] = useState("cast");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Add this state variable inside your component
const [reviewContent, setReviewContent] = useState('');

// Simplified function to handle review submission
const handleSubmitReview = () => {
  // Check if user is logged in
  if (localStorage.getItem("user") === null) {
    alert("Please sign in to submit a review");
    return;
  }

  // Validate form
  if (!reviewContent.trim()) {
    alert("Please enter your review");
    return;
  }

  // Here you would typically send the review to your backend API
  console.log("Submitting review:", {
    movieId: id,
    content: reviewContent,
    user: JSON.parse(localStorage.getItem("user")).username
  });

  // Show success message
  alert("Thank you for your review!");

  // Clear form
  setReviewContent('');

  // Close modal
  const modal = document.getElementById('addReviewModal');
  const bootstrapModal = bootstrap.Modal.getInstance(modal);
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

<InteractionPanel/>
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
                    <i className="fas fa-play"></i>
                  </span>
                  Play
                </button>

                <button className="btn-secondary btn-watch-later" onClick={handleWatchLater}>
                  <span className="btn-icon">
                    <i className="fas fa-clock"></i>
                  </span>
                  Watch Later
                </button>
              </div> */}
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
            </div>{" "}
          </div>

          {/* Cast Tab */}
          <div
            id="cast"
            className={`tab-content ${activeTab === "cast" ? "active" : ""}`}
          >
            <div className="cast-grid">
              {movieData.credits &&
                movieData.credits.cast.slice(0, 8).map((actor) => (
                  CastCard(actor)
                ))}
            </div>
          </div>
          {/* {} */}

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
                        <MovieCard movie={movie} index={index} isMovie={movie.title?'movie':'tv'} />
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
                  <i className="fa-solid fa-comment-slash fa-3x mb-3 text-muted"></i>
                  <h3>No Reviews Yet</h3>
                  <p>
                    Be the first to review this {isMovie ? "movie" : "show"}!
                  </p>
                </div>
              </div>
            ) : (
              <div className="reviews-container">
                {movieData.reviews.results.slice(0, 10).map((review, index) => {
                  const reviewDate = new Date(review.created_at);
                  const formattedDate = reviewDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });

                  // Extract rating if available
                  const ratingMatch = review.content.match(
                    /Rating:\s*(\d+(\.\d+)?)\s*\/\s*10/i
                  );
                  const rating = ratingMatch
                    ? parseFloat(ratingMatch[1])
                    : null;

                  // Handle long reviews with read more/less
                  const isLongReview = review.content.length > 300;
                  const shortContent = isLongReview
                    ? review.content.substring(0, 300) + "..."
                    : review.content;

                  return (
                    <div className="review-card" key={review.id || index}>
                      <div className="review-header">
                        <div className="reviewer-info">
                          <div className="avatar">
                            <i className="fa-solid fa-user"></i>
                          </div>
                          <div className="reviewer-details">
                            <h4 className="reviewer-name">{review.author}</h4>
                            <span className="review-date">{formattedDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="review-body">
                        {isLongReview ? (
                          <ReviewContent content={review.content} />
                        ) : (
                          <p>{review.content}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
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
                    placeholder="Share your thoughts about this movie...
                    "
                    // style={{}}
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
    </>
  );
};

// Component for handling expandable review content
const ReviewContent = ({ content }) => {
  const [expanded, setExpanded] = useState(false);
  const shortContent = content.substring(0, 300) + "...";

  return (
    <>
      {expanded ? (
        <>
          <p>{content}</p>
          <button className="btn-read-less" onClick={() => setExpanded(false)}>
            Read less
          </button>
        </>
      ) : (
        <>
          <p>{shortContent}</p>
          <button className="btn-read-more" onClick={() => setExpanded(true)}>
            Read more
          </button>
        </>
      )}
    </>
  );
};

export default MovieDetails;


