// userMoviesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userMoviesSlice = createSlice({
  name: 'userMovies',
  initialState: {
    favorites: [],
    watchlist: [],
    watched:[]
  },
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    setWatchlist: (state, action) => {
      state.watchlist = action.payload;
    },
    setWatched: (state, action) => {
      state.watched = action.payload;
    },
  
  }
});

export const {
  setFavorites,
  setWatchlist,
  setWatched
  
} = userMoviesSlice.actions;
export default userMoviesSlice.reducer;
