export default MovieCard = (movie) => (
  <div className="film-card" >
    <img src={movie.image} alt={movie.title} />
    <div className="card-body">
      <h5>{film.title}</h5>
      <p>
        {film.year} | ⭐ {film.rating}
      </p>
      <p>{film.description}</p>
    </div>
  </div>
);
