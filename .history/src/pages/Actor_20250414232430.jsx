import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./actor.css";
import { useParams } from "react-router-dom";
import {
  API_KEY,
  BASE_URL,
  BACKDROP_PATH,
  IMAGE_URL,
  ENDPOINTS,
} from "../constants/constants";

const ActorPage = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActorData = async () => {
      try {
        console.log('================================================');
        setLoading(true);
        
        // Fetch actor details and movie credits
        
        const response = await fetch(
          `${BASE_URL}/person/${id}?api_key=${API_KEY}&append_to_response=movie_credits`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setActor(data);
        
        // Filter movies where the actor was in the cast (not crew)
        const actorMovies = data.movie_credits?.cast || [];
        setMovies(actorMovies);
        
      } catch (err) {
        setError(err.message);
        console.error("Error fetching actor data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchActorData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5 alert alert-danger">
        Error loading actor data: {error}
      </div>
    );
  }

  if (!actor) {
    return (
      <div className="container my-5 alert alert-warning">
        Actor not found
      </div>
    );
  }

  return (
    <main className="container my-5">
      <div className="row">
        <div className="col-lg-8">
          <div className="mb-4">
            <p className="text-muted mb-1">Films Starring</p>
            <h1 className="mb-4">{actor.name}</h1>
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
              {movies.map((movie) => (
                <div className="col" key={movie.id}>
                  <div className="card h-100 border-0 shadow-sm">
                    {movie.poster_path ? (
                      <img
                        src={`${IMAGE_URL}w342${movie.poster_path}`}
                        alt={movie.title}
                        className="card-img-top img-fluid"
                      />
                    ) : (
                      <div className="card-img-top img-fluid bg-light d-flex align-items-center justify-content-center" style={{ height: '100%', minHeight: '200px' }}>
                        <span className="text-muted">No image available</span>
                      </div>
                    )}
                    <div className="card-body p-2">
                      <h5 className="card-title fs-6 mb-0">{movie.title}</h5>
                      <p className="card-text text-muted small">
                        {movie.release_date?.substring(0, 4) || 'Year unknown'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="col-lg-4">
          <div className="card mb-4 border-0 shadow-sm">
            {actor.profile_path ? (
              <img
                src={`${IMAGE_URL}w500${actor.profile_path}`}
                className="card-img-top rounded-top"
                alt={actor.name}
              />
            ) : (
              <div className="card-img-top bg-light d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
                <span className="text-muted">No image available</span>
              </div>
            )}
            <div className="card-body">
              <h3 className="h5 card-title">
                {actor.name} {actor.birthday && `(born ${new Date(actor.birthday).toLocaleDateString()})`}
              </h3>
              <p className="card-text">
                {actor.biography || 'No biography available.'}
              </p>
              {actor.place_of_birth && (
                <p className="text-muted small">From: {actor.place_of_birth}</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default ActorPage;