{
  _id: Object,
  displayName: String,
  email: String,
  photoURL: String,
  createdAt: Date,
  lastLoginAt: Date,
  preferences: {
    favoriteGenres: [String],
    adultContent: Boolean
  },
  // Embedded movie interactions (NEW)
  movieInteractions: {
    // Key = TMDB Movie ID (Number)
    "12345": {  // Example for TMDB ID 12345
      favorite: Boolean,
      watchlist: Boolean,
      watched: Boolean,
      personalRating: Number,
      lastUpdated: Date
    }
  },
  // Stats counters (NEW)
  movieStats: {
    totalFavorites: Number,
    totalWatchlist: Number,
    totalWatched: Number
  }
}
// Indexes:
// { email: 1 } (unique)
// { "movieInteractions.12345.watched": 1 } (example for specific movie)