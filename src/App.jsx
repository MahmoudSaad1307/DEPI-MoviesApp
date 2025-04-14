import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import ActorPage from "./pages/Actor";
import MoviesPage from "./pages/MoviesPage";
import TVShowsPage from "./pages/tvshows";
import UserEditPage from "./pages/UserEditPage";
import Watchlist from "./pages/Watchlist";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/user/edit" element={<UserEditPage />} />
        <Route path="/actor" element={<ActorPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/tv-shows" element={<TVShowsPage />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Route>
    </Routes>
  );
};

export default App;
