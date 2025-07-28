import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import { MovieWithLocalPoster } from "../types/movie";
import HeroSlide from "../components/HeroSlide";
import { useRef } from "react";

interface HeroProps {
  movies: MovieWithLocalPoster[];
}

const HeroSection = ({ movies }: HeroProps) => {
  const swiperRef = useRef<SwiperRef>(null);

  // Sélectionnez seulement 4 films pour le carrousel
  const featuredMovies = movies.slice(0, 4);

  return (
    <Swiper
      ref={swiperRef}
      className="mySwiper xs:h-[520px] h-[460px] w-full sm:h-[640px] lg:h-screen"
      loop={true}
      slidesPerView={1}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
    >
      {featuredMovies.map((movie) => (
        <SwiperSlide
          key={movie.imdbID}
          style={{
            backgroundImage: `
              linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.5)),
              url('${
                movie.Poster !== "N/A" ? movie.localPoster : movie.Poster
              }')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="h-full w-full"
        >
          <HeroSlide movie={movie} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSection;
