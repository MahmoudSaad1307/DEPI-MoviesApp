import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "../../src/redux/slices/userMoviesSlice";
import { api, getProfile } from "./api";

export const Test = () => {
  const { favorites } = useSelector((state) => state.userMovies);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    console.log(favorites);
  }, [favorites]);
  const fetchUser = async () => {
    try {
      const response = await getProfile(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTYwNWNkNDA0M2MwZTE2ZmQ1ZDM3YSIsImlhdCI6MTc0NjI4MDU2OCwiZXhwIjoxNzQ2ODg1MzY4fQ.Ju34yLQkg-5jZvKY8EeCsFjcNE5IkiT-sQXo1ct3f1k"
      );
      // console.log(response.data);

      dispatch(setFavorites({ favorites: response.data.movies.favorites }));
    } catch (error) {}
  };
  return (
    <button
      style={{ background: "teal" }}
      onClick={async () => {
        await api.patch("/users/681605cd4043c0e16fd5d37a/favorites", {
          movieId: 9,
        });
        await fetchUser();
      }}
    >
      I am button
    </button>
  );
};
