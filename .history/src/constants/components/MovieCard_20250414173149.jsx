export default MovieCard =()=><div className="film-card" key={film.id}>
                <img src={film.image} alt={film.title} />
                <div className="card-body">
                  <h5>{film.title}</h5>
                  <p>{film.year} | ⭐ {film.rating}</p>
                  <p>{film.description}</p>
                </div>
              </div>