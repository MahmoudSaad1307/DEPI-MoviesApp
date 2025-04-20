{
  _id: '5',
  displayName: String,
  email: String,
  photoURL: String,
  createdAt: Date,
  lastLoginAt: Date,
  preferences: {
    favoriteGenres: [String],
    adultContent: Boolean
  },
  movieInteractions: {
    "12345": { 
      favorite: Boolean,
      watchlist: Boolean,
      watched: Boolean,
      personalRating: Number,
      lastUpdated: Date
    }
  },
  movieStats: {
    totalFavorites: Number,
    totalWatchlist: Number,
    totalWatched: Number
  }
}
