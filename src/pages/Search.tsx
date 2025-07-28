import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { SearchForm } from "../components/movies/SearchForm";
import { MovieCard } from "../components/movies/MovieCard";
import {
  setDefaultMovies,
  setError,
  setLoading,
  setSearchResults,
} from "../features/movies/moviesSlice";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import footer_bg from "../assets/images/footer-bg.webp";
import { searchMovies } from "../api/omdb";

export const Search = () => {
  const { searchResults, defaultMovies, isLoading, error } = useAppSelector(
    (state) => state.movies,
  );

  const dispatch = useAppDispatch();

  // Nettoyer les résultats quand on quitte la page
  useEffect(() => {
    return () => {
      dispatch(setSearchResults([]));
    };
  }, [dispatch]);

  useEffect(() => {
    const loadDefaultMovies = async () => {
      try {
        dispatch(setLoading(true));
        const movies = await searchMovies("batman");

        dispatch(setDefaultMovies(movies.Search));
      } catch (err) {
        dispatch(
          setError(`Impossible de charger les films par défaut : ${err}`),
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadDefaultMovies();

    return () => {
      dispatch(setSearchResults([]));
    };
  }, [dispatch]);

  const moviesToShow = searchResults.length > 0 ? searchResults : defaultMovies;

  console.log("moviesToShow =", moviesToShow);

  return (
    <div className="mx-auto h-screen">
      <div style={{ backgroundImage: `url(${footer_bg})` }} className="h-20" />

      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Rechercher des films</h1>

        <SearchForm />

        {isLoading && <div className="py-8 text-center">Chargement...</div>}

        {error && <div className="py-4 text-center text-red-500">{error}</div>}

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {moviesToShow.map((movie) => (
            <motion.div
              key={movie.imdbID}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link to={`/movie/${movie.imdbID}`}>
                <MovieCard movie={movie} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
