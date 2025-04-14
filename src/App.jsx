import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import ActorPage from "./pages/Actor";
import MoviesPage from "./pages/MoviesPage";
import TVShowsPage from "./pages/tvshows";
import MovieDetails from "./pages/MovieDetails";
import UserEditPage from "./pages/UserEditPage";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie-details/:media_type/:id" element={<MovieDetails />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/user/edit" element={<UserEditPage />} />
        <Route path="/actor" element={<ActorPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/tv-shows" element={<TVShowsPage />} />
      </Route>
    </Routes>
  );
};

export default App;
