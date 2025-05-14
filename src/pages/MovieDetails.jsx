import {
  faCommentSlash,
  faExternalLink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { addReview, getMovieReviews } from "../../Backend/api/api";
import CastCard from "../constants/components/CastCard";
import InteractionPanel from "../constants/components/InteractionPanel";
import MovieCard from "../constants/components/MovieCard";
import ReviewCard from "../constants/components/ReviewCard";
import {
  API_KEY,
  BACKDROP_PATH,
  BASE_URL,
  ENDPOINTS,
  IMAGE_URL,
} from "../constants/constants";
import "./MovieDetails.css";
import "./responsive.css";
import "./styles.css";
import { FloatingYouTubePlayer } from "../constants/components/FloatingYouTubePlayer";
import { hideTrailer } from "../redux/slices/trailerSlice";

const MovieDetails = () => {
  const {showTrailer} = useSelector((state) => state.trailer)
  const { user ,token} = useSelector((state) => state.user);
  const { favorites, watchlist, watched } = useSelector(
    (state) => state.userMovies
  );
  const dispatch = useDispatch();

  const [showListModal, setShowListModal] = useState(false);
  const toggleModal = () => {
    if (showListModal) {
      const modalElement = document.querySelector(".modal-dialog");
      if (modalElement) {
        modalElement.classList.remove("animate__fadeInDown");
        modalElement.classList.add("animate__fadeOutUp");
        setTimeout(() => {
          setShowListModal(false);
        }, 300);
      } else {
        setShowListModal(false);
      }
    } else {
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
    console.log(`Added to list with ID: ${listId}`);
    toggleModal();
  };

  const { id, media_type } = useParams();
  const isMovie = media_type === "movie";
  const [movieData, setMovieData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [watchProviders, setWatchProviders] = useState(null);
  const [activeTab, setActiveTab] = useState("cast");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewContent, setReviewContent] = useState("");

  const handleSubmitReview = async () => {
    if (!reviewContent.trim()) {
      alert("Please enter your review");
      return;
    }
    try {
      await addReview({
        userId: user._id,
        type: media_type,
        movieId: id,
        content: { text: reviewContent },
      });
      toast.success("Review added successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: "linear-gradient(to right, #4caf50, #45a049)",
          color: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "300px",
          padding: "12px 20px",
          fontSize: "14px",
        },
      });
    
    } catch (error) {
      console.error("Error adding review:", error);
    }
    finally{

      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    
    setReviewContent("");
    const modal = document.getElementById("addReviewModal");
    if (modal) {
      const bootstrapModal = window.bootstrap.Modal.getInstance(modal);
      if (bootstrapModal) {
        bootstrapModal.hide();
      }
    }
  };

  useEffect(() => {
    dispatch(hideTrailer())
    if (id) {
      fetchMovieDetails();
      getReviews();
    }
  }, [id]);

  const getReviews = async () => {
    try {
      const response = await getMovieReviews({ type: media_type, movieId: id });
      setReviews(response.data);
      console.log("Reviews fetched:", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const endpoint = isMovie
        ? ENDPOINTS.movies.details(id)
        : ENDPOINTS.tv.details(id);
      const watchProviderEndpoint = isMovie
        ? ENDPOINTS.movies.watchProviders(id)
        : ENDPOINTS.tv.watchProviders(id);

      const [detailsResponse, providersResponse] = await Promise.all([
        fetch(
          `${BASE_URL}${endpoint}?api_key=${API_KEY}&append_to_response=credits,recommendations,videos,reviews`
        ),
        fetch(`${BASE_URL}${watchProviderEndpoint}?api_key=${API_KEY}`),
      ]);

      if (!detailsResponse.ok) {
        throw new Error("Failed to fetch movie details");
      }
      if (!providersResponse.ok) {
        console.warn("Failed to fetch watch providers");
      }

      const detailsData = await detailsResponse.json();
      const providersData = providersResponse.ok
        ? await providersResponse.json()
        : { results: {} };

      console.log("Movie data fetched:", detailsData);
      console.log("Watch providers fetched:", providersData);

      setMovieData(detailsData);
      setWatchProviders(providersData.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const findBestTrailer = (videos) => {
    if (!videos || videos.length === 0) return null;
    const trailers = videos.filter(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    );
    return trailers.length > 0 ? trailers[0] : null;
  };

  const handleWatchLater = () => {
    if (localStorage.getItem("user") !== null) {
      alert("Added to watch later list successfully");
    } else {
      alert("Please sign in first");
    }
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} h ${mins} m`;
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <ClipLoader color="var(--secondary-color)" size={60} />
      </div>
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

  const bestTrailer = movieData.videos
    ? findBestTrailer(movieData.videos.results)
    : null;

  const director =
    isMovie && movieData.credits
      ? movieData.credits.crew.find((person) => person.job === "Director")
          ?.name || "Unknown"
      : "Unknown";

  const mainCast = movieData.credits
    ? movieData.credits.cast
        .slice(0, 3)
        .map((actor) => actor.name)
        .join(", ")
    : "Unknown";

  return (
    <>
{showTrailer && (
  <FloatingYouTubePlayer 
    videoId={bestTrailer?.key} 
  
  />
)}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="movie-container container">
        {movieData.backdrop_path && (
          <div
            className="movie-poster"
            style={{
              zIndex: "0",
              backgroundColor: "transparent",
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
                <span style={{ color: "gold" }} className="rating-star">
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
              <InteractionPanel
                showModal={showListModal}
                setShowModal={setShowListModal}
                media_type={media_type}
                movieId={id}
              />
            </div>
          </div>
        </div>
      </div>
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
              className={`tab ${activeTab === "watch" ? "active" : ""}`}
              onClick={() => setActiveTab("watch")}
            >
              Where to Watch
            </div>
            {user && (
              <div
                className="add-review tab"
                data-bs-toggle="modal"
                data-bs-target="#addReviewModal"
              >
                Add Review
              </div>
            )}
          </div>
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
          <div
            id="reviews"
            className={`tab-content ${activeTab === "reviews" ? "active" : ""}`}
          >
            {!reviews || reviews.length === 0 ? (
              <div className="no-reviews">
                <div className="text-center py-5">
                  <FontAwesomeIcon
                    icon={faCommentSlash}
                    className="fa-3x mb-3 text-muted"
                  />
                  <h3>No Reviews Yet</h3>
                  <p>
                    Be the first to review this {isMovie ? "movie" : "show"}!
                  </p>
                </div>
              </div>
            ) : (
              <div className="reviews-container">
                {reviews.slice(0, 10).map((review) => (
                  <ReviewCard review={review} key={review._id} />
                ))}
              </div>
            )}
          </div>
          <div
            id="watch"
            className={`tab-content ${activeTab === "watch" ? "active" : ""}`}
          >
            {watchProviders && watchProviders.EG ? (
              <div className="watch-providers-container">
                <div className="watch-provider-region">
                  <h3>Egypt</h3>
                  <div className="provider-grid">
                    {watchProviders.EG.flatrate &&
                      watchProviders.EG.flatrate.map((provider) => (
                        <div
                          key={provider.provider_id}
                          className="provider-card"
                        >
                          <img
                            src={`${IMAGE_URL}${provider.logo_path}`}
                            alt={provider.provider_name}
                            className="provider-logo"
                          />
                          <span>{provider.provider_name} (Stream)</span>
                        </div>
                      ))}
                    {watchProviders.EG.buy &&
                      watchProviders.EG.buy.map((provider) => (
                        <div
                          key={provider.provider_id}
                          className="provider-card"
                        >
                          <img
                            src={`${IMAGE_URL}${provider.logo_path}`}
                            alt={provider.provider_name}
                            className="provider-logo"
                          />
                          <span>{provider.provider_name} (Buy/Rent)</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="no-providers">
                <div className="text-center py-5">
                  <FontAwesomeIcon
                    icon={faExternalLink}
                    className="fa-3x mb-3 text-muted"
                  />
                  <h3>No Streaming Options Available in Egypt</h3>
                  <p>
                    Streaming options for this {isMovie ? "movie" : "show"} are
                    not available in Egypt.
                  </p>
                </div>
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
    </>
  );
};

export default MovieDetails;
