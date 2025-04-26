import React, { useState } from "react";

export default function MovieSearch() {
  const [description, setDescription] = useState("");
  const [movieName, setMovieName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Using the same API key for continuity
  const API_KEY = "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";

  const guessMovie = async () => {
    if (!description.trim()) {
      setError("Please enter a movie description");
      return;
    }

    setLoading(true);
    setMovieName("");
    setError("");

    try {
      // Using a currently supported Groq model
      // LLaMA-3 models are currently supported as of April 2025
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama3-70b-8192", // Updated to a currently supported model
            messages: [
              {
                role: "user",
                content: `What movie is this based on the following description: ${description}? Reply with just the movie name.`,
              },
            ],
            temperature: 0.7,
            max_tokens: 100,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API Error Response:", errorData);
        throw new Error(`API error ${response.status}: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const guess = data.choices?.[0]?.message?.content || "Couldn't determine the movie.";
      setMovieName(guess.trim());
    } catch (error) {
      console.error("Error details:", error);
      setError(`Error: ${error.message || "Failed to connect to AI service"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">🎬 Movie Memory Assistant</h2>
      
      <div className="mb-4">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="5"
          placeholder="Describe the movie you remember (plot, characters, memorable scenes)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      
      <button
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
        onClick={guessMovie}
        disabled={loading || !description.trim()}
      >
        {loading ? "Thinking..." : "Guess Movie"}
      </button>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p>{error}</p>
        </div>
      )}
      
      {movieName && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-medium text-lg">AI Guess:</h3>
          <p className="text-xl font-bold text-blue-800">{movieName}</p>
        </div>
      )}
    </div>
  );
}