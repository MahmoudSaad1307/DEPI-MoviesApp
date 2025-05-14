import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./../constants/components/MovieCard";
import { fetchMovies, ENDPOINTS } from "../constants/constants";

const NowPlaying = () => {
  const getMoviesPerSlide = () => {
    const width = window.innerWidth;
    if (width <= 576) return 2;
    if (width <= 768) return 3;
    if (width <= 992) return 4;
    if (width <= 1200) return 5;
    return 6;
  };

  const getColumnClasses = () => {
    const width = window.innerWidth;
    if (width <= 576) return "col-6";
    if (width <= 768) return "col-4";
    if (width <= 992) return "col-3";
    if (width <= 1200) return "col-2";
    return "col-2";
  };

  const [movies, setMovies] = useState([]);
  const [moviesPerSlide, setMoviesPerSlide] = useState(getMoviesPerSlide());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchMovies(ENDPOINTS.movies.nowPlaying, "", 1);
        if (data && data.results) {
          setMovies(data.results.slice(0, 18));
        }
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlayingMovies();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setMoviesPerSlide(getMoviesPerSlide());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return (
      <div className="container d-flex justify-content-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="multi-card-carousel ">
      <h2 className="carousel-title">Now Playing</h2>
      <div
        id="NowPlayingMoviesCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-touch="true"
      >
        <div className="carousel-inner">
          {Array.from({
            length: Math.ceil(movies.length / moviesPerSlide),
          }).map((_, slideIndex) => {
            const isActive = slideIndex === 0 ? "active" : "";
            return (
              <div
                className={`carousel-item ${isActive}`}
                key={`slide-${slideIndex}`}
              >
                <div className="row g-3">
                  {movies
                    .slice(
                      slideIndex * moviesPerSlide,
                      slideIndex * moviesPerSlide + moviesPerSlide
                    )
                    .map((movie, subIndex) => (
                      <div
                        className={getColumnClasses()}
                        key={`movie-${movie.id}-${subIndex}`}
                      >
                        <MovieCard
                          movie={movie}
                          index={subIndex}
                          isMovie={"movie"}
                          hoverWindow={true}
                        />
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#NowPlayingMoviesCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#NowPlayingMoviesCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default NowPlaying;