import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useAppSelector } from "../../app/hooks";
import { cn } from "../../utils/helper";
import throttle from "lodash.throttle";

export const Navbar = () => {
  const navigate = useNavigate();

  const favoritesCount = useAppSelector(
    (state) => state.movies.favorites.length,
  );
  const [isScrolled, setIsScrolled] = useState(false);

  // Rechargement au clic sur le nom du projet
  const refreshPage = () => {
    navigate("/");
    window.location.reload();
  };

  // Effet de scroll pour changer le fond de la navbar
  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }, 200); // limiter les appels

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-10 w-full py-[14.5px] transition-all duration-50 md:py-[16px]",
        isScrolled ? "bg-white shadow-md" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-[1140px] items-center justify-between px-4 py-1 sm:px-6 md:px-8 xl:px-0">
        {/* Logo / Nom du projet */}
        <button
          onClick={refreshPage}
          className={cn(
            "cursor-pointer text-2xl font-bold tracking-wide transition-colors duration-200",
            isScrolled ? "text-gray-800" : "text-white",
          )}
        >
          MovieFinder
        </button>

        {/* Navigation */}
        <ul className="flex items-center gap-6 text-sm font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  "text-sm font-bold transition-colors md:text-base",
                  isActive
                    ? "text-[#ff0000]"
                    : isScrolled
                      ? "text-gray-700"
                      : "text-white",
                )
              }
            >
              Acceuil
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                cn(
                  "text-sm font-bold transition-colors md:text-base",
                  isActive
                    ? "text-[#ff0000]"
                    : isScrolled
                      ? "text-gray-700"
                      : "text-white",
                )
              }
            >
              Recherche
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                cn(
                  "relative flex items-center text-gray-700 transition-colors hover:text-red-500",
                  isActive
                    ? "text-[#ff0000]"
                    : isScrolled
                      ? "text-gray-700"
                      : "text-white",
                )
              }
            >
              <FaHeart className="text-base md:text-xl" />

              {favoritesCount > 0 && (
                <span className="absolute -top-2 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {favoritesCount}
                </span>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
