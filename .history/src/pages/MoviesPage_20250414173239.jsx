// src/pages/MoviesPage.jsx
import React from "react";
import "./MoviesPage.css";
import MovieCard from "../constants/components/MovieCard";

const MoviesPage = () => {
  const filmCategories = {
    popular: [
      { id: 1, title: "A Minecraft Movie", year: 2025, image: "src/assets/images/minecraftimage.jpg", description: "An epic adventure in the world of Minecraft.", rating: "8.5/10" },
      { id: 2, title: "Mickey 17", year: 2023, image: "src/assets/images/mickey 17.jpg", description: "A thrilling sci-fi adventure.", rating: "7.8/10" },
      { id: 3, title: "Adolescence", year: 2024, image: "src/assets/images/adolesence.jpg", description: "A coming-of-age story.", rating: "9.0/10" },
      { id: 4, title: "Finding Nemo", year: 2003, image: "src/assets/images/finding nemo.jpg", description: "A fish's journey to find his son.", rating: "8.1/10" },

    ],
    family: [
      { id: 8, title: "The Incredibles", year: 2004, image: "src/assets/images/the incredibles.jpg", description: "A family of superheroes must hide their powers.", rating: "8.0/10" },
      { id: 9, title: "Zootopia", year: 2016, image: "src/assets/images/zotopia.jpg", description: "A bunny cop and a cynical con artist fox must work together.", rating: "8.0/10" },
      { id: 10, title: "Moana", year: 2016, image: "src/assets/images/moana.jpg", description: "A young girl sets sail on a daring mission to save her people.", rating: "7.6/10" },
    ],
    topRated: [
      { id: 11, title: "The Shawshank Redemption", year: 1994, image: "src/assets/images/theshawnhank.jpg", description: "Two imprisoned men bond over a number of years.", rating: "9.3/10" },
      { id: 12, title: "The Godfather", year: 1972, image: "src/assets/images/thegodfathe.jpg", description: "An organized crime dynasty's aging patriarch transfers control.", rating: "9.2/10" },
      { id: 13, title: "Schindler's List", year: 1993, image: "src/assets/images/shniderslist.webp", description: "In German-occupied Poland during World War II, industrialist Oskar Schindler saves the lives of more than a thousand Jewish refugees.", rating: "8.9/10" },
    ],
    becauseYouWatched: [
      { id: 14, title: "Inception", year: 2010, image: "src/assets/images/inception.jpg", description: "A thief who steals corporate secrets through the use of dream-sharing technology.", rating: "8.8/10" },
      { id: 15, title: "The Dark Knight", year: 2008, image: "src/assets/images/the darknight.jpg", description: "When the menace known as the Joker emerges from his mysterious past.", rating: "9.0/10" },
      { id: 16, title: "Interstellar", year: 2014, image: "src/assets/images/interstellar.jpg", description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", rating: "8.6/10" },
    ],
  };

  const popularReviews = [
    { id: 1, reviewer: "Ahmed Khaled", text: "One of the best animations I've ever seen! Loved every second.", movie: "Toy Story" },
    { id: 2, reviewer: "Mona Tarek", text: "Inception blew my mind! The plot twists were absolutely genius.", movie: "Inception" },
    { id: 3, reviewer: "Youssef Ali", text: "Shawshank Redemption is not just a film, it's a life lesson.", movie: "The Shawshank Redemption" },
  ];

  return (
    <main className="container my-5">
      <h1 className="text-center mb-4">🎬 Explore Movies</h1>

      {Object.entries(filmCategories).map(([category, films]) => (
        <section key={category} className="mb-5">
          <h2 className="text-capitalize">{category.replace(/([A-Z])/g, " $1")}</h2>
          <div className="film-list">
            {films.map((film) => (
              MovieCard()
            ))}
          </div>
        </section>
      ))}

      <section className="mb-5">
        <h2>Popular Reviews</h2>
        <div className="review-list">
          {popularReviews.map((review) => (
            <div className="review-card" key={review.id}>
              <h5>{review.movie}</h5>
              <p>"{review.text}"</p>
              <span>- {review.reviewer}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default MoviesPage;
