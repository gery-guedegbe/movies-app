import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getMovieDetails } from "../api/omdb";
import {
  addToFavorites,
  removeFromFavorites,
} from "../features/movies/moviesSlice";

import { motion } from "framer-motion";
import { Movie } from "../types/movie";
import {
  notifyAddedToFavorites,
  notifyError,
  notifyRemovedFromFavorites,
} from "../components/Notifications";

import footer_bg from "../assets/images/footer-bg.webp";

export const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.movies);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Vérifie si le film est dans les favoris
  const isFavorite = favorites.some((fav) => fav.imdbID === id);

  // Récupère les détails du film
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        if (!id || !id.startsWith("tt")) {
          throw new Error("ID de film invalide");
        }

        setIsLoading(true);
        setError(null);

        const data = await getMovieDetails(id);

        if (data.Response === "False") {
          throw new Error(data.Error || "Film non trouvé");
        }

        setMovie(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Erreur inconnue";
        setError(message);
        notifyError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="border-custom-red h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="mb-4 text-red-500">{error}</p>

        <button
          onClick={() => (window.location.href = "/")}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  if (!movie) {
    return null; // ou un message d'erreur
  }

  // Gère l'ajout/suppression des favoris
  const handleFavoriteToggle = () => {
    if (!movie) return;

    if (isFavorite) {
      dispatch(removeFromFavorites(movie.imdbID));
      notifyRemovedFromFavorites();
    } else {
      dispatch(addToFavorites(movie));
      notifyAddedToFavorites();
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!movie) {
    return <div className="py-12 text-center">Film non trouvé</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-screen w-full"
    >
      {/* Image de fond floutée */}
      {/* <div
        className="absolute inset-0 -z-10 h-screen bg-black bg-cover bg-center brightness-[0.4]"
        style={{
          backgroundImage: `url(${movie.Poster})`,
        }}
      ></div> */}

      <div style={{ backgroundImage: `url(${footer_bg})` }} className="h-20" />

      {/* Contenu principal */}
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-10 px-6 py-12 md:flex-row md:items-center">
        {/* Colonne gauche - Infos du film */}
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold text-black">{movie.Title}</h1>

          <p className="mt-4 max-w-2xl text-base text-black">
            <span className="font-medium">Synopsis :</span> {movie.Plot}
          </p>

          <div className="mt-4 flex items-center gap-8 text-sm text-black">
            <p>
              <span className="font-medium">Note IMDb :</span>{" "}
              {movie.imdbRating} /10
            </p>
          </div>

          {/* Réalisateur */}
          <p>
            <span className="font-medium">Réalisateur :</span> {movie.Director}
          </p>

          {/* Acteurs */}
          <p>
            <span className="font-medium">Acteurs :</span> {movie.Actors}
          </p>

          {/* Langue */}
          <p>
            <span className="font-medium">Langue :</span> {movie.Language}
          </p>

          {/* Pays */}
          <p>
            <span className="font-medium">Pays :</span> {movie.Country}
          </p>

          <div className="mt-4 w-fit border border-black px-1 py-1.5 text-xs">
            {movie.Rated}
          </div>

          {/* Affichage des genres (catégories) */}
          {movie.Genre && (
            <div className="mt-6 flex flex-wrap gap-2">
              {movie.Genre.split(",").map((genre, index) => (
                <span
                  key={index}
                  className="border-customRed bg-customRed/10 text-customRed rounded-full border px-3 py-2 text-xs font-medium"
                >
                  {genre.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Boutons Netflix-style */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleFavoriteToggle}
              className="flex cursor-pointer items-center gap-2 rounded bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700"
            >
              {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            </button>

            <button className="flex cursor-pointer items-center gap-2 rounded border border-black px-6 py-3 text-sm font-semibold text-black transition hover:bg-white hover:text-black">
              + Ma Liste
            </button>
          </div>
        </div>

        {/* Colonne droite - Poster */}
        <div className="mt-8 w-full md:mt-0 md:w-[300px]">
          <img
            src={
              movie.Poster !== "N/A" ? movie.Poster : "/placeholder-movie.jpg"
            }
            alt={movie.Title}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </motion.div>
  );
};
