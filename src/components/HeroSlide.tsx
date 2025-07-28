import { motion as m } from "motion/react";
import { Movie } from "../types/movie";
import { Link } from "react-router-dom";
import Poster from "./Poster";

interface HeroSlideProps {
  movie: Movie;
}

const HeroSlide = ({ movie }: HeroSlideProps) => {
  const fadeDown = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="container mx-auto flex h-full max-w-[1140px] flex-row items-center px-4 sm:gap-20 sm:px-6 md:px-8 lg:gap-32 xl:px-0">
      <m.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="flex max-w-2xl flex-col gap-4 text-white"
      >
        <m.h1
          variants={fadeDown}
          className="xs:text-3xl xs:leading-normal text-secColor xs:max-w-[320px] max-w-[280px] text-[28.75px] leading-snug font-extrabold sm:max-w-[420px] sm:text-4xl sm:leading-[1.2]"
        >
          {movie.Title}
        </m.h1>

        <m.p
          variants={fadeDown}
          className="xs:text-[15.75px] line-clamp-3 text-[14.25px] leading-relaxed sm:text-base"
        >
          {movie.Plot}
        </m.p>

        <m.p variants={fadeDown} className="text-lg">
          {movie.Year} • {movie.Genre || "Film"}
        </m.p>

        <m.div variants={fadeDown} className="mt-4 flex gap-4">
          <Link
            to={`/movie/${movie.imdbID}`}
            className="shadow-glow text-shadow text-secColor xs:text-[14.75px] xs:py-2 xs:px-5 rounded-full bg-[#ff0000] px-[18px] py-[8px] text-[13.75px] font-medium transition-all duration-300 hover:-translate-y-[2px] active:translate-y-[1px] sm:px-6 sm:text-base"
          >
            Regardez maintenant
          </Link>
        </m.div>
      </m.div>

      <Poster
        title={movie.Title}
        posterPath={movie.Poster}
        className="mr-auto"
      />
    </div>
  );
};

export default HeroSlide;
