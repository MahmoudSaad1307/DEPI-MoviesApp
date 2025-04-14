import { Link } from "react-router-dom";

export default function MovieCard (props)  {
  const {movie,isMovie}=props;
  return ( 
    <Link
    to={`/movie-details/${movie.media_type}/${movie.id}`}
    className="movie-card-link"
  >
  <div className="film-card" >
    <img src={movie.image} alt={movie.title} />
    <div className="card-body">
      <h5>{movie.title}</h5>
      <p>
        {movie.year} | ⭐ {movie.rating}
      </p>
      <p>{movie.description}</p>
    </div>
  </div>
  </Link>
  )
};
