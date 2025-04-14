import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  API_KEY,
  BASE_URL,
  BACKDROP_PATH,
  IMAGE_URL,
} from "../constants/constants";
import "./MoviesPage.css";
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
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("cast");

  useEffect(() => {
    console.log(id);
    const fetchMovieDetails = async () => {
      try {
        if (!id) {
          throw new Error("No movie ID provided");
        }

        const response = await fetch(
          `${BASE_URL}/${
            isMovie ? "movie" : "tv"
          }/${id}?api_key=${API_KEY}&append_to_response=credits,recommendations,videos,reviews`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }

        const data = await response.json();
        setMovie(data);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, isMovie]);

  const findBestTrailer = (videos) => {
    if (!videos || videos.length === 0) return null;

    const trailers = videos.filter(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    );

    return trailers.length > 0 ? trailers[0] : null;
  };

  const handlePlayClick = () => {
    if (!movie?.videos?.results) return;

    const trailer = findBestTrailer(movie.videos.results);
    if (trailer) {
      window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
    }
  };

  const handleWatchLater = () => {
    const user = localStorage.getItem("user");
    if (user) {
      alert("Added to watch later list successfully");
    } else {
      alert("Please sign in first");
    }
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getDirector = () => {
    if (!movie?.credits?.crew) return "Unknown";

    const director = movie.credits.crew.find(
      (person) => person.job === "Director"
    );
    return director ? director.name : "Unknown";
  };

  const getMainCast = () => {
    if (!movie?.credits?.cast) return "Unknown";

    return movie.credits.cast
      .slice(0, 3)
      .map((actor) => actor.name)
      .join(", ");
  };

  const renderCastGrid = () => {
    if (!movie?.credits?.cast) return null;

    return (
      <div className="cast-grid">
        {movie.credits.cast.slice(0, 8).map((actor) => (
          <div key={actor.id} className="cast-card">
            <a href={`/actor/${actor.id}`}>
              <img
                src={
                  actor.profile_path
                    ? `${IMAGE_URL}${actor.profile_path}`
                    : "/placeholder-image.jpg"
                }
                alt={actor.name}
                className="cast-img"
              />
            </a>
            <div className="cast-info">
              <h3 className="cast-name">{actor.name}</h3>
              <p className="cast-character">{actor.character}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderRecommendedMovies = () => {
    if (!movie?.recommendations?.results) return null;

    return (
      <div className="row movie-cards">
        {movie.recommendations.results.slice(0, 6).map((movie, index) => (
          <div
            key={index}
            className="col-md-3 col-sm-6 col-lg-2 movie-container"
          >
            <img{...movie} />
          </div>
        ))}
      </div>
    );
  };

  const renderReviews = () => {
    if (!movie?.reviews?.results || movie.reviews.results.length === 0) {
      return (
        <div className="no-reviews">
          <div className="text-center py-5">
            <FontAwesomeIcon
              icon={faCommentSlash}
              size="3x"
              className="mb-3 text-muted"
            />
            <h3>No Reviews Yet</h3>
            <p>Be the first to review this {isMovie ? "movie" : "show"}!</p>
          </div>
        </div>
      );
    }

    return (
      <div className="reviews-container">
        {movie.reviews.results.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    );
  };

  const ReviewCard = ({ review }) => {
    const [expanded, setExpanded] = useState(false);
    const needsTruncation = review.content.length > 300;

    const reviewDate = new Date(review.created_at);
    const formattedDate = reviewDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const ratingMatch = review.content.match(
      /Rating:\s*(\d+(\.\d+)?)\s*\/\s*10/i
    );
    const rating = ratingMatch ? parseFloat(ratingMatch[1]) : null;

    const content =
      needsTruncation && !expanded
        ? `${review.content.substring(0, 300)}...`
        : review.content;

    return (
      <div className="review-card">
        <div className="review-header">
          <div className="reviewer-info">
            <div className="avatar">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="reviewer-details">
              <h4 className="reviewer-name">{review.author}</h4>
              <span className="review-date">{formattedDate}</span>
            </div>
          </div>
          {rating && (
            <div className="review-rating">
              <FontAwesomeIcon icon={faStar} /> {rating.toFixed(1)}/10
            </div>
          )}
        </div>
        <div className="review-body">
          <p>{content}</p>
          {needsTruncation && (
            <button
              className="btn-read-more"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Read less" : "Read more"}
            </button>
          )}
        </div>
        <div className="review-footer">
          <a
            href={review.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-view-original"
          >
            <FontAwesomeIcon icon={faExternalLink} /> View Original
          </a>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="movie-container container">
        <div className="container-fluid px-4">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-container container">
        <div className="container-fluid px-4">
          <h1>Error</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-container container">
        <div className="container-fluid px-4">
          <h1>Movie Not Found</h1>
          <p>Please select a movie from the homepage.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-details-page">
      {/* Movie Info Section */}
      <div className="movie-container container">
        <div
          className="movie-backdrop"
          style={{
            backgroundImage: `url(${BACKDROP_PATH}${movie.backdrop_path})`,
          }}
        />
        <div
          className="movie-poster"
          style={{
            backgroundImage: `url(${BACKDROP_PATH}${movie.backdrop_path})`,
          }}
        />

        <div className="container-fluid px-4">
          <div className="row movie-header">
            <div className="col-lg-7">
              <h1 className="movie-title">
                {isMovie ? movie.title : movie.name}
              </h1>

              <div className="movie-rating">
                <span className="rating-star">
                  <FontAwesomeIcon icon={faStar} />
                </span>
                <span className="fw-bold">{movie.vote_average.toFixed(1)}</span>
              </div>

              <div className="movie-info">
                <span>{isMovie ? "Movie" : "TV Show"}</span>
                <span>
                  {new Date(
                    isMovie ? movie.release_date : movie.first_air_date
                  ).getFullYear()}
                </span>
                <span>{formatRuntime(movie.runtime)}</span>
              </div>

              <div className="movie-tags">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="movie-tag">
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="movie-meta">
                <span className="meta-label">Director:</span>
                <span className="director-name">{getDirector()}</span>
              </div>

              <div className="movie-description">
                <span className="meta-label">Description:</span>
                <span id="description-text">{movie.overview}</span>
              </div>

              <div className="action-buttons">
                <button className="btn-play" onClick={handlePlayClick}>
                  <span className="btn-icon">
                    <FontAwesomeIcon icon={faPlay} />
                  </span>
                  Play
                </button>

                <button className="btn-secondary" onClick={handleWatchLater}>
                  <span className="btn-icon">
                    <FontAwesomeIcon icon={faClock} />
                  </span>
                  Watch Later
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="tabs-section container">
        <div className="container-fluid px-4">
          <div className="tabs">
            <div
              className={`tab ${activeTab === "cast" ? "active" : ""}`}
              onClick={() => setActiveTab("cast")}
              data-tab="cast"
            >
              Cast
            </div>
            <div
              className={`tab ${activeTab === "recommended" ? "active" : ""}`}
              onClick={() => setActiveTab("recommended")}
              data-tab="recommended"
            >
              Recommended
            </div>
            <div
              className={`tab ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => setActiveTab("reviews")}
              data-tab="reviews"
            >
              Reviews
            </div>
          </div>

          <div
            id="cast"
            className={`tab-content ${activeTab === "cast" ? "active" : ""}`}
          >
            {renderCastGrid()}
          </div>

          <div
            id="recommended"
            className={`tab-content ${
              activeTab === "recommended" ? "active" : ""
            }`}
          >
            {renderRecommendedMovies()}
          </div>

          <div
            id="reviews"
            className={`tab-content ${activeTab === "reviews" ? "active" : ""}`}
          >
            {renderReviews()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;