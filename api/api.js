import axios from "axios";
import { API_URL, TOKEN } from "../src/constants/constants";
export const api = axios.create({
  baseURL: API_URL,
});

export const registerUser = ({ name, email, password }) => {
  return api.post("/users/register", { name, email, password });
};

export const loginUser = ({ email, password }) => {
  return api.post("/users/login", { email, password });
};
export const sendTokenToBackend = (firebaseUser) => {
  console.log("firebaseUser:", firebaseUser);
  return api.post("/users/google-login", {
    displayName: firebaseUser.displayName,
    email: firebaseUser.email,
    uid: firebaseUser.uid,
    photoURL: firebaseUser.photoURL,
  });
};
export const updateUser = ({ ...updates }) => {
  return api.put(`/users/update`, updates, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
};

export const getProfile = ({ token }) => {
  return api.get("/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const findUserById = ({ userId }) => {
  console.log(userId);

  return api.get(`/users/findUser/${userId}`);
};
// ==================== Favorites (من users.js) ====================
export const toggleFavorite = ({ movieId }) => {
  return api.patch(
    `/users/favorites`,
    { movieId },
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
};

// ==================== Watchlist (من users.js) ====================
export const toggleWatchlist = ({ movieId }) => {
  return api.patch(
    `/users/watchList`,
    { movieId },
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
};

// ==================== Watched (من users.js) ====================
export const toggleWatched = ({ movieId, rating, ratingProvided }) => {
  return api.patch(
    `/users/watched`,
    {
      movieId,
      rating,
      ratingProvided,
    },
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
};

// ==================== Reviews (من reviews.js) ====================
export const addReview = ({ type, movieId, content }) => {
  console.log(TOKEN, "addReview");

  return api.post(
    `/reviews/${type}`,
    { movieId, content },
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
};

export const getMyReviews = ({ userId }) => {
  return api.get(`reviews/user/${userId}`);
};
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
