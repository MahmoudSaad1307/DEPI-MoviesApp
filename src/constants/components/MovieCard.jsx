import { Link } from "react-router-dom";
import { getGenreNames, IMAGE_URL } from "../constants";
import { useState } from "react";

export default function MovieCard(props) {
  const { movie, index, hoverWindow = false, isMovie = false } = props;
  const [loading, setLoading] = useState(false);

  const genreNames = getGenreNames(movie.genre_ids, movie).slice(0, 3);

  const media_type = isMovie === "movie" ? "movie" : "tv";
  const title = media_type === "movie" ? movie.title : movie.name;
  const year =
    movie.release_date?.substring(0, 4) ||
    movie.first_air_date?.substring(0, 4) ||
    "";

  return (
    <>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <ClipLoader color={"var(--secondary-color)"} size={60} />
        </div>
      ) : (
        <Link
          to={`/movie-details/${media_type}/${movie.id}`}
          className="movie-card-link"
        >
          <div className="movie-card">
            <img src={IMAGE_URL + movie.poster_path} alt={title} />
            <div className="overlay"></div>
            <div className="rating">
              <i className="fa-solid fa-star"></i>{" "}
              {typeof movie.vote_average === "number" &&
                movie.vote_average.toFixed(1)}
            </div>

            {index % 3 === 0 && <div className="top-badge">TOP 10</div>}

            {hoverWindow && (
              <div className="movie-detail">
                <div className="detail-backdrop">
                  <img
                    src={IMAGE_URL + (movie.backdrop_path || movie.poster_path)}
                    alt={title}
                  />{" "}
                  <div className="detail-title">{title}</div>
                </div>
                <div className="detail-info">
                  <div className="detail-meta">
                    <div className="detail-rating">
                      <i
                        className="fa-solid fa-star"
                        style={{ color: "gold" }}
                      ></i>{" "}
                      {typeof movie.vote_average === "number" &&
                      isFinite(movie.vote_average)
                        ? movie.vote_average.toFixed(1)
                        : "N/A"}
                    </div>
                    <div className="detail-year-time">{year}</div>
                  </div>
                  <div className="detail-tags">
                    {genreNames.map((name) => (
                      <span className="tag" key={name}>
                        {name}
                      </span>
                    ))}
                    <span className="tag">
                      {media_type === "movie" ? "MOVIE" : "TV"}
                    </span>
                  </div>
                  <div className="detail-description">
                    {movie.overview.slice(0, 300) ||
                      "No description available."}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="movie-title">{title}</div>
        </Link>
      )}
    </>
  );
}
