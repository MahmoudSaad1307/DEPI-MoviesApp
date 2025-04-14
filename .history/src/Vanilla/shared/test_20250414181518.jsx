import { Link } from 'react-router-dom'
import { getGenreNames } from '../../constants/constants';

function Test( props) {
const  { movie, index, hoverWindow=false}= props;
const genreNames = getGenreNames(movie.genre_ids, movie).slice(0, 3);
log
console.log(movie.media_type);

  const title = movie.media_type === 'movie' ? movie.title : movie.name
  const year =
    movie.release_date?.substring(0, 4) ||
    movie.first_air_date?.substring(0, 4) ||
    ''

  return (
    <Link
      to={`/movie-details/${movie.media_type}/${movie.id}`}
      className="movie-card-link"
    >
      <div className="movie-card">
        <div className="image-container">
          <img src={IMAGE_URL + movie.poster_path} alt={title} />
          <div className="overlay"></div>
          <div className="rating">
            <i className="fa-solid fa-star"></i> {movie.vote_average.toFixed(1)}
          </div>
        </div>

        {index % 3 === 0 && <div className="top-badge">TOP 10</div>}
      </div>

      <div className="movie-title">{title}</div>

      {hoverWindow && (
        <div className="movie-detail">
          <div className="detail-backdrop">
            <img src={IMAGE_URL + movie.backdrop_path} alt={title} />
            <div className="detail-title">{title}</div>
          </div>
          <div className="detail-info">
            <div className="detail-meta">
              <div className="detail-rating">
                <i className="fa-solid fa-star"></i> {movie.vote_average.toFixed(1)}
              </div>
              <div className="detail-year-time">{year}</div>
            </div>
            <div className="detail-tags">
              {genreNames.map((name) => (
                <span className="tag" key={name}>{name}</span>
              ))}
              <span className="tag">{movie.media_type === 'movie' ? 'MOVIE' : 'TV'}</span>
            </div>
            <div className="detail-description">
              {movie.overview || 'No description available.'}
            </div>
          </div>
        </div>
      )}
    </Link>
  )
}

export default Test
