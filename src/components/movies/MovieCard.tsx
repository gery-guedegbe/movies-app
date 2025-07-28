import { motion } from "framer-motion";
import { Movie } from "../../types/movie";
import { Link } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
  onAddToFavorites?: (movie: Movie) => void;
  isFavorite?: boolean;
  onRemoveFromFavorites?: (id: string) => void;
}

export const MovieCard = ({
  movie,
  onAddToFavorites,
  isFavorite,
  onRemoveFromFavorites,
}: MovieCardProps) => {
  return (
    <motion.div
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition hover:shadow-xl"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder-movie.jpg"}
        alt={movie.Title}
        className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
      />

      <div className="flex flex-grow flex-col p-4">
        <h3 className="mb-1 line-clamp-2 text-lg font-semibold text-gray-800">
          {movie.Title}
        </h3>

        <p className="mb-4 text-sm text-gray-500">{movie.Year}</p>

        {/* {movie.Genre && (
          <div className="mb-3 flex flex-wrap gap-2">
            {movie.Genre.split(",").map((genre) => (
              <span
                key={genre.trim ()}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm"
              >
                {genre.trim()}
              </span>
            ))}
          </div>
        )} */}

        <div className="mt-auto space-y-2">
          {/* Bouton Voir détails */}
          <Link
            to={movie.imdbID?.startsWith("tt") ? `/movie/${movie.imdbID}` : "#"}
            className={`bg-custom-red hover:bg-custom-red/70 block w-full rounded-md px-4 py-2 text-center text-sm font-medium text-white transition ${
              !movie.imdbID?.startsWith("tt")
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            onClick={(e) => {
              if (!movie.imdbID?.startsWith("tt")) {
                e.preventDefault();
                alert("ID de film invalide");
              }
            }}
          >
            Voir détails
          </Link>

          {/* Boutons Favoris */}
          {onAddToFavorites && !isFavorite && (
            <button
              onClick={() => onAddToFavorites(movie)}
              className="bg-customRed w-full cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              Ajouter aux favoris
            </button>
          )}

          {isFavorite && onRemoveFromFavorites && (
            <button
              onClick={() => onRemoveFromFavorites(movie.imdbID)}
              className="w-full cursor-pointer rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              Retirer des favoris
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
