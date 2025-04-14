import React, { useState, useEffect } from "react";

const Popular = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(6);

    const movies = [
        {
            id: 1,
            title: "Fields of Destiny",
            year: "2020",
            genre: "Action",
            image: "src\\assets\\images\\movie1.jpeg",
        },
        {
            id: 2,
            title: "1917",
            year: "2020",
            genre: "Drama",
            image: "src\\assets\\images\\movie2.jpeg",
        },
        {
            id: 3,
            title: "John Wick",
            year: "2020",
            genre: "Action",
            image: "src\\assets\\images\\movie3.jpeg",
        },
        {
            id: 4,
            title: "The Matrix",
            year: "2021",
            genre: "Sci-fi",
            image: "src\\assets\\images\\movie4.jpeg",
        },
        {
            id: 5,
            title: "Inception",
            year: "2020",
            genre: "Thriller",
            image: "src\\assets\\images\\movie5.jpeg",
        },
        {
            id: 6,
            title: "Interstellar",
            year: "2020",
            genre: "Sci-fi",
            image: "src\\assets\\images\\movie6.jpeg",
        },
    ];

    useEffect(() => {
        const handleResize = () => {
            setCardsPerView(window.innerWidth <= 768 ? 2 : 6);
        };

        handleResize(); // Set initial value
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex - cardsPerView;
            return newIndex < 0 ? 0 : newIndex;
        });
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex + cardsPerView;
            const maxIndex = movies.length - cardsPerView;
            return newIndex > maxIndex ? maxIndex : newIndex;
        });
    };

    return (
        <>
            <div className="multi-card-carousel">
                <h2 className="carousel-title">Popular Movies</h2>
                <div className="card-carousel-container">
                    <button
                        className="carousel-arrow left"
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                    >
                        <i className="bi bi-arrow-left-short"></i>
                    </button>

                    <div className="card-carousel">
                        {movies.map((movie, index) => (
                          <Link
                          to={`/movie-details/${movie.media_type}/${movie.id}`}
                          className="movie-card-link"
                        >
                            <div
                                key={movie.id}
                                className='movie-card'
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

                    <button
                        className="carousel-arrow right"
                        onClick={handleNext}
                        disabled={currentIndex >= movies.length - cardsPerView}
                    >
                        <i className="bi bi-arrow-right-short"></i>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Popular;
