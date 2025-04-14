import React, { useState, useEffect } from "react";

const TopPicks = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const topPicksMovies = [
    {
      id: 1,
      title: "Breaking Bad",
      year: "2008",
      genre: "Drama",
      image: "src\\assets\\images\\breakingbad.jpg",
    },
    {
      id: 2,
      title: "Stranger Things",
      year: "2016",
      genre: "Sci-Fi",
      image: "src\\assets\\images\\stranger things.jpg",
    },
    {
      id: 3,
      title: "The Crown",
      year: "2016",
      genre: "Drama",
      image: "src\\assets\\images\\topPicks2.jpeg",
    },
    {
      id: 4,
      title: "Dark",
      year: "2017",
      genre: "Mystery",
      image: "src\\assets\\images\\topPicks3.jpeg",
    },
    {
      id: 5,
      title: "Money Heist",
      year: "2017",
      genre: "Crime",
      image: "src\\assets\\images\\topPicks4.jpeg",
    },
    {
      id: 6,
      title: "The Witcher",
      year: "2019",
      genre: "Fantasy",
      image: "src\\assets\\images\\topPicks5.jpeg",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setCurrentIndex(0); // Reset index on resize
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 2));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 2, topPicksMovies.length - 2)
    );
  };

  return (
    <div className="top-picks-section">
      <h2 className="carousel-title">Top Picks For You</h2>
      <div className="card-carousel-container">
        {isMobile && (
          <button
            className="carousel-arrow left"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <i className="bi bi-arrow-left-short"></i>
          </button>
        )}

        <div className="card-carousel">
          {topPicksMovies.map((movie, index) => (
            <div
              key={movie.id}
              className={`movie-card ${
                isMobile && (index < currentIndex || index >= currentIndex + 2)
                  ? "hidden"
                  : ""
              }`}
            >
              <img src={movie.image} alt={movie.title} />
              <div className="movie-card-content">
                <h3 className="movie-card-title">{movie.title}</h3>
                <div className="movie-card-info">
                  <span>{movie.year}</span> • <span>{movie.genre}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isMobile && (
          <button
            className="carousel-arrow right"
            onClick={handleNext}
            disabled={currentIndex >= topPicksMovies.length - 2}
          >
            <i className="bi bi-arrow-right-short"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default TopPicks;