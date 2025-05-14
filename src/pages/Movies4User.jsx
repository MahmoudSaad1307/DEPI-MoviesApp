import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_URL, API_KEY, ENDPOINTS } from "../constants/constants";
import MovieCard from "../constants/components/MovieCard";

export const Movies4User = () => {
  let { moviesType } = useParams();
  moviesType = moviesType.toString().toUpperCase();

  const { user } = useSelector((state) => state.user);
  const { watchlist, favorites, watched } = useSelector((state) => state.userMovies);
  const [fetchedMovies, setFetchedMovies] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async (movieIds) => {
      try {
        const results = await Promise.all(
          movieIds.map(async (id) => {
            const res = await fetch(
              `${BASE_URL}${ENDPOINTS.movies.details(id)}?api_key=${API_KEY}&language=en-US`
            );
            return await res.json();
          })
        );
        setFetchedMovies(results);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    let movieIds = [];
    console.log(favorites);
    
    if (moviesType === "WATCHLIST" && watchlist?.watchlist) {
      movieIds = watchlist.watchlist.map(movie => movie.movieId);
    } else if (moviesType === "FAVORITE" && favorites.favorites) {
      movieIds = favorites.favorites; 
    } else if (moviesType === "WATCHED" && watched?.watched) {
      movieIds = watched.watched.map(movie => movie.movieId);
    }

    if (movieIds.length > 0) {
      fetchMovieDetails(movieIds);
    } else {
      setFetchedMovies([]); 
    }
  }, [watchlist, favorites, watched, moviesType]);

  return (
    //   <h1 className="mb-5">
    //     {user.name.toUpperCase()}'s {moviesType}
    //   </h1>
    //   <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-5">
    //     {fetchedMovies.map((movie) => (
    //       <div>
    //         <MovieCard
    //           key={movie.id}
    //           movie={movie}
    //           isMovie={"movie"}
    //         />
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="container mt-5">

      <h2>{user.name.toUpperCase()}'s {moviesType}</h2>
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-4">
        {fetchedMovies.length > 0 ? (
          fetchedMovies.map((movie) => (
            <div>
            
            <MovieCard key={movie.id} movie={movie} isMovie={'movie'}/>
            
            </div>
          ))
        ) : (
          <p>No movies found in {moviesType.toLowerCase()}.</p>
        )}
      </div>
      </div>
  );
};

export default Movies4User;