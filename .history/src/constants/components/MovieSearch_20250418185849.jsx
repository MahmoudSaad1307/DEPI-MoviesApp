import { useState } from 'react';
import { Search } from 'lucide-react';
import { 
  API_KEY, 
  BASE_URL, 
  IMAGE_URL, 
  ENDPOINTS,
  MOVIE_GENRES,
  TV_GENRES,
  fetchMovies,
  getGenreNames
} from './constants'; // Adjust the import path if needed

function MovieFinderAI() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // This function analyzes text to extract keywords and themes
  const analyzeDescription = (text) => {
    // Split the text into words and remove common words
    const stopWords = ['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'about', 'is', 'are', 'was', 'were'];
    const words = text.toLowerCase().split(/\s+/);
    const filteredWords = words.filter(word => !stopWords.includes(word) && word.length > 2);
    
    // Extract potentially important terms
    const keywords = [];
    const genres = [];
    
    // Identify potential genres
    const allGenres = [...MOVIE_GENRES, ...TV_GENRES];
    const genreKeywords = {
      'action': 'action',
      'adventure': 'adventure',
      'comedy': 'comedy', 'funny': 'comedy', 'humor': 'comedy', 'hilarious': 'comedy',
      'crime': 'crime', 'criminal': 'crime', 'mafia': 'crime', 'detective': 'crime',
      'documentary': 'documentary',
      'drama': 'drama', 'dramatic': 'drama',
      'family': 'family',
      'fantasy': 'fantasy', 'magical': 'fantasy', 'mythical': 'fantasy',
      'history': 'history', 'historical': 'history',
      'horror': 'horror', 'scary': 'horror', 'frightening': 'horror', 'terrifying': 'horror',
      'music': 'music', 'musical': 'music',
      'mystery': 'mystery', 'mysterious': 'mystery',
      'romance': 'romance', 'romantic': 'romance', 'love': 'romance',
      'sci-fi': 'science fiction', 'science fiction': 'science fiction', 'futuristic': 'science fiction', 'space': 'science fiction',
      'thriller': 'thriller', 'suspense': 'thriller', 'thrilling': 'thriller',
      'war': 'war', 'military': 'war',
      'western': 'western', 'cowboy': 'western'
    };
    
    // Look for genre keywords
    filteredWords.forEach(word => {
      if (genreKeywords[word]) {
        const genreName = genreKeywords[word];
        if (!genres.includes(genreName)) {
          genres.push(genreName);
        }
      } else {
        // Add as regular keyword
        keywords.push(word);
      }
    });
    
    // Look for time periods or settings
    const timePeriods = {
      'medieval': 'medieval', 'middle ages': 'medieval',
      'renaissance': 'renaissance',
      'victorian': 'victorian', '1800s': 'victorian',
      'wwi': 'world war', 'world war i': 'world war',
      'wwii': 'world war 2', 'world war ii': 'world war 2',
      'future': 'future', 'futuristic': 'future',
      '80s': '1980s', 'eighties': '1980s',
      '90s': '1990s', 'nineties': '1990s'
    };
    
    const timeKeywords = [];
    for (const [key, value] of Object.entries(timePeriods)) {
      if (text.toLowerCase().includes(key)) {
        timeKeywords.push(value);
      }
    }
    
    return {
      keywords,
      genres,
      timeKeywords,
      originalText: text
    };
  };
  
  const searchMovies = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Check if query has specific search parameters
      const hasSpecificParameters = /actor:|director:|genre:|year:/.test(searchQuery);
      
      if (!hasSpecificParameters) {
        // This is a descriptive search - analyze it
        const analysis = analyzeDescription(searchQuery);
        
        // Create a combined keyword query from important terms
        const combinedQuery = [...analysis.keywords, ...analysis.timeKeywords].join(' ');
        
        // First do a general search with all keywords
        const searchData = await fetchMovies(
          ENDPOINTS.multiSearch,
          `&query=${encodeURIComponent(combinedQuery)}`,
          1
        );
        
        let results = [];
        
        if (searchData && searchData.results && searchData.results.length > 0) {
          results = searchData.results.filter(item => 
            item.media_type === 'movie' || item.media_type === 'tv'
          );
        }
        
        // If we have genres, do a discover search for each genre and collect results
        if (analysis.genres.length > 0) {
          for (const genreName of analysis.genres) {
            // Find genre ID
            const movieGenre = MOVIE_GENRES.find(g => 
              g.name.toLowerCase() === genreName.toLowerCase()
            );
            
            if (movieGenre) {
              const genreResults = await fetchMovies(
                '/discover/movie',
                `&with_genres=${movieGenre.id}&sort_by=popularity.desc`,
                1
              );
              
              if (genreResults && genreResults.results) {
                // Add media_type to results
                const formattedResults = genreResults.results.map(item => ({
                  ...item,
                  media_type: 'movie'
                }));
                
                // Add these results to our collection
                results = [...results, ...formattedResults];
              }
            }
          }
        }
        
        // Now, let's perform semantic matching to rank results
        if (results.length > 0) {
          // Extract keywords from the movie descriptions
          const scoredResults = results.map(movie => {
            // Calculate a relevance score based on matching keywords in overview and title
            let score = 0;
            const title = (movie.title || movie.name || '').toLowerCase();
            const overview = (movie.overview || '').toLowerCase();
            const searchTerms = searchQuery.toLowerCase().split(/\s+/);
            
            // Score based on keywords in title (higher weight)
            searchTerms.forEach(term => {
              if (term.length > 2 && !['the', 'and', 'or', 'but', 'of', 'in', 'on', 'is', 'are'].includes(term)) {
                if (title.includes(term)) score += 5;
                if (overview.includes(term)) score += 2;
              }
            });
            
            // Score based on genre matches
            if (movie.genre_ids && analysis.genres.length > 0) {
              const movieGenreNames = getGenreNames(movie.genre_ids, movie);
              analysis.genres.forEach(genre => {
                if (movieGenreNames.some(g => g.toLowerCase().includes(genre.toLowerCase()))) {
                  score += 10;
                }
              });
            }
            
            // Score based on keywords in the time period
            if (analysis.timeKeywords.length > 0) {
              analysis.timeKeywords.forEach(timePeriod => {
                if (overview.includes(timePeriod.toLowerCase())) {
                  score += 8;
                }
              });
            }
            
            // Add popularity as a factor (but not dominating)
            score += (movie.popularity || 0) / 20;
            
            return { ...movie, relevanceScore: score };
          });
          
          // Sort by relevance score (highest first)
          scoredResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
          
          // Take the top 20 results
          const topResults = scoredResults.slice(0, 20);
          
          // Transform to display format
          const movieResults = topResults.map(item => {
            const isMovie = item.media_type === 'movie';
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
              mediaType: item.media_type,
              relevanceScore: item.relevanceScore
            };
          });
          
          setMovies(movieResults);
        } else {
          // Fallback to standard search
          const fallbackData = await fetchMovies(
            ENDPOINTS.movies.search,
            `&query=${encodeURIComponent(searchQuery)}`,
            1
          );
          
          if (fallbackData.results && fallbackData.results.length > 0) {
            const movieResults = fallbackData.results.map(item => ({
              id: item.id,
              title: item.title,
              year: item.release_date ? item.release_date.substring(0, 4) : 'Unknown',
              poster: item.poster_path 
                ? `${IMAGE_URL}${item.poster_path}` 
                : "/api/placeholder/200/300",
              overview: item.overview,
              rating: item.vote_average,
              mediaType: 'movie'
            }));
            
            setMovies(movieResults);
          } else {
            setMovies([]);
            setError("No movies found matching your description. Try a different search.");
          }
        }
      } else {
        // This is a structured search with parameters - handle as before
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
        
        // Process the structured query
        let endpoint = '';
        let queryParams = '';
        
        if (actor || director) {
          const personQuery = actor || director;
          const personData = await fetchMovies(
            ENDPOINTS.person.search, 
            `&query=${encodeURIComponent(personQuery)}`, 
            1
          );
          
          if (personData.results && personData.results.length > 0) {
            const personId = personData.results[0].id;
            endpoint = '/discover/movie';
            queryParams = actor ? `&with_cast=${personId}` : `&with_crew=${personId}`;
            
            if (year) queryParams += `&primary_release_year=${year}`;
            if (genre) {
              const genreObj = MOVIE_GENRES.find(
                g => g.name.toLowerCase() === genre.toLowerCase()
              );
              if (genreObj) {
                queryParams += `&with_genres=${genreObj.id}`;
              }
            }
          } else {
            endpoint = ENDPOINTS.movies.search;
            queryParams = `&query=${encodeURIComponent(query)}`;
            if (year) queryParams += `&year=${year}`;
          }
        } else if (genre) {
          const genreObj = MOVIE_GENRES.find(
            g => g.name.toLowerCase() === genre.toLowerCase()
          );
          
          if (genreObj) {
            endpoint = '/discover/movie';
            queryParams = `&with_genres=${genreObj.id}`;
            if (year) queryParams += `&primary_release_year=${year}`;
          } else {
            endpoint = ENDPOINTS.movies.search;
            queryParams = `&query=${encodeURIComponent(searchQuery)}`;
          }
        } else {
          endpoint = ENDPOINTS.movies.search;
          queryParams = `&query=${encodeURIComponent(query)}`;
          if (year) queryParams += `&year=${year}`;
        }
        
        const data = await fetchMovies(endpoint, queryParams, 1);
        
        if (data && data.results && data.results.length > 0) {
          const movieResults = data.results.map(item => ({
            id: item.id,
            title: item.title || item.name,
            year: item.release_date ? item.release_date.substring(0, 4) : 'Unknown',
            poster: item.poster_path 
              ? `${IMAGE_URL}${item.poster_path}` 
              : "/api/placeholder/200/300",
            overview: item.overview,
            rating: item.vote_average,
            mediaType: 'movie'
          }));
          
          setMovies(movieResults);
        } else {
          setMovies([]);
          setError("No movies found matching your criteria. Try a different search.");
        }
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
            placeholder="E.g., 'A funny movie about time travel in the 80s'"
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
            <li>Describe what you're looking for: "A scary movie set in space"</li>
            <li>Include themes, settings, or time periods: "romantic comedy in Paris"</li>
            <li>For specific searches: actor:"Brad Pitt" genre:"action" year:2019</li>
          </ul>
        </div>
      </div>
      
      {loading && (
        <div className="text-center mt-8">
          <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-gray-600">Finding the perfect matches for you...</p>
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
          No movies found. Try a different description or search term.
        </div>
      )}
      
      {!loading && !error && movies.length === 0 && !searchQuery && (
        <div className="mt-8 text-center text-gray-600">
          Describe what kind of movie you're looking for above!
        </div>
      )}
    </div>
  );
}

export default MovieFinderAI;