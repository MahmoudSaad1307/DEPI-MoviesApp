import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleFavorite,
  toggleWatched,
  toggleWatchlist,
} from "../../../Backend/api/api";
import "../../pages/AddToList.css";
import {
  setFavorites,
  setWatched,
  setWatchlist,
} from "../../redux/slices/userMoviesSlice";
import "./InteractionPanel.css";
import { setTrailer } from "../../redux/slices/trailerSlice";

export default function InteractionPanel({
  showModal,
  setShowModal,
  movieId,
  media_type,
}) {
  movieId = Number(movieId);
  const { favorites, watchlist, watched } = useSelector(
    (state) => state.userMovies
  );
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // Check if movie exists in user lists
  const isInFavorites = favorites.favorites?.includes(movieId);
  const isInWatchlist = watchlist.watchlist?.some(
    (item) => item.movieId === movieId
  );
  let isInWatched = watched.watched?.some((item) => item.movieId === movieId);

  const [activeRating, setActiveRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(null);
  console.log(``);
  useEffect(() => {
    if (isInWatched) {
      const watchedItem = watched.watched?.find(
        (item) => item.movieId === movieId
      );
      if (watchedItem?.ratingProvided) {
        setActiveRating(watchedItem.rating);
      }
    }
  }, [isInWatched, watched.watched, movieId]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const effectiveRating = hoveredRating !== null ? hoveredRating : activeRating;

  const toggleButton = async (buttonName) => {
    let response;

    if (buttonName === "watched") {
      try {
        response = await toggleWatched({ userId: user._id, movieId });
        if (isInWatched) setActiveRating(0);
        dispatch(setWatched({ watched: response.data.watched }));
      } catch (error) {
        console.log(error);
      }
    } else if (buttonName === "favorite") {
      try {
        response = await toggleFavorite({ userId: user._id, movieId });
        dispatch(setFavorites({ favorites: response.data.favorites }));
      } catch (error) {
        console.log(error);
      }
    } else if (buttonName === "watchLater") {
      try {
        response = await toggleWatchlist({ userId: user._id, movieId });
        dispatch(setWatchlist({ watchlist: response.data.watchlist }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleRatingClick = async (segmentScore) => {
    try {
      const response = await toggleWatched({
        userId: user._id,
        movieId,
        ratingProvided: true,
        rating: segmentScore,
      });
      isInWatched = true;
      dispatch(setWatched({ watched: response.data.watched }));
      setActiveRating(segmentScore);
    } catch (error) {
      console.log(error);
    }
  };

  const getSegmentClass = (segmentScore) => {
    if (segmentScore > effectiveRating) {
      return "segment"; 
    }

    if (effectiveRating < 4) {
      return "segment segment-low"; 
    } else if (effectiveRating < 7) {
      return "segment segment-medium"; 
    } else {
      return "segment segment-high"; 
    }
  };

  return (
    <div className="movie-actions-container">
      {user ? (
        <>
          <div className="action-buttons">
            <button
              className={`action-btn mx-1 my-1 ${isInWatched ? "active" : ""}`}
              onClick={() => toggleButton("watched")}
            >
              <i className="fa-solid fa-eye"></i> Watched
            </button>

            <button
              className="action-btn mx-1 my-1 "
              onClick={() => dispatch(setTrailer())}
            >
              <i className="fas fa-film"></i> Watch Trailer
            </button>

            <button
              className={`action-btn mx-1 my-1 ${
                isInWatchlist ? "active" : ""
              }`}
              onClick={() => toggleButton("watchLater")}
            >
              <i className="fas fa-clock"></i> Watch Later
            </button>

            <button
              style={{
                background: isInFavorites && "#FA0845",
              }}
              className={`action-btn mx-1 my-1 `}
              onClick={() => toggleButton("favorite")}
            >
              <i className="fas fa-heart"></i> Favorite
            </button>
          </div>

          <div className="score-container">
            <div className="score-bar">
              {[...Array(10)].map((_, i) => {
                const segmentScore = i + 1;
                return (
                  <div
                    key={segmentScore}
                    className={getSegmentClass(segmentScore)}
                    onMouseEnter={() => setHoveredRating(segmentScore)}
                    onMouseLeave={() => setHoveredRating(null)}
                    onClick={() => handleRatingClick(segmentScore)}
                  >
                    {i < 9 && <div className="segment-divider"></div>}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="user-rating">
            <span>
              Your Rating:{" "}
              <span className="your-rating">
                {hoveredRating
                  ? `${hoveredRating}/10`
                  : activeRating
                  ? `${activeRating}/10`
                  : "Not Rated"}
              </span>
            </span>
          </div>
        </>
      ) : (
        <div>Please log in to interact with this movie.</div>
      )}
    </div>
  );
}
