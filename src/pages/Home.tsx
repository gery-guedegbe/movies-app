import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { searchMovies, getMovieDetails } from "../api/omdb";
import { MovieCard } from "../components/movies/MovieCard";
import { setSearchResults, setLoading } from "../features/movies/moviesSlice";
import { MovieSection } from "../components/movies/MovieSection";
import HeroSection from "../components/HeroSection";
import { Movie, MovieWithLocalPoster } from "../types/movie";
import { SearchBar } from "../components/SearchBar";

// Films spécifiques pour la HeroSection (avec leurs IDs IMDb et)
const featuredMoviesIds = [
  "tt0145487", // Spider-Man
  "tt5814060", // The Nun
  "tt2283362", // Jumanji
  "tt5433138", // Fast and Furious
];

const featuredImagesMap: Record<string, string> = {
  tt0145487: "/src/assets/images/spider-man-back.jpg",
  tt5814060: "/src/assets/images/the-nun-back.jpg",
  tt2283362: "/src/assets/images/jumanji-bacl.jpg",
  tt5433138: "/src/assets/images/fast-and-furious.jpg",
};

// Catégories de films
const categories = [
  { title: "Nouveautés", query: "2023" },
  { title: "Tendances", query: "popular" },
  { title: "Action", query: "action" },
  { title: "Comédies", query: "comedy" },
];

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredMovies, setFeaturedMovies] = useState<MovieWithLocalPoster[]>(
    [],
  );
  const dispatch = useAppDispatch();
  const { searchResults } = useAppSelector((state) => state.movies);

  // Récupération des films vedettes pour la HeroSection
  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        const movies = await Promise.all(
          featuredMoviesIds.map(async (id) => {
            const movie = await getMovieDetails(id);
            if (movie.Response === "True") {
              return {
                ...movie,
                localPoster: featuredImagesMap[id],
              };
            }
            return null;
          }),
        );

        setFeaturedMovies(movies.filter(Boolean) as Movie[]);
      } catch (error) {
        console.error("Error fetching featured movies:", error);
      }
    };

    fetchFeaturedMovies();
  }, []);

  // Recherche dynamique
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim()) {
        dispatch(setLoading(true));
        searchMovies(searchQuery)
          .then((result) => {
            if (result.Response === "True") {
              dispatch(setSearchResults(result.Search));
            }
          })
          .finally(() => dispatch(setLoading(false)));
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, dispatch]);

  return (
    <div className="">
      {/* Hero Section avec les films vedettes */}
      {featuredMovies.length > 0 && <HeroSection movies={featuredMovies} />}

      {/* Contenu principal */}
      <div className="container mx-auto mt-8 px-4">
        {/* Barre de recherche */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Résultats de recherche */}
        {searchQuery && (
          <div className="mx-auto mb-12 max-w-5xl space-y-12">
            <h2 className="mb-6 text-2xl font-bold">Résultats de recherche</h2>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                {searchResults.map((movie) => (
                  <MovieCard key={movie.imdbID} movie={movie} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Aucun résultat trouvé</p>
            )}
          </div>
        )}

        {/* Catégories de films (seulement si pas de recherche) */}
        {!searchQuery && (
          <div className="mx-auto max-w-5xl space-y-12">
            {categories.map((category) => (
              <MovieSection
                key={category.title}
                title={category.title}
                query={category.query}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
