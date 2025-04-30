import {Link} from 'react-router-dom';
import { IMAGE_URL } from '../constants';
export default function CastCard(actor) {
  return ( <div className="cast-card" key={actor.id}>
    <Link to={`/actor/${actor.id}`}>
      <img
        src={actor.profile_path
          ? `${IMAGE_URL}${actor.profile_path}`
          : "/placeholder-image.jpg"}
        alt={actor.name}
        className="cast-img" />
    </Link>
    <div className="cast-info">
      <h3 className="cast-name">{actor.name}</h3>
      <p className="cast-character">{actor.character}</p>
    </div>
  </div>
  );
}