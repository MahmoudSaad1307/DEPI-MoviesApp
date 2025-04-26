import { useState } from 'react';
import { Search } from 'lucide-react';
import { 
  API_KEY, 
  BASE_URL, 
  IMAGE_URL, 
  ENDPOINTS,
  MOVIE_GENRES,
  fetchMovies
} from '../'; // Adjust the import path if needed

function MovieFinderApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const searchMovies = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Determine if the query is descriptive or specific
      const isDescriptive = !searchQuery.includes(':') && 
                          searchQuery.split(' ').length > 2;
      
      let endpoint = '';
      let queryParams = '';
      let pageNumber = 1;
      
      if (isDescriptive) {
        // For descriptive searches, we'll use the multi-search endpoint
        endpoint = ENDPOINTS.multiSearch;
        queryParams = `&query=${encodeURIComponent(searchQuery)}`;
      } else {
        // For specific queries, parse potential filters
        let query = searchQuery;
        let year = '';
        let actor = '';
        let director = '';
        let genre = '';
        
        // Check for specific search parameters
        if (searchQuery.includes('year:')) {
          const yearMatch = searchQuery.match(/year:(\d{4})/);
          if (yearMatch) {
            year = yearMatch[1];
            query = query.replace(/year:\d{4}/, '').trim();
          }
        }
        
        if (searchQuery.includes('actor:')) {
          const actorMatch = searchQuery.match(/actor:"([^"]+)"/);
          if (actorMatch) {
            actor = actorMatch[1];
            query = query.replace(/actor:"[^"]+"/, '').trim();
          }
        }
        
        if (searchQuery.includes('director:')) {
          const directorMatch = searchQuery.match(/director:"([^"]+)"/);
          if (directorMatch) {
            director = directorMatch[1];
            query = query.replace(/director:"[^"]+"/, '').trim();
          }
        }
        
        if (searchQuery.includes('genre:')) {
          const genreMatch = searchQuery.match(/genre:"([^"]+)"/);
          if (genreMatch) {
            genre = genreMatch[1];
            query = query.replace(/genre:"[^"]+"/, '').trim();
          }
        }
        
        // Handle different search cases
        if (actor || director) {
          // First find the person
          let personQuery = actor || director;
          
          try {
            const personData = await fetchMovies(
              ENDPOINTS.person.search, 
              `&query=${encodeURIComponent(personQuery)}`, 
              1
            );
            
            if (personData.results && personData.results.length > 0) {
              const personId = personData.results[0].id;
              
              // Now search for movies with this person
              const movieEndpoint = `/discover/movie`;
              let discoverQuery = '';
              
              if (actor) {
                discoverQuery = `&with_cast=${personId}`;
              } else {
                discoverQuery = `&with_crew=${personId}`;
              }
              
              if (year) discoverQuery += `&primary_release_year=${year}`;
              if (genre) {
                const genreObj = MOVIE_GENRES.find(
                  g => g.name.toLowerCase() === genre.toLowerCase()
                );
                if (genreObj) {
                  discoverQuery += `&with_genres=${genreObj.id}`;
                }
              }
              
              endpoint = movieEndpoint;
              queryParams = discoverQuery;
            } else {
              // No person found, use general search
              endpoint = ENDPOINTS.movies.search;
              queryParams = `&query=${encodeURIComponent(query)}`;
              if (year) queryParams += `&year=${year}`;
            }
          } catch (err) {
            console.error("Error searching for person:", err);
            // Fall back to regular search
            endpoint = ENDPOINTS.movies.search;
            queryParams = `&query=${encodeURIComponent(query)}`;
          }
        } else if (genre) {
          const genreObj = MOVIE_GENRES.find(
            g => g.name.toLowerCase() === genre.toLowerCase()
          );
          
          if (genreObj) {
            endpoint = `/discover/movie`;
            queryParams = `&with_genres=${genreObj.id}`;
            if (year) queryParams += `&primary_release_year=${year}`;
            if (query) queryParams += `&query=${encodeURIComponent(query)}`;
          } else {
            // No genre found, use general search
            endpoint = ENDPOINTS.movies.search;
            queryParams = `&query=${encodeURIComponent(searchQuery)}`;
          }
        } else {
          // Simple title/keyword search
          endpoint = ENDPOINTS.movies.search;
          queryParams = `&query=${encodeURIComponent(query)}`;
          if (year) queryParams += `&year=${year}`;
        }
      }
      
      // Make the final API call using your existing fetchMovies function
      const data = await fetchMovies(endpoint, queryParams, 1);
      
      if (data && data.results && data.results.length > 0) {
        // Transform the data to our display format
        const movieResults = data.results
          .filter(item => item.media_type !== 'person') // Filter out person results
          .map(item => {
            const isMovie = !item.media_type || item.media_type === 'movie';
            return {
              id: item.id,
              title: isMovie ? item.title : item.name,
              year: isMovie 
                ? (item.release_date ? item.release_date.substring(0, 4) : 'Unknown')
                : (item.first_air_date ? item.first_air_date.substring(0, 4) : 'Unknown'),
              poster: item.poster_path 
                ? `${IMAGE_URL}${item.poster_path}` 
                : "/api/placeholder/200/300",
              overview: item.overview,
              rating: item.vote_average,
              mediaType: item.media_type || 'movie'
            };
          });
        
        setMovies(movieResults);
      } else {
        setMovies([]);
        setError("No movies found matching your description. Try a different search.");
      }
    } catch (err) {
      setError("Failed to search movies. Please try again.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const getMediaTitle = (item) => {
    return item.mediaType === 'tv' ? 'TV Show: ' + item.title : item.title;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="w-full max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Describe a movie</h2>
          <p className="text-gray-600">
            Use your own words, or search with titles, actors, directors, genres etc. 
            We find movies for you to watch.
          </p>
        </div>
        
        <form onSubmit={searchMovies} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            // placeholder="E.g., 'A comedy about time travel' or 'actor:\"Tom Hanks\" year:1995'"
            className="w-full p-4 pl-5 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
            disabled={loading || !searchQuery.trim()}
          >
            {loading ? (
              <div className="w-6 h-6 border-t-2 border-white rounded-full animate-spin"></div>
            ) : (
              <Search size={24} />
            )}
          </button>
        </form>
        
        <div className="mt-4 text-sm text-gray-500">
          <p>Search tips:</p>
          <ul className="list-disc ml-5 mt-1">
            <li>Use natural language: "scary movies about haunted houses"</li>
            <li>For specific searches: actor:"Brad Pitt" genre:"action" year:2019</li>
          </ul>
        </div>
      </div>
      
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
            {movies.map(movie => (
              <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={movie.poster} 
                  alt={`${movie.title} poster`} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-bold">{getMediaTitle(movie)}</h4>
                  <p className="text-gray-600">{movie.year}</p>
                  {movie.rating > 0 && (
                    <div className="mt-1 flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1">{movie.rating.toFixed(1)}/10</span>
                    </div>
                  )}
                  <p className="mt-2 text-sm text-gray-700 line-clamp-3">{movie.overview}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {!loading && !error && movies.length === 0 && searchQuery && (
        <div className="mt-8 text-center text-gray-600">
          No movies found. Try a different search.
        </div>
      )}
      
      {!loading && !error && movies.length === 0 && !searchQuery && (
        <div className="mt-8 text-center text-gray-600">
          Use the search box above to find movies!
        </div>
      )}
    </div>
  );
}

export default MovieFinderApp;