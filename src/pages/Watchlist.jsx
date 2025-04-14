// src/pages/Watchlist.jsx
import React from "react";
import { Link } from "react-router-dom";

const watchlist = [
  {
    id: 1,
    title: "Hotel Transylvania",
    year: 2012,
    duration: "1h 31m",
    rating: 7.0,
    votes: "296k",
    metascore: 47,
    image: "https://pics.filmaffinity.com/hotel_transylvania-382209595-large.jpg",
    description: "Dracula operates a resort for monsters. Chaos begins when a human stumbles in.",
  },
  {
    id: 2,
    title: "Kung Fu Panda 3",
    year: 2016,
    duration: "1h 35m",
    rating: 7.1,
    votes: "203k",
    metascore: 66,
    image: "https://pics.filmaffinity.com/kung_fu_panda_3-119198470-large.jpg",
    description: "Po discovers his real father and fights a powerful enemy threatening all of China.",
  },
];

const Watchlist = () => {
  return (
    <div className="p-4 min-h-screen text-white" style={{ backgroundColor: "#0d0d0d" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h4 fw-bold">Watchlist <span className="badge bg-secondary">{watchlist.length}</span></h1>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-light btn-sm">Sort by</button>
          <button className="btn btn-primary btn-sm">+ Create a new list</button>
        </div>
      </div>

      {/* Movie Cards */}
      <div className="row g-4">
        {watchlist.map((movie) => (
          <div key={movie.id} className="col-md-6">
            <div className="card h-100 flex-row bg-dark border-0 text-white shadow-sm">
              <img
                src={movie.image}
                alt={movie.title}
                className="img-fluid rounded-start"
                style={{ width: "120px", height: "180px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-subtitle text-muted mb-2">
                    {movie.year} • {movie.duration}
                  </p>
                  <div className="d-flex gap-3 mb-2">
                    <span>⭐ {movie.rating} ({movie.votes})</span>
                    <span className="badge bg-warning text-dark">Metascore: {movie.metascore}</span>
                  </div>
                  <p className="card-text text-white-50">{movie.description}</p>
                </div>
                <div className="text-end">
                  <button className="btn btn-sm btn-outline-light">More options</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link to="/user" className="d-block mt-5 text-info">← Back to Profile</Link>
    </div>
  );
};

export default Watchlist;
