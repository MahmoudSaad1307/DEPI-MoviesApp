import { Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import ActorPage from './pages/Actor';
import MoviesPage from './pages/MoviesPage';
import TVShowsPage from './pages/tvshows';
import MovieDetails from './pages/MovieDetails';
import UserEditPage from './pages/UserEditPage';
import Watchlist from './pages/Watchlist';
import Recommendation from './pages/Recommendation';
import SignUp from './pages/SignUp';
import UserLoginPage from './pages/LoginPage';
import MyReviews from './pages/MyReviews';
import WhatIsMovie from './pages/WhatIsMovie';
import './pages/styles.css';
import GlobalStyle from './constants/GlobalStyling';
import Movies4User from './pages/Movies4User';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getToken, setToken } from './utilites/auth';
import { disableReload } from './redux/slices/userSlice';
import { signInWithGoogle } from './firebase/firebaseServices';

const App = () => {
  console.log(window.bootstrap, 'boobobobob');
  const { token,user,reloadOnFirstTime } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    
    setToken(token);
    console.log(getToken(), "token");

  }, [user]);

  useEffect(() => {
    
    console.log("waiting..");
    if (reloadOnFirstTime){
      dispatch(disableReload())
      console.log("reload..");
      window.location.reload();
    }
  },[])


  return (
    <>
      <GlobalStyle />

      
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie-details/:media_type/:id" element={<MovieDetails />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/user/edit" element={<UserEditPage />} />
          <Route path="/actor/:id" element={<ActorPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/tvshows" element={<TVShowsPage />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="/myReviews" element={<MyReviews />} />
          <Route path="/whatIsMovie" element={<WhatIsMovie />} />
          <Route path="/movies4User/:moviesType" element={<Movies4User />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
/*
<div style={{height:"5000px"}} className="d-flex h-100 justify-content-center align-items-center bg-dark text-center">
        <button onClick={signInWithGoogle}>CLick Me ,I am a google sign in button</button>
      </div>
*/