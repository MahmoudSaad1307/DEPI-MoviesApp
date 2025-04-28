import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./../constants/components/MovieCard";
import { fetchMovies, ENDPOINTS } from "../constants/constants";

const TopPicks = () => {
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    const fetchPopularTvShows = async () => {
      const data = await fetchMovies(ENDPOINTS.tv.popular, "", 1);
      if (data && data.results) {
        setTvShows(data.results.slice(0, 18)); // Fetch 18 TV shows to create multiple slides
      }
    };

    fetchPopularTvShows();
  }, []);

  const getTvShowsPerSlide = () => {
    const isMobile = window.innerWidth <= 768; // Check if the screen width is mobile size
    return isMobile ? 2 : 6; // 2 TV shows per slide for mobile, 6 for larger screens
  };

  const tvShowsPerSlide = getTvShowsPerSlide();

  return (
    <div className="top-picks-section">
      <h2 className="carousel-title">Popular TV Shows</h2>
      <br />
      <div id="topPicksCarousel" className="carousel slide">
        <div className="carousel-inner">
          {Array.from({
            length: Math.ceil(tvShows.length / tvShowsPerSlide),
          }).map((_, slideIndex) => {
            const isActive = slideIndex === 0 ? "active" : "";
            return (
              <div
                className={`carousel-item ${isActive}`}
                key={`slide-${slideIndex}`}
              >
                <div className="row">
                  {tvShows
                    .slice(
                      slideIndex * tvShowsPerSlide,
                      slideIndex * tvShowsPerSlide + tvShowsPerSlide
                    )
                    .map((tvShow, subIndex) => (
                      <div
                        className="col-6 col-md-4 col-lg-2"
                        key={`tvShow-${tvShow.id}-${subIndex}`}
                      >
                        <MovieCard movie={tvShow} index={subIndex} />
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
          data-bs-target="#topPicksCarousel"
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
          data-bs-target="#topPicksCarousel"
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

export default TopPicks;
