import { createSlice } from '@reduxjs/toolkit';

const trailerSlice = createSlice({
  name: 'trailer',
  initialState: {
    showTrailer: false,
  },
  reducers: {
    setTrailer(state, action) {
      state.showTrailer = true;
    },
    hideTrailer(state) {
      state.showTrailer = false;
    },
  },
});

export const { setTrailer, hideTrailer } = trailerSlice.actions;
export default trailerSlice.reducer;