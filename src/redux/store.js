import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';

// Import your reducers
import filtersReducer from "./slices/filtersSlice";
import userMoviesReducer from "./slices/userMoviesSlice";
import userReducer from "./slices/userSlice";
import trailerReducer from "./slices/trailerSlice";

// Configure persist for all reducers
const persistConfig = {
  key: 'root',
  storage,
  // No whitelist means all reducers will be persisted
};

const rootReducer = combineReducers({
  filters: filtersReducer,
  user: userReducer,
  userMovies: userMoviesReducer,
  trailer: trailerReducer

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
    }),
});

// Create persistor
export const persistor = persistStore(store);

export default store;