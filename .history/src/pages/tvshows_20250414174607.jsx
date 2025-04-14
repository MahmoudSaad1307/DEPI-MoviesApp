import React from "react";
import "./MoviesPage.css"; // Reusing the same CSS for styling
import MovieCard from "../constants/components/MovieCard";

const TVShowsPage = () => {
  const tvShowCategories = {
    popular: [
      { id: 1, title: "Breaking Bad", year: 2008, image: "src/assets//images/breakingbad.jpg", description: "A high school chemistry teacher turned methamphetamine manufacturer.", rating: "9.5/10" },
      { id: 2, title: "Game of Thrones", year: 2011, image: "src/assets/images/game of thrones.jpg", description: "Noble families vie for control of the Iron Throne.", rating: "9.3/10" },
      { id: 3, title: "Stranger Things", year: 2016, image: "src/assets/images/stranger things.jpg", description: "A group of kids uncover supernatural mysteries in their town.", rating: "8.7/10" },
      { id: 4, title: "The Crown", year: 2016, image: "src/assets/images/the crown.jpg", description: "The story of Queen Elizabeth II's reign.", rating: "8.7/10" },

    ],
    family: [
      { id: 8, title: "Friends", year: 1994, image: "src/assets/images/friends.jpg", description: "Six friends navigate the ups and downs of life in New York City.", rating: "8.9/10" },
      { id: 9, title: "The Simpsons", year: 1989, image: "src/assets/images/the simpsons.jpg", description: "The adventures of the Simpson family in the fictional town of Springfield.", rating: "8.7/10" },
      { id: 10, title: "Full House", year: 1987, image: "src/assets/images/fuller house.jpg", description: "A widowed father raises his three daughters with the help of his brother-in-law and best friend.", rating: "8.5/10" },
    ],
    
    topRated: [
      { id: 11, title: "Breaking Bad", year: 2008, image: "src/assets/images/breakingbad.jpg", description: "A chemistry teacher turned meth producer rises to power.", rating: "9.5/10" },
      { id: 12, title: "Chernobyl", year: 2019, image: "src/assets/images/chernobyl.jpg", description: "The true story of the catastrophic nuclear disaster in 1986.", rating: "9.4/10" },
      { id: 13, title: "The Wire", year: 2002, image: "src/assets/images/the wire.jpg", description: "A deep look at the Baltimore drug scene through the eyes of both law enforcers and drug dealers.", rating: "9.3/10" },
    ],
    
    
    
    // You can add more categories if needed
  };
  const popularReviews = [
    { id: 1, reviewer: "Sarah Fathy", text: "Stranger Things always keeps me on the edge of my seat! The supernatural elements are just amazing.", movie: "Stranger Things" },
    { id: 2, reviewer: "Omar Ahmed", text: "Money Heist is a rollercoaster ride. The twists and the suspense are mind-blowing!", movie: "Money Heist" },
    { id: 3, reviewer: "Layla Mostafa", text: "The Crown gave me a deeper understanding of the British royal family. The acting is phenomenal!", movie: "The Crown" },
    { id: 4, reviewer: "Hassan El Sayed", text: "Black Mirror is a dark, thought-provoking series. Each episode is a new mind-bender.", movie: "Black Mirror" },
    { id: 5, reviewer: "Dalia Kamal", text: "The Witcher is pure fantasy perfection. The world-building and characters are so rich!", movie: "The Witcher" },
];

  return (
    <main className="container my-5">
      <h1 className="text-center mb-4">📺 Explore TV Shows</h1>

      {Object.entries(tvShowCategories).map(([category, shows]) => (
        <section key={category} className="mb-5">
          <h2 className="text-capitalize">{category.replace(/([A-Z])/g, " $1")}</h2>
          <div className="film-list">
            {shows.map((show) => (
              <MovieCard movie= />
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

export default TVShowsPage;
