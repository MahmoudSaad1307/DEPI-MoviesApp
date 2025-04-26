{
  _id: ObjectId;
  auth: {
    email: String,        // Unique
    providers: [String],   // e.g., ["google", "facebook"]
  };
  profile: {
    displayName: String,
    photoURL: String
  };
  movieInteractions: {
    favorites: [Number],  // Array of TMDB IDs
    watchlist: [{
      tmdbId: Number,     // TMDB ID
      addedAt: Date
    }],
    watched: [{
      tmdbId: Number,     // TMDB ID
      rating: Number,     // 1-10
      watchedAt: Date
    }]
  };
  preferences: {
    adultContent: Boolean,
    notificationSettings: {
      email: Boolean,
      push: Boolean
    }
  };
  timestamps: {
    createdAt: Date,
    lastActive: Date
  }
}

// Indexes:
// { "auth.email": 1 }; { unique: true }
// { "movieInteractions.favorites": 1 }
// { "movieInteractions.watchlist.tmdbId": 1 }
// { "movieInteractions.watched.tmdbId": 1 }