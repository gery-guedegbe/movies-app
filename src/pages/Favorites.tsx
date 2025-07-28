import { useAppSelector, useAppDispatch } from "../app/hooks";
import { removeFromFavorites } from "../features/movies/moviesSlice";
import { MovieCard } from "../components/movies/MovieCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

import footer_bg from "../assets/images/footer-bg.webp";

export const Favorites = () => {
  const { favorites } = useAppSelector((state) => state.movies);
  const dispatch = useAppDispatch();

  const handleRemoveFavorite = (id: string) => {
    dispatch(removeFromFavorites(id));
    toast.success("Retiré des favoris", {
      icon: "❤️",
      position: "bottom-right",
    });
  };

  if (favorites.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative flex min-h-screen w-full flex-col text-center"
      >
        {/* Header visuel */}
        <div
          style={{ backgroundImage: `url(${footer_bg})` }}
          className="h-20 w-full"
        />

        <div className="mx-auto mt-14 mb-6 flex max-w-md flex-col items-center justify-center space-y-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="Empty state"
            className="mx-auto h-32 w-32 opacity-70"
          />

          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            Aucun film ajouté en favori
          </h2>

          <p className="mt-2 text-gray-500">
            Explore notre catalogue pour commencer à ajouter des favoris.
          </p>

          <Link
            to="/search"
            className="bg-custom-red hover:bg-custom-red/60 mt-3 rounded-full px-6 py-3 text-white transition"
          >
            🔍 Rechercher des films
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen"
    >
      {/* Header visuel */}
      <div style={{ backgroundImage: `url(${footer_bg})` }} className="h-20" />

      {/* Liste des favoris */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {favorites.map((movie) => (
          <motion.div
            key={movie.imdbID}
            layout
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <MovieCard
              movie={movie}
              isFavorite={true}
              onRemoveFromFavorites={handleRemoveFavorite}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
