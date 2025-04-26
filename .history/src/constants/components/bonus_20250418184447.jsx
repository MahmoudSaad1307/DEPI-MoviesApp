import { useState } from "react";
import MovieSearch from "./";

function Bonus() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // This function would call your movie API
  const searchMovies = async (query) => {
    setLoading(true);
    setError(null);

    try {
      // Replace this with your actual API call
      // Example: const response = await fetch(`https://your-movie-api.com/search?query=${encodeURIComponent(query)}`);

      // For demonstration, using a timeout and mock data
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data - replace with actual API response
      const mockResults = [
        {
          id: 1,
          title: "The Time Traveler",
          year: 2022,
          poster: "/api/placeholder/200/300",
        },
        {
          id: 2,
          title: "Past Forward",
          year: 2021,
          poster: "/api/placeholder/200/300",
        },
        {
          id: 3,
          title: "Future Memory",
          year: 2023,
          poster: "/api/placeholder/200/300",
        },
      ];

      setMovies(mockResults);
    } catch (err) {
      setError("Failed to search movies. Please try again.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }

    return Promise.resolve(); // For the component to know when search is complete
  };

  return (
    <div className="container mx-auto p-4">
      <MovieSearch onSearch={searchMovies} />

      {loading && (
        <div className="text-center mt-8">
          <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-gray-600">Finding movies for you...</p>
        </div>
      )}

      {error && (
        <div className="mt-8 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Results</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={movie.poster}
                  alt={`${movie.title} poster`}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-bold">{movie.title}</h4>
                  <p className="text-gray-600">{movie.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && !error && movies.length === 0 && (
        <div className="mt-8 text-center text-gray-600">
          Use the search box above to find movies!
        </div>
      )}
    </div>
  );
}

export default Bonus;
