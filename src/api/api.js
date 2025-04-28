import axios from 'axios';
import {API_URL} from '../constants/constants'


const api = axios.create({
  baseURL: API_URL,
});


export const registerUser = (name, email, password) => {
  return api.post('/users/register', { name, email, password });
};

export const loginUser = (email, password) => {
  return api.post('/users/login', { email, password });
};

export const getReviewsByMovieId = (movieId) => {
  return api.get(`/reviews/movie/${movieId}`);
};

export const createReview = (reviewData) => {
  return api.post('/reviews', reviewData);
};

export const getUserList = (userId) => {
  return api.get(`/userlists/${userId}`);
};

export const updateUserList = (userId, movieId, action) => {
  return api.put(`/userlists/${userId}`, { movieId, action });
};

// Get user profile (requires token)
export const getProfile = (token) => {
  return api.get('/users/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
