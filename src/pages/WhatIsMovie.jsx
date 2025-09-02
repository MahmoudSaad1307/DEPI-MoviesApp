import React, { useState, useEffect } from "react";
import './WhatIsMovie.css';
import { API_KEY, BASE_URL, IMAGE_URL, ENDPOINTS } from "../constants/constants";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function WhatIsMovie() {
  const [description, setDescription] = useState("");
  const [movieName, setMovieName] = useState("");
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [groqKey, setGroqKey] = useState(null);

  useEffect(() => {
    const fetchVariable = async () => {
      try {
        const docRef = doc(db, "settings", "global");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const value = docSnap.data().apiKey;
          // console.log(value);
          
           
          setGroqKey(value);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching variable:", error);
      }
    };
    fetchVariable();
  }, []);



const guessMovie = async () => {
  console.log("Key", {groqKey});
  if (!description.trim()) {
    setError("Please enter a movie description");
    return;
  }

  if (!groqKey) {
    setError("API key not loaded yet. Please try again.");
    return;
  }

  setLoading(true);
  setMovieName("");
  setMovieDetails(null);
  setError("");

  const controller = new AbortController();
  const signal = controller.signal;

  try {
    // Add more detailed logging
    console.log("Making request with key:", groqKey.substring(0, 10) + "...");
    
    const requestBody = {
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `What movie is this based on the following description: ${description}? Reply with just the movie name without giving me the year of release.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
    };

    console.log("Request body:", JSON.stringify(requestBody, null, 2));

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${groqKey}`,
        },
        body: JSON.stringify(requestBody),
        signal,
      }
    );

    // Log the response for debugging
    console.log("Response status:", response.status);
    console.log("Response headers:", Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API Error Response:", errorData);
      
      // More specific error handling
      if (response.status === 401) {
        throw new Error("Invalid API key. Please check your Groq API key.");
      } else if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      } else if (response.status === 400) {
        throw new Error(`Bad request: ${errorData.error?.message || 'Invalid request format'}`);
      } else {
        throw new Error(
          `API error ${response.status}: ${
            errorData.error?.message || response.statusText
          }`
        );
      }
    }

    const data = await response.json();
    console.log("Success response:", data);
    
    const guess = data.choices?.[0]?.message?.content.trim() || "Couldn't determine the movie.";
    setMovieName(guess);
    
    // Step 2: Search for movie details on TMDB
    if (guess && guess !== "Couldn't determine the movie.") {
      await fetchMovieDetails(guess);
    }
    
  } catch (error) {
    console.error("Full error object:", error);
    if (error.name === "AbortError") {
      console.log("Fetch aborted");
    } else {
      setError(error.message || "We're experiencing heavy load. Please try again in a few moments.");
    }
  } finally {
    setLoading(false);
  }
};
  const fetchMovieDetails = async (movieTitle) => {
    try {
      const searchResponse = await fetch(
        `${BASE_URL}${ENDPOINTS.movies.search}?api_key=${API_KEY}&query=${encodeURIComponent(movieTitle)}&language=en-US&page=1&include_adult=false`
      );
      
      if (!searchResponse.ok) {
        throw new Error("Failed to search for movie");
      }
      
      const searchData = await searchResponse.json();
      
      if (searchData.results && searchData.results.length > 0) {
        // Get the first result as the most likely match
        const movieId = searchData.results[0].id;
        
        // Fetch detailed movie info
        const detailsResponse = await fetch(
          `${BASE_URL}${ENDPOINTS.movies.details(movieId)}?api_key=${API_KEY}&append_to_response=credits,videos`
        );
        
        if (!detailsResponse.ok) {
          throw new Error("Failed to fetch movie details");
        }
        
        const movieData = await detailsResponse.json();
        setMovieDetails(movieData);
      } else {
        console.log("No movie results found");
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setError("Failed to fetch movie details from TMDB");
    }
  };

  useEffect(() => {
    return () => {
      const controller = new AbortController();
      controller.abort();
    };
  }, []);

  return (
    <div className="container my-5">
      <div className="card shadow-lg">
        <div
          className="card-body text-white"
          style={{ border: "none", background: "black" }}
        >
          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-bold">
              Movie Description
            </label>
            <textarea
              id="description"
              className="form-control"
              rows="5"
              placeholder="Describe the movie you remember (plot, characters, scenes)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            style={{ background: "#13c6b0" }}
            className="btn text-white w-100"
            onClick={guessMovie}
            disabled={loading || !description.trim()}
          >
            {loading ? "Thinking..." : "Guess Movie"}
          </button>

          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}

          {movieName && (
            <div className="alert alert-info mt-4">
              <h5 className="mb-1">AI Guess:</h5>
              <strong className="text-dark">{movieName}</strong>
            </div>
          )}

          {movieDetails && (
            <div className="movie-result mt-4">
              <div className="row">
                <div className="col-md-4">
                  {movieDetails.poster_path ? (
                    <img
                      src={`${IMAGE_URL}${movieDetails.poster_path}`}
                      alt={movieDetails.title}
                      className="img-fluid rounded shadow"
                    />
                  ) : (
                    <div
                      className="no-poster d-flex justify-content-center align-items-center bg-secondary text-white rounded"
                      style={{ height: "300px" }}
                    >
                      <span>No poster available</span>
                    </div>
                  )}
                </div>
                <div className="col-md-8">
                  <h3 className="movie-title">
                    {movieDetails.title}{" "}
                    <span className="ms-2	text-secondary	">
                      ({new Date(movieDetails.release_date).getFullYear()})
                    </span>
                  </h3>

                  <div className="movie-rating mb-2">
                    <span
                      style={{ color: "gold" }}
                      className="rating-star me-1"
                    >
                      <i className="fas fa-star"></i>
                    </span>
                    <span className="fw-bold">
                      {movieDetails.vote_average.toFixed(1)}
                    </span>
                    <span className="text-muted ms-2">
                      ({movieDetails.vote_count} votes)
                    </span>
                  </div>

                  <div className="movie-tags mb-3">
                    {movieDetails.genres &&
                      movieDetails.genres.map((genre) => (
                        <span key={genre.id} className="movie-tag me-2">
                          {genre.name}
                        </span>
                      ))}
                  </div>

                  <p className="movie-overview">{movieDetails.overview}</p>

                  {movieDetails.credits && movieDetails.credits.crew && (
                    <div className="movie-meta mb-2">
                      <span className="meta-label">Director: </span>
                      <span>
                        {movieDetails.credits.crew
                          .filter((person) => person.job === "Director")
                          .map((director) => director.name)
                          .join(", ") || "Unknown"}
                      </span>
                    </div>
                  )}

                  {movieDetails.credits && movieDetails.credits.cast && (
                    <div className="movie-meta">
                      <span className="meta-label">Cast: </span>
                      <span>
                        {movieDetails.credits.cast
                          .slice(0, 5)
                          .map((actor) => actor.name)
                          .join(", ")}
                        {movieDetails.credits.cast.length > 5 ? ", ..." : ""}
                      </span>
                    </div>
                  )}

                  <div className="btn mt-3">
                    <Link
                      to={`/movie-details/movie/${movieDetails.id}`}
                      className="movie-card-link"
                    >
                      <i className="fas fa-film me-2"></i>
                      Movie Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}