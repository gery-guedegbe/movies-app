import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { searchMovies } from "../../api/omdb";
import { MovieCard } from "./MovieCard";
import { setLoading } from "../../features/movies/moviesSlice";
import { Movie } from "../../types/movie";

interface MovieSectionProps {
  title: string;
  query: string;
}

export const MovieSection = ({ title, query }: MovieSectionProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    searchMovies(query)
      .then((result) => {
        if (result.Response === "True") {
          setMovies(result.Search);
        }
      })
      .finally(() => dispatch(setLoading(false)));
  }, [query, dispatch]);

  return (
    <section className="mb-12">
      {movies && (
        <>
          <h2 className="mb-6 text-2xl font-bold">{title}</h2>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {movies.slice(0, 4).map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
