import { createSlice } from '@reduxjs/toolkit';
import { setToken } from '../../utilites/auth';

const initialState = {
  token: null,
  isAuthenticated: false,
  user: null,
  reloadOnFirstTime: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { name, bio, photoURL } = action.payload; // Destructure the payload
      if (name) state.user.name = name; // Update only if provided
      if (bio) state.user.bio = bio;    // Update only if provided
      if (photoURL) state.user.photoURL = photoURL; // Update only if provided
    },

    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.reloadOnFirstTime = true;
      // state.
    },
disableReload:(state)=>{
state.reloadOnFirstTime = false;

}    ,
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout ,setUser,disableReload} = userSlice.actions;
export default userSlice.reducer;
