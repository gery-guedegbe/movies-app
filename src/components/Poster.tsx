import { memo } from "react";
import { m } from "motion/react";

import Image from "../components/ui/Image";
import { cn } from "../utils/helper";

interface PosterPropsType {
  posterPath: string;
  title: string;
  className?: string;
}

const Poster = ({ posterPath, title, className }: PosterPropsType) => {
  console.log("Poster URL:", posterPath);

  return (
    <div className={cn(`md:block hidden `, className)}>
      <m.div initial="hidden" animate="show" className="h-[380px] w-[254px]">
        <Image
          width={254}
          height={380}
          src={posterPath}
          alt={title}
          effect="zoomIn"
          className="h-[380px] w-[254px] bg-gray-800 "
        />
      </m.div>
    </div>
  );
};

export default memo(Poster);
