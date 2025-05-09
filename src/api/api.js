import axios from "axios";
import { API_URL } from "../constants/constants";

export const api = axios.create({
  baseURL: API_URL,
});

export const registerUser = ({name, email, password}) => {
  return api.post("/users/register", { name, email, password });
};

export const loginUser = ({email, password}) => {
  return api.post("/users/login", { email, password });
};
export const updateUser = ({ userId, ...updates }) => {
  return api.put(`/users/${userId}`, updates);
};

export const getProfile = ({token}) => {
  return api.get("/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const findUserById = ({userId}) => {
  return api.get(`/users/findUser/${userId}`);
}
// ==================== Favorites (من users.js) ====================
  export const toggleFavorite = ({ userId, movieId }) => {
    return api.patch(`/users/${userId}/favorites`, { movieId });
  };

// ==================== Watchlist (من users.js) ====================
export const toggleWatchlist = ({ userId, movieId }) => {
  return api.patch(`/users/${userId}/watchList`, { movieId });
};

// ==================== Watched (من users.js) ====================
export const toggleWatched = ({ userId, movieId, rating, ratingProvided }) => {
  return api.patch(`/users/${userId}/watched`, {
    movieId,
    rating,
    ratingProvided,
  });
};

// ==================== Reviews (من reviews.js) ====================
export const addReview = ({ type, userId, movieId, content }) => {
  return api.post(`/reviews/${type}`, { userId, movieId, content });
};

export const getMyReviews = ({userId}) => {
  return api.get(`reviews/user/${userId}`);
}
export const getMovieReviews = ({ type, movieId }) => {
  return api.get(`/reviews/${type}/${movieId}`);
};
// ==================== User Lists (من user-list.js) ====================
export const createList = (userId, title, movies) => {
  return api.post("/user-list", { userId, title, movies });
};

export const getMyLists = (userId) => {
  return api.get("/user-list/my-lists", { data: { userId } });
};

export const updateList = (listId, userId, movieId, action) => {
  return api.put(`/user-list/${listId}`, { userId, movieId, action });
};

export const deleteList = (listId, userId) => {
  return api.delete(`/user-list/${listId}`, { data: { userId } });
};
