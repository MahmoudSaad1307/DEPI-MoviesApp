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

export const addReview = (props) => {
  const { userId, movieId, content, mediaType } = props;

  return api.post(`/reviews/${mediaType}`, { userId, movieId, content });
};
export const getProfile = (token) => {
  return api.get('/users/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const toggleFavorite = (props) => {
  const { userId, movieId } = props;
  
  return api.post(`/users/${userId}/favorites`, {
  movieId
  });
};
export const getMyReviews=(props)=>{

  const {userId}=props
  
  return api.get(`/reviews/myReviews/${userId}`)

}
