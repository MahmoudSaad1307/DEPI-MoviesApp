import React, { useState, useEffect } from "react";

export default function MovieSearch() {
  const [description, setDescription] = useState("");
  const [movieNames, setMovieNames] = useState([]);  // Changed to store multiple movie names
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "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";

  const guessMovie = async () => {
    if (!description.trim()) {
      setError("Please enter a movie description");
      return;
    }

    setLoading(true);
    setMovieNames([]);  // Clear previous results
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
                content: `What movies are these based on the following description: ${description}? Reply with a list of movie names, no years of release.`
              },
            ],
            temperature: 0.7,
            max_tokens: 200,  // Increase token limit to allow more results
          }),
          signal,
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `API error ${response.status}: ${errorData.error?.message || response.statusText}`
        );
      }

      const data = await response.json();
      const guesses = data.choices?.[0]?.message?.content || "Couldn't determine the movie.";
      
      // Split the response by line or comma and filter out empty entries
      const movieList = guesses.split(/[\n,;]/).filter((item) => item.trim() !== "");
      setMovieNames(movieList);

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
    <div className="container my-5">
      <div className="card shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">
            🎬 Movie Memory Assistant
          </h2>
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
            className="btn btn-primary w-100"
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

          {movieNames.length > 0 && (
            <div className="alert alert-info mt-4">
              <h5 className="mb-1">AI Guess:</h5>
              <ul>
                {movieNames.map((movie, index) => (
                  <li key={index} className="text-dark">{movie}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
