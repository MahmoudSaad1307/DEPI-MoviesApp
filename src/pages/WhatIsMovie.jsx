import React, { useState, useEffect } from "react";
import './WhatIsMovie.css'
export default function WhatIsMovie() {
  const [description, setDescription] = useState("");
  const [movieName, setMovieName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "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";

  const guessMovie = async () => {
    if (!description.trim()) {
      setError("Please enter a movie description");
      return;
    }

    setLoading(true);
    setMovieName("");
    setError("");

    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama3-70b-8192",
            messages: [
              {
                role: "user",
                content: `What movie is this based on the following description: ${description}? Reply with just the movie name withou giving me the year of release.`,
              },
            ],
            temperature: 0.7,
            max_tokens: 100,
          }),
          signal,
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `API error ${response.status}: ${
            errorData.error?.message || response.statusText
          }`
        );
      }

      const data = await response.json();
      const guess =
        data.choices?.[0]?.message?.content || "Couldn't determine the movie.";
      setMovieName(guess.trim());
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Fetch aborted");
      } else {
        setError(
          `Error: ${error.message || "Failed to connect to AI service"}`
        );
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  };

  useEffect(() => {
    return () => {
      const controller = new AbortController();
      controller.abort();
    };
  }, []);

  return (
    <div className="container my-5" >
      <div className="card shadow-lg">
        <div className="card-body  text-white" style={{border:'none',background:'black'}} >
        
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
          <button style={{background:'#13c6b0'}}
            className="btn  w-100"
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
        </div>
      </div>
    </div>
  );
}
