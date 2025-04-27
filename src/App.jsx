import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import ActorPage from "./pages/Actor";
import MoviesPage from "./pages/MoviesPage";
import TVShowsPage from "./pages/tvshows";
import MovieDetails from "./pages/MovieDetails";
import UserEditPage from "./pages/UserEditPage";
import UserLoginPage from "./pages/LoginPage";
import Watchlist from "./pages/Watchlist";
import Recommendation from "./pages/Recommendation";
import SignUp from "./pages/SignUp";


import { registerUser } from "./api/api";

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
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<UserLoginPage />} />
      </Route>
    </Routes>
  );
};

export default App;

// <button
//   style={{ background: "red" }}
//   onClick={async () => {
//     try {
//       await registerUser(
//         "Mahmoud ahmed",
//         "mahmod2004saad@gmail.com",
//         "123456"
//       );
//       console.log("Success");
//     } catch (error) {
//       if (error.response) {
//         console.log("Error data:", error.response.data);
//         console.log("Error status:", error.response.status);
//       }
//     }
//   }}
// >
//   click
// </button>