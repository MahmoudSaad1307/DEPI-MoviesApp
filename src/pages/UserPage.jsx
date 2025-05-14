import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { BASE_URL, API_KEY, ENDPOINTS } from "../constants/constants";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import MovieCard from "../constants/components/MovieCard";
import "./UserPage.css";
// Include the CSS directly in the file

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { favorites, watched } = useSelector((state) => state.userMovies);
  const [favoriteFilms, setFavoriteFilms] = useState([]);
  const [recentlyWatched, setRecentlyWatched] = useState([]);
  const [ratingStats, setRatingStats] = useState([]);

  // Custom colors for the pie chart (more aesthetically pleasing)
  const COLORS = [
    "#FF5252",
    "#FF7B52",
    "#FFB452",
    "#FFD452",
    "#E2FF52",
    "#B5FF52",
    "#7DFF52",
    "#52FF7B",
    "#52FFB4",
    "#52FFE0",
  ];

  useEffect(() => {
    const fetchMovieDetails = async (movieIds) => {
      try {
        const results = await Promise.all(
          movieIds.map(async (id) => {
            const res = await fetch(
              `${BASE_URL}${ENDPOINTS.movies.details(
                id
              )}?api_key=${API_KEY}&language=en-US`
            );
            return await res.json();
          })
        );
        return results;
      } catch (error) {
        console.error("Error fetching movie details:", error);
        return [];
      }
    };

    // Fetch favorite films (limit to first 4 IDs)
    const fetchFavorites = async () => {
      if (favorites?.favorites?.length > 0) {
        const movieIds = favorites.favorites.slice(0, 4); // Limit to first 4
        const fetchedMovies = await fetchMovieDetails(movieIds);
        setFavoriteFilms(fetchedMovies);
      } else {
        setFavoriteFilms([]);
      }
    };

    // Fetch recently watched movies (sort by watchedAt and limit to first 4)
    const fetchRecentlyWatched = async () => {
      if (watched?.watched?.length > 0) {
        // Sort by watchedAt (newest first) and take first 4
        const sortedWatched = [...watched.watched]
          .sort((a, b) => new Date(b.watchedAt) - new Date(a.watchedAt))
          .slice(0, 4);
        const movieIds = sortedWatched.map((movie) => movie.movieId);
        const fetchedMovies = await fetchMovieDetails(movieIds);
        setRecentlyWatched(fetchedMovies);
      } else {
        setRecentlyWatched([]);
      }
    };

    // Calculate rating distribution from watched movies
    const calculateRatingStats = () => {
      if (!watched?.watched?.length) {
        setRatingStats([]);
        return;
      }

      // Initialize counts for ratings 1-10
      const ratingCounts = Array(10).fill(0);

      // Count occurrences of each rating
      watched.watched.forEach((movie) => {
        if (movie.rating && movie.rating >= 1 && movie.rating <= 10) {
          ratingCounts[movie.rating - 1]++;
        }
      });

      // Create data for the pie chart
      const data = ratingCounts
        .map((count, index) => ({
          name: `${index + 1}★`,
          value: count,
          rating: index + 1,
        }))
        .filter((item) => item.value > 0); // Only include ratings that have at least one movie

      setRatingStats(data);
    };

    fetchFavorites();
    fetchRecentlyWatched();
    calculateRatingStats();
  }, [favorites, watched]);

  // Custom tooltip for the pie chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-dark text-white p-2 rounded">
          <p className="mb-0">{`${payload[0].name}: ${payload[0].value} movie${
            payload[0].value !== 1 ? "s" : ""
          }`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {/* Inject CSS */}

      <div className="film-profile-container mt-4">
        <div className="container profile-header-container">
          <div className="row mb-4">
            <div className="col-md-8">
              <div className="d-flex align-items-start">
                <div className="profile-avatar me-4">
                  <img
                    src={user.photoURL}
                    alt="User avatar"
                    className="rounded-circle"
                  />
                </div>
                <div className="profile-info">
  <div className="d-flex align-items-center mb-2">
    <h1 className="profile-name me-3">{user?.name || "User"}</h1>
    <Link to={'/user/edit'}>
      <button className="btn btn-sm btn-edit-profile me-2">EDIT PROFILE</button>
    </Link>
  </div>
  <div className='bio'>
    <p>
      {user?.bio || "No bio available."}
    </p>
  </div>
</div>
                
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex justify-content-end profile-stats">
                <div className="text-center me-4">
                  <div className="stats-number">
                    {watched.watched?.length || 0}
                  </div>
                  <div className="stats-label fs-5">FILMS</div>
                </div>
              </div>
            </div>
          </div>
          <nav className="profile-nav container p-0">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/movies4User/watched">
                  Films
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/movies4User/watchlist">
                  Watch Later
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/movies4User/FAVORITE">
                  Favorites
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/myReviews" className="nav-link" href="#">
                  Reviews
                </Link>
              </li>
              
            </ul>
          </nav>
        </div>
        <div className="container main-content">
          <div className="row">
            <div className="col-md-8">
              <section className="mb-5">
                <h2 className="section-title">FAVORITE FILMS</h2>
                <div className="row row-cols-2 row-cols-sm-4 g-4">
                  {favoriteFilms.length > 0 ? (
                    favoriteFilms.map((film) => (
                      <div>
                                              <MovieCard key={film.id} movie={film} isMovie={"movie"} />

                      </div>
                    ))
                  ) : (
                    <p>No favorite films available.</p>
                  )}
                </div>
              </section>
              <section className="mb-5">
                <h2 className="section-title">RECENTLY WATCHED MOVIES</h2>
                <div className="row row-cols-2 row-cols-sm-4 g-4">
                  {recentlyWatched.length > 0 ? (
                    recentlyWatched.map((film) => (
                      <div>                      <MovieCard key={film.id} movie={film} isMovie={"movie"} />
</div>
                    ))
                  ) : (
                    <p>No recently watched movies available.</p>
                  )}
                </div>
              </section>
            </div>
            <div className="col-md-4">
              <section className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="section-title">RATINGS</h2>
                  <span className="stats-badge">
                    {user?.ratingsCount || watched.watched?.length || 0}
                  </span>
                </div>
                <div className="ratings-chart">
                  {ratingStats.length > 0 ? (
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart className="py-3">
                        <Pie
                          data={ratingStats}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                          nameKey="name"
                          label={({ name }) => name}
                          labelLine={false}
                        >
                          {ratingStats.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[entry.rating - (1 % COLORS.length)]}
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                          layout="horizontal"
                          verticalAlign="bottom"
                          align="center"
                          wrapperStyle={{ fontSize: "12px" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="text-center py-4">
                      <p>No rating data available.</p>
                      <p className="text-muted small">
                        Rate movies to see your distribution
                      </p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
