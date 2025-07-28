import { Search } from "lucide-react";
import React from "react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="relative mx-auto my-8 max-w-xl"
    >
      <Search
        className="text-custom-red/60 absolute top-1/2 left-3 -translate-y-1/2"
        size={20}
      />

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Rechercher un film..."
        className="focus:border-custom-red border-custom-red/70 w-full rounded-full border bg-white px-10 py-2.5 text-sm text-gray-800 placeholder-gray-400 shadow-sm transition outline-none md:text-base"
      />
    </form>
  );
};
