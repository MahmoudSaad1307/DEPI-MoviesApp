import { useState } from 'react';
import { Search } from 'lucide-react';

function MovieSearch({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Here you would integrate with your movie API
    // This is a placeholder for the actual API call
    onSearch(searchQuery)
      .finally(() => setIsSearching(false));
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Describe a movie</h2>
        <p className="text-gray-600">
          Use your own words, or search with titles, actors, directors, genres etc. 
          We find movies for you to watch.
        </p>
      </div>
      
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="E.g., 'A comedy about time travel' or 'Movies with Tom Hanks'"
          className="w-full p-4 pl-5 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
          disabled={isSearching || !searchQuery.trim()}
        >
          {isSearching ? (
            <div className="w-6 h-6 border-t-2 border-white rounded-full animate-spin"></div>
          ) : (
            <Search size={24} />
          )}
        </button>
      </form>
    </div>
  );
}

export default MovieSearch;