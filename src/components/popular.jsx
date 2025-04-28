import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./../constants/components/MovieCard";
import { fetchMovies, ENDPOINTS } from "../constants/constants";

const Popular = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const data = await fetchMovies(ENDPOINTS.movies.popular, "", 1);
      if (data && data.results) {
        setMovies(data.results.slice(0, 18)); // Fetch 18 movies to create multiple slides
      }
    };

    fetchPopularMovies();
  }, []);

  const getMoviesPerSlide = () => {
    const isMobile = window.innerWidth <= 768; // Check if the screen width is mobile size
    return isMobile ? 2 : 6; // 2 movies per slide for mobile, 6 for larger screens
  };

  const moviesPerSlide = getMoviesPerSlide();

  return (
    <div className="multi-card-carousel">
      <h2 className="carousel-title">Popular Movies</h2>
      <br />
      <div id="popularMoviesCarousel" className="carousel">
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
                <div className="row">
                  {movies
                    .slice(
                      slideIndex * moviesPerSlide,
                      slideIndex * moviesPerSlide + moviesPerSlide
                    )
                    .map((movie, subIndex) => (
                      <div
                        className="col-6 col-md-4 col-lg-2"
                        key={`movie-${movie.id}-${subIndex}`}
                      >
                        <MovieCard movie={movie} index={subIndex} />
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
          data-bs-target="#popularMoviesCarousel"
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
          data-bs-target="#popularMoviesCarousel"
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

export default Popular;
