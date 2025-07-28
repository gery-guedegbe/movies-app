import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { searchMovies } from "../../api/omdb";
import {
  setSearchResults,
  setLoading,
  setError,
} from "../../features/movies/moviesSlice";
import { toast } from "react-hot-toast";
import { Search } from "lucide-react";

export const SearchForm = () => {
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      dispatch(setLoading(true));
      const result = await searchMovies(query);

      if (result.Response === "True") {
        dispatch(setSearchResults(result.Search));
      } else {
        dispatch(setError(result.Error || "Aucun résultat trouvé"));
        toast.error(result.Error || "Aucun résultat trouvé");
      }
    } catch (error) {
      dispatch(setError("Une erreur est survenue"));
      toast.error(`Une erreur est survenue: ${error}`);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mb-8 w-full max-w-xl">
      <div className="border-custom-red/60 focus:ring-custom-red flex items-center gap-2 rounded-full border px-4 py-2 shadow-sm transition outline-none">
        <Search className="h-5 w-5 text-gray-400" />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un film..."
          className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 outline-none"
          required
        />

        <button
          type="submit"
          className="bg-custom-red hover:bg-custom-red/7- cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium text-white transition"
        >
          Rechercher
        </button>
      </div>
    </form>
  );
};
