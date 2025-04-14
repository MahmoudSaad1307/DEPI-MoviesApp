import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  API_KEY,
  BASE_URL,
  BACKDROP_PATH,
  IMAGE_URL,
  ENDPOINTS
} from "../constants/constants";
import "./MovieDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faPlay,
  faClock,
  faCommentSlash,
  faUser,
  faExternalLink,
} from "@fortawesome/free-solid-svg-icons";

const MovieDetails = () => {
  const { id, media_type } = useParams();
  const isMovie = media_type === "movie";
  const [movieData, setMovieData] = useState(null);
  const [activeTab, setActiveTab] = useState("cast");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    return <div classNameName="container text-center my-5">Loading movie details...</div>;
  }

  if (error) {
    return <div classNameName="container text-center my-5 text-danger">Error: {error}</div>;
  }

  if (!movieData) {
    return <div classNameName="container text-center my-5">No movie data available</div>;
  }

  // Get best trailer
  const bestTrailer = movieData.videos ? findBestTrailer(movieData.videos.results) : null;
  
  // Find director
  const director = isMovie && movieData.credits 
    ? movieData.credits.crew.find(person => person.job === "Director")?.name || "Unknown" 
    : "Unknown";
  
  // Get main cast for summary
  const mainCast = movieData.credits 
    ? movieData.credits.cast.slice(0, 3).map(actor => actor.name).join(", ") 
    : "Unknown";

  return (
    <>
      {/* Movie Info Section */}
      <div classNameName="movie-container container">
        {movieData.backdrop_path && (
          <div classNameName="movie-poster" style={{ backgroundImage: `url(${BACKDROP_PATH}${movieData.backdrop_path})` }}></div>
        )}

        <div classNameName="container-fluid px-4">
          <div classNameName="row movie-header">
            <div classNameName="col-lg-7">
              <h1 classNameName="movie-title">{isMovie ? movieData.title : movieData.name}</h1>

              <div classNameName="movie-rating">
                <span classNameName="rating-star"><i classNameName="fas fa-star"></i></span>
                <span classNameName="fw-bold">{movieData.vote_average.toFixed(1)}</span>
              </div>

              <div classNameName="movie-info">
                <span>{new Date(isMovie ? movieData.release_date : movieData.first_air_date).getFullYear()}</span>
                {movieData.runtime && <span>{formatRuntime(movieData.runtime)}</span>}
              </div>

              <div classNameName="movie-tags">
                {movieData.genres && movieData.genres.map((genre) => (
                  <span key={genre.id} classNameName="movie-tag">{genre.name}</span>
                ))}
              </div>

              <div classNameName="movie-meta">
                <span classNameName="meta-label">Director:</span>
                <span classNameName="director-name">{director}</span>
              </div>

              <div classNameName="movie-meta">
                <span classNameName="meta-label">Cast:</span>
                <span>{mainCast}</span>
              </div>

              <div classNameName="movie-description">
                <span classNameName="meta-label">Description:</span>
                <span id="description-text">{movieData.overview}</span>
              </div>

              <div classNameName="action-buttons">
                <button 
                  classNameName="btn-play"
                  onClick={() => bestTrailer && window.open(`https://www.youtube.com/watch?v=${bestTrailer.key}`, "_blank")}
                >
                  <span classNameName="btn-icon"><i classNameName="fas fa-play"></i></span>
                  Play
                </button>

                <button classNameName="btn-secondary" onClick={handleWatchLater}>
                  <span classNameName="btn-icon"><i classNameName="fas fa-clock"></i></span>
                  Watch Later
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div classNameName="tabs-section container">
        <div classNameName="container-fluid px-4">
          <div classNameName="tabs">
            <div 
              classNameName={`tab ${activeTab === "cast" ? "active" : ""}`} 
              onClick={() => setActiveTab("cast")}
            >
              Cast
            </div>
            <div 
              classNameName={`tab ${activeTab === "recommended" ? "active" : ""}`}
              onClick={() => setActiveTab("recommended")}
            >
              Recommended
            </div>
            <div 
              classNameName={`tab ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </div>
          </div>
          
          {/* Cast Tab */}
          <div id="cast" classNameName={`tab-content ${activeTab === "cast" ? "active" : ""}`}>
            <div classNameName="cast-grid">
              {movieData.credits && movieData.credits.cast.slice(0, 8).map((actor) => (
                <div classNameName="cast-card" key={actor.id}>
                  <a href={`/actor?id=${actor.id}`}>
                    <img 
                      src={actor.profile_path ? `${IMAGE_URL}${actor.profile_path}` : "/placeholder-image.jpg"} 
                      alt={actor.name} 
                      classNameName="cast-img"
                    />
                  </a>
                  <div classNameName="cast-info">
                    <h3 classNameName="cast-name">{actor.name}</h3>
                    <p classNameName="cast-character">{actor.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Tab */}
          <div id="recommended" classNameName={`tab-content ${activeTab === "recommended" ? "active" : ""}`}>
            <div classNameName="row movie-cards">
              {movieData.recommendations && movieData.recommendations.results.slice(0, 6).map((movie, index) => (
                <div classNameName="col-md-3 col-sm-6 col-lg-2 movie-container" key={movie.id}>
                  <div classNameName="movie-card">
                  <a href="./movie-details.html?id=${movie.id}&media_type=${
    movie.media_type
  }" className="movie-card-link">
    <div className="movie-card">
      <div className="image-container">
        <img src="${IMAGE_URL + movie.poster_path}" alt="${
    movie.media_type === "movie" ? movie.title : movie.name
  }">
        <div className="overlay"></div>
        <div className="rating"><i className="fa-solid fa-star"></i> ${movie.vote_average.toFixed(
          1
        )}</div>
      </div>
      ${index % 3 == 0 ? '<div className="top-badge">TOP 10</div>' : ""}
    </div>
    <div className="movie-title">${
      movie.media_type === "movie" ? movie.title : movie.name
    }</div>
    
    <!-- Movie detail hover overlay (Only shown if hoverWindow is true) -->
    ${
      hoverWindow
        ? `<div className="movie-detail">
            <div className="detail-backdrop">
              <img src="${IMAGE_URL + movie.backdrop_path}" alt="${
            movie.media_type === "movie" ? movie.title : movie.name
          }">
              <div className="detail-title">${
                movie.media_type === "movie" ? movie.title : movie.name
              }</div>
            </div>
            <div className="detail-info">
              <div className="detail-meta">
                <div className="detail-rating"><i className="fa-solid fa-star"></i> ${movie.vote_average.toFixed(
                  1
                )}</div>
                <div className="detail-year-time">${
                  movie.release_date?.substring(0, 4) ||
                  movie.first_air_date?.substring(0, 4) ||
                  ""
                }</div>
              </div>
              <div className="detail-tags">
                ${genreNames
                  .map((name) => `<span className="tag">${name}</span>`)
                  .join("")}
                <span className="tag">${
                  movie.media_type === "movie" ? "MOVIE" : "TV"
                }</span>
              </div>
              <div className="detail-description">${
                movie.overview || "No description available."
              }</div>
            </div>
          </div>`
        : ""
    }
  </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Tab */}
          <div id="reviews" classNameName={`tab-content ${activeTab === "reviews" ? "active" : ""}`}>
            {(!movieData.reviews || movieData.reviews.results.length === 0) ? (
              <div classNameName="no-reviews">
                <div classNameName="text-center py-5">
                  <i classNameName="fa-solid fa-comment-slash fa-3x mb-3 text-muted"></i>
                  <h3>No Reviews Yet</h3>
                  <p>Be the first to review this {isMovie ? "movie" : "show"}!</p>
                </div>
              </div>
            ) : (
              <div classNameName="reviews-container">
                {movieData.reviews.results.map((review, index) => {
                  const reviewDate = new Date(review.created_at);
                  const formattedDate = reviewDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });

                  // Extract rating if available
                  const ratingMatch = review.content.match(/Rating:\s*(\d+(\.\d+)?)\s*\/\s*10/i);
                  const rating = ratingMatch ? parseFloat(ratingMatch[1]) : null;

                  // Handle long reviews with read more/less
                  const isLongReview = review.content.length > 300;
                  const shortContent = isLongReview ? review.content.substring(0, 300) + "..." : review.content;

                  return (
                    <div classNameName="review-card" key={review.id || index}>
                      <div classNameName="review-header">
                        <div classNameName="reviewer-info">
                          <div classNameName="avatar">
                            <i classNameName="fa-solid fa-user"></i>
                          </div>
                          <div classNameName="reviewer-details">
                            <h4 classNameName="reviewer-name">{review.author}</h4>
                            <span classNameName="review-date">{formattedDate}</span>
                          </div>
                        </div>
                        {rating && (
                          <div classNameName="review-rating">
                            <i classNameName="fa-solid fa-star"></i> {rating.toFixed(1)}/10
                          </div>
                        )}
                      </div>
                      <div classNameName="review-body">
                        {isLongReview ? (
                          <ReviewContent content={review.content} />
                        ) : (
                          <p>{review.content}</p>
                        )}
                      </div>
                      <div classNameName="review-footer">
                        <a href={review.url} target="_blank" rel="noopener noreferrer" classNameName="btn-view-original">
                          <i classNameName="fa-solid fa-external-link"></i> View Original
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
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
          <button classNameName="btn-read-less" onClick={() => setExpanded(false)}>Read less</button>
        </>
      ) : (
        <>
          <p>{shortContent}</p>
          <button classNameName="btn-read-more" onClick={() => setExpanded(true)}>Read more</button>
        </>
      )}
    </>
  );
};

export default MovieDetails;