import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../constants/components/MovieCard";
import { fetchMovies } from "../constants/constants";
import "./CarouselFixes.css"; 

const MultiCardCarousel = ({ 
  title, 
  endpoint, 
  isMovie = true, 
  maxItems = 18
}) => {

  const getItemsPerSlide = () => {
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
  
  const [items, setItems] = useState([]);
  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());
  const [loading, setLoading] = useState(true);
  const carouselId = `${title.replace(/\s+/g, '')}Carousel`;
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchMovies(endpoint, "", 1);
        if (data && data.results) {
          setItems(data.results.slice(0, maxItems));
        }
        console.log(isMovie);
      } catch (error) {
        console.error(`Error fetching ${title}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, maxItems, title]);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
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
    <div className="multi-card-carousel">
      <h2 className="carousel-title">{title}</h2>
      <div
        id={carouselId}
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-touch="true"
      >
        <div className="carousel-inner">
          {Array.from({
            length: Math.ceil(items.length / itemsPerSlide),
          }).map((_, slideIndex) => {
            const isActive = slideIndex === 0 ? "active" : "";
            return (
              <div
                className={`carousel-item ${isActive}`}
                key={`slide-${slideIndex}`}
              >
                <div className="row g-3">
                  {items
                    .slice(
                      slideIndex * itemsPerSlide,
                      slideIndex * itemsPerSlide + itemsPerSlide
                    )
                    .map((item, subIndex) => (
                      <div
                        className={getColumnClasses()}
                        key={`item-${item.id}-${subIndex}`}
                      >
                        <MovieCard
                          movie={item}
                          index={subIndex}
                          hoverWindow={true}
                          isMovie={isMovie}
                          to={`/movie-details/${isMovie?'movie':'tv'}/${item.id}`}
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
          data-bs-target={`#${carouselId}`}
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
          data-bs-target={`#${carouselId}`}
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

export default MultiCardCarousel;