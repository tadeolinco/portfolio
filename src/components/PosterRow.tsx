import ColorThief from "colorthief";
import Image from "next/image";
import { memo, useRef } from "react";
import { isMobile } from "react-device-detect";
import baseFilms from "../baseFilms.json";
import { cdn } from "../staticImports";

type PosterRowProps = {
  startIndex: number;
  isReverse: boolean;
  stopBlur: boolean;
  stopGrayscale: boolean;
  onChangePalette: (palette: [number, number, number][]) => void;
};

function shuffleArray(array: (typeof baseFilms)[number][]) {
  // Create a clone of the array
  const clonedArray = [...array];

  // Fisher-Yates Shuffle
  for (let i = clonedArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [clonedArray[i], clonedArray[randomIndex]] = [
      clonedArray[randomIndex],
      clonedArray[i],
    ];
  }

  return clonedArray;
}

const colorThief = new ColorThief();

function UnmemoizedPosterRow(props: PosterRowProps) {
  const films = useRef(shuffleArray(baseFilms));

  const handleChangePalette = (
    film: (typeof baseFilms)[number],
    element: HTMLImageElement
  ) => {
    if (!element) return;
    try {
      const palette = colorThief.getPalette(element, 4);
      const mainColor = colorThief.getColor(element);
      if (!palette || palette.length === 0) {
        props.onChangePalette([[255, 255, 255]]);
      } else {
        props.onChangePalette(
          [mainColor].concat(
            palette.filter((color) => color.every((c, i) => c !== mainColor[i]))
          )
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const renderFilms = films.current
    .slice(props.startIndex)
    .concat(films.current.slice(0, props.startIndex))
    .map((film) => {
      const uriSplit = film["Letterboxd URI"].split("/");
      const uriSlug = uriSplit[uriSplit.length - 1];

      const Container = isMobile ? "div" : "a";

      const containerProps = isMobile
        ? {
            target: "_blank",
            href: film["Letterboxd URI"],
          }
        : {};

      return (
        <Container
          key={film["Name"]}
          className="w-40 block min-w-0 flex-shrink-0 h-60 touch-manipulation"
          onClick={() => {
            if (!isMobile) {
              window.open(film["Letterboxd URI"], "_blank");
            }
          }}
          onDoubleClick={() => {
            if (isMobile) {
              window.open(film["Letterboxd URI"], "_blank");
            }
          }}
          {...containerProps}
        >
          <Image
            src={cdn.posters[`poster${uriSlug}` as keyof typeof cdn.posters]}
            alt={film["Name"]}
            className={
              "h-full w-full rounded-md object-cover hover:scale-110 transition-all duration-300 filter cursor-pointer" +
              (!props.stopBlur ? " blur-[2px] hover:blur-0" : "") +
              (!props.stopGrayscale ? " grayscale hover:grayscale-0" : "")
            }
            crossOrigin="anonymous"
            onPointerEnter={(event) => {
              handleChangePalette(film, event.target as HTMLImageElement);
            }}
            onPointerDown={(event) => {
              event.currentTarget.releasePointerCapture(event.pointerId);
            }}
          />
        </Container>
      );
    });

  return (
    <div
      className={`flex gap-4 ${
        props.isReverse ? "marquee-reverse" : "marquee"
      }`}
      style={{
        width: 175.65217391304347 * baseFilms.length,
        animationDuration: `${baseFilms.length * 7}s`,
      }}
    >
      {renderFilms}
      {renderFilms}
    </div>
  );
}

export const PosterRow = memo(UnmemoizedPosterRow, (prevProps, nextProps) => {
  return (
    prevProps.stopBlur === nextProps.stopBlur &&
    prevProps.stopGrayscale === nextProps.stopGrayscale
  );
});
