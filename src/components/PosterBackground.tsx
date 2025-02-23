import { useEffect, useState } from "react";
import baseFilms from "../baseFilms.json";
import { PosterRow } from "./PosterRow";

type PosterBackgroundProps = {
  stopBlur: boolean;
  stopGrayscale: boolean;
  onChangePalette: (palette: [number, number, number][]) => void;
};

export function PosterBackground({
  stopBlur,
  stopGrayscale,
  onChangePalette,
}: PosterBackgroundProps) {
  const [rows, setRows] = useState(Math.ceil(window.innerHeight / 256) + 1);

  useEffect(() => {
    const handleResize = () => {
      setRows(Math.ceil(window.innerHeight / 256) + 1);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const rowSplit = Math.floor(baseFilms.length / rows);

  return (
    <div className="absolute max-h-dvh max-w-full overflow-hidden">
      <div className="flex flex-col -mt-[128px] gap-4">
        {Array.from({ length: rows }).map((_, index) => (
          <PosterRow
            key={index}
            startIndex={rowSplit * index}
            isReverse={index % 2 === 0}
            stopBlur={stopBlur}
            stopGrayscale={stopGrayscale}
            onChangePalette={onChangePalette}
          />
        ))}
      </div>
    </div>
  );
}
