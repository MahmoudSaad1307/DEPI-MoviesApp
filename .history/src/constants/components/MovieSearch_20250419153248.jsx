import React, { useState } from "react";

export default function Tess() {
  const [description, setDescription] = useState("");
  const [movieName, setMovieName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Using a dummy key for demonstration - this should be replaced with a secure method
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
      // Log request for debugging
      console.log("Sending request to Groq API with payload:", {
        model: "mixtral-8x7b-32768",
        messages: [
          {
            role: "user",
            content: `What movie is this based on the following description: ${description}? Reply with just the movie name.`,
          }
        ],
      });

      // Try with the correct Groq API endpoint
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "mixtral-8x7b-32768",
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
      setMovieName("");
    } finally {
      setLoading(false);
    }
  };

  // Mock function for demo purposes - use this if the real API is unavailable
  const mockGuessMovie = () => {
    setLoading(true);
    setMovieName("");
    setError("");
    
    setTimeout(() => {
      // Mock response based on keywords in the description
      const desc = description.toLowerCase();
      let guess = "Unknown movie";
      
      if (desc.includes("bowler hat") && desc.includes("violent") && desc.includes("brainwashing")) {
        guess = "A Clockwork Orange";
      } else if (desc.includes("dream") && desc.includes("inception")) {
        guess = "Inception";
      } else if (desc.includes("matrix") || (desc.includes("neo") && desc.includes("red pill"))) {
        guess = "The Matrix";
      }
      
      setMovieName(guess);
      setLoading(false);
    }, 1500);
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
      
      <div className="flex space-x-4 mb-6">
        <button
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
          onClick={guessMovie}
          disabled={loading || !description.trim()}
        >
          {loading ? "Thinking..." : "Guess with API"}
        </button>
        
        <button
          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400"
          onClick={mockGuessMovie}
          disabled={loading || !description.trim()}
        >
          Demo Mode
        </button>
      </div>
      
      {error && (
        <div className="p-3 mb-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p>{error}</p>
          <p className="text-sm mt-1">Note: API keys for Groq may need to be valid and active.</p>
        </div>
      )}
      
      {movieName && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-medium text-lg">AI Guess:</h3>
          <p className="text-xl font-bold text-blue-800">{movieName}</p>
        </div>
      )}
      
      <div className="mt-6 text-sm text-gray-600">
        <p>Having trouble? Try our "Demo Mode" to see the app functionality without using the API.</p>
      </div>
    </div>
  );
}