import { createSlice } from "@reduxjs/toolkit";

//Setting initial state
const initialState = {
  recommend: null,
  newDisney: null,
  original: null,
  trending: null,
};

//Create Slice with slice name, intial state, and reducers to automatically generate action creators and action types that correspond to reducers and state
const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.recommend = action.payload.recommend;
      state.newDisney = action.payload.newDisney;
      state.original = action.payload.original;
      state.trending = action.payload.trending;
    },
  },
});

//Set setMovies to movieSlice.actions
export const { setMovies } = movieSlice.actions;
//Export functions
export const selectRecommend = (state) => state.movie.recommend;
export const selectNewDisney = (state) => state.movie.newDisney;
export const selectOriginal = (state) => state.movie.original;
export const selectTrending = (state) => state.movie.trending;

export default movieSlice.reducer;