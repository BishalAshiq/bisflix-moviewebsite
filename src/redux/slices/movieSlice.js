import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [],
  loading: false,
  error: null,
  watchlist: [],
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addToWatchlist: (state, action) => {
      state.watchlist.push(action.payload);
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
  },
});

export const { setMovies, setLoading, setError, addToWatchlist, removeFromWatchlist } = movieSlice.actions;

export default movieSlice.reducer;
