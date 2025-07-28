import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../../types/movie";

interface MoviesState {
  favorites: Movie[];
  searchResults: Movie[];
  defaultMovies: Movie[];
  currentMovie: Movie | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  favorites: [],
  searchResults: [],
  defaultMovies: [],
  currentMovie: null,
  isLoading: false,
  error: null,
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Movie>) => {
      if (
        !state.favorites.some((movie) => movie.imdbID === action.payload.imdbID)
      ) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (movie) => movie.imdbID !== action.payload,
      );
    },
    setSearchResults: (state, action: PayloadAction<Movie[]>) => {
      state.searchResults = action.payload;
    },
    setCurrentMovie: (state, action: PayloadAction<Movie>) => {
      state.currentMovie = action.payload;
    },
    setDefaultMovies: (state, action: PayloadAction<Movie[]>) => {
      state.defaultMovies = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  setSearchResults,
  setCurrentMovie,
  setDefaultMovies,
  setLoading,
  setError,
} = moviesSlice.actions;

export default moviesSlice.reducer;
