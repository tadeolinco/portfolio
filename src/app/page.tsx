"use client";

import { Field, Label, Switch } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { isMobile } from "react-device-detect";
import { PosterBackground } from "../components/PosterBackground";
import { findMostContrastingColor } from "../utils";

export default function Home() {
  const [stopBlur, setStopBlur] = useState(false);
  const [stopGrayscale, setStopGrayscale] = useState(false);
  const [rotations, setRotations] = useState({ x: 0, y: 0 });
  const [palette, setPalette] = useState<[number, number, number][]>([
    [255, 255, 255],
  ]);
  const [thickness, setThickness] = useState(3);

  useEffect(() => {
    const maxRotation = 25;

    const mouseCallback = (event: MouseEvent) => {
      const x = event.x;
      const y = event.y;

      handleSetRotations(x, y);
    };

    const handleSetRotations = (x: number, y: number) => {
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;

      setRotations({
        y: ((x - containerWidth / 2) / containerWidth) * maxRotation,
        x: ((y - containerHeight / 2) / containerHeight) * maxRotation,
      });
    };

    window.addEventListener("mousemove", mouseCallback);

    return () => {
      window.removeEventListener("mousemove", mouseCallback);
    };
  }, []);

  const { mostContrastingColor, textColor, secondaryColors } = useMemo(() => {
    const textColor: [number, number, number] =
      palette[0]?.[0] * 0.299 +
        palette[0]?.[1] * 0.587 +
        palette[0]?.[2] * 0.114 >
      186
        ? [0, 0, 0]
        : [255, 255, 255];

    const secondaryColors = palette.slice(1);

    const mainColorTotal = palette[0]?.reduce((acc, curr) => acc + curr, 0);
    const secondaryColorsNotNearMain = secondaryColors.filter((color) => {
      const colorTotal = color.reduce((acc, curr) => acc + curr, 0);
      if (Math.abs(mainColorTotal - colorTotal) > 75) {
        return true;
      }
      return false;
    });

    const mostContrastingColor = findMostContrastingColor(
      secondaryColorsNotNearMain,
      textColor
    );

    return { mostContrastingColor, textColor, secondaryColors };
  }, [palette]);

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-black relative">
      {/* <div className="bottom-0 absolute right-0 z-10 bg-black p-1 rounded-tl-md">
        <p className="text-xs text-gray-300 whitespace-pre-line">
          I don't work in film, ah.
        </p>
      </div> */}
      <div className="bottom-0 absolute left-0 z-10 bg-black p-1 rounded-tr-md">
        <p className="text-xs text-gray-300 whitespace-pre-line">
          Posters from{" "}
          <a
            href="https://www.themoviedb.org/"
            className="underline"
            target="_blank"
          >
            TMDb
          </a>
        </p>
      </div>
      <div
        className="absolute bg-black cursor-pointer select-none p-1"
        role="button"
        style={{ bottom: 50, zIndex: 9999 }}
        onClick={() => {
          if (thickness > 20) {
            window.open(
              "https://youtu.be/rC0HFwnK_5E?si=3nYzRDxDXdaqjVHD&t=156",
              "_blank"
            );
          } else {
            setThickness(thickness + 1);
          }
        }}
      >
        <p className="text-white text-xs whitespace-pre text-center">
          &quot;The tasteful thickness of it&quot;
          <br />- American Psycho (2000)
        </p>
      </div>
      <div className="top-0 absolute right-0 z-10 bg-black p-2 rounded-bl-md">
        <Field className="flex items-center">
          <Switch
            checked={stopBlur}
            onChange={() => {
              setStopBlur(!stopBlur);
            }}
            className="group relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 data-[checked]:bg-green-600"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none inline-block size-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-4"
            />
          </Switch>
          <Label as="span" className="ml-3 text-sm">
            <span className="text-white text-xs">Sharp</span>
          </Label>
        </Field>
        <Field className="flex mt-2 items-center">
          <Switch
            checked={stopGrayscale}
            onChange={() => {
              setStopGrayscale(!stopGrayscale);
            }}
            className="group relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 data-[checked]:bg-blue-600"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none inline-block size-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-4"
            />
          </Switch>
          <Label as="span" className="ml-3 text-sm">
            <span className="text-white text-xs">Color</span>
          </Label>
        </Field>
      </div>

      <PosterBackground
        stopBlur={stopBlur}
        stopGrayscale={stopGrayscale}
        onChangePalette={(s) => {
          console.log(s);
          setPalette(s);
        }}
      />
      {Array.from({ length: thickness }).map((_, index, array) => {
        const color = secondaryColors[(index + 1) % secondaryColors.length];

        return (
          <div
            key={index}
            className="absolute p-4 flex flex-col gap-10 rounded-xl duration-300 ease-in-out border-2 mx-4"
            style={{
              maxWidth: 452,
              width: "calc(100% - 5rem)",
              height: 232,
              transform: `rotateX(${rotations.x * 2}deg) rotateY(${
                -rotations.y * 2
              }deg) translateZ(${(index + 1) * 10}px)`,
              transitionProperty: ["background-color", "border-color"]
                .concat(isMobile ? ["transform"] : [])
                .join(", "),
              zIndex: array.length - index,
              boxShadow:
                array.length - 1 === index
                  ? "rgba(0, 0, 0, 1) 0px 0px 100px 20px"
                  : "none",

              backgroundColor: color
                ? `rgb(${color[0]}, ${color[1]}, ${color[2]})`
                : "white",

              borderColor: mostContrastingColor
                ? `rgb(${mostContrastingColor[0]}, ${mostContrastingColor[1]}, ${mostContrastingColor[2]})`
                : "black",
            }}
          ></div>
        );
      })}
      <div
        className="p-4 flex duration-300 ease-in-out flex-col gap-10 rounded-xl border-2 mx-4"
        style={{
          maxWidth: 452,
          width: "calc(100% - 5rem)",
          height: 232,
          backgroundColor: `rgb(${palette[0]?.[0]}, ${palette[0]?.[1]}, ${palette[0]?.[2]})`,
          color: `rgb(${textColor[0]}, ${textColor[1]}, ${textColor[2]})`,
          transform: `rotateX(${rotations.x * 2}deg) rotateY(${
            -rotations.y * 2
          }deg)`,
          transitionProperty: ["background-color", "color", "border-color"]
            .concat(isMobile ? ["transform"] : [])
            .join(", "),
          zIndex: 1000,
          borderColor: mostContrastingColor
            ? `rgb(${mostContrastingColor[0]}, ${mostContrastingColor[1]}, ${mostContrastingColor[2]})`
            : "black",
        }}
        onMouseEnter={() => {
          setPalette([[255, 255, 255]]);
        }}
      >
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            <a
              href="https://www.linkedin.com/in/tadeolinco/"
              target="_blank"
              role="button"
              className="rounded-full p-1 hover:bg-gray-200"
            >
              <svg viewBox="0 0 24 24" role="presentation" className="w-6 h-6">
                <path
                  d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z"
                  style={{ fill: "currentcolor" }}
                ></path>
              </svg>
            </a>
            <a
              href="https://github.com/tadeolinco"
              target="_blank"
              role="button"
              className="rounded-full p-1 hover:bg-gray-200"
            >
              <svg viewBox="0 0 24 24" role="presentation" className="w-6 h-6">
                <path
                  style={{ fill: "currentcolor" }}
                  d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
                ></path>
              </svg>
            </a>
            <a
              href="https://letterboxd.com/tadeolinco/"
              target="_blank"
              role="button"
              className="rounded-full p-1 min-w-8 hover:bg-gray-200"
            >
              <Image
                src="https://a.ltrbxd.com/logos/letterboxd-decal-dots-pos-rgb-500px.png"
                className="w-6 min-w-6 h-6"
                alt="Letterboxd"
                width={24}
                height={24}
              />
            </a>
          </div>

          <div>
            <Link href="/projects" className="hover:underline" role="button">
              Projects
            </Link>
          </div>
        </div>
        <div className="flex flex-col text-center">
          <div className="flex justify-center">
            <div className="relative">
              <p className="font-bold z-10 text-3xl whitespace-pre">
                SA<span className="inline-block ml-[0.0625rem]">M</span>{" "}
                BAUTISTA
              </p>

              <p
                className="font-bold text-3xl absolute whitespace-pre"
                style={{
                  color: mostContrastingColor
                    ? `rgb(${mostContrastingColor[0]}, ${mostContrastingColor[1]}, ${mostContrastingColor[2]})`
                    : "transparent",
                  zIndex: -1,
                  top: -(rotations.x / 12.5) * 5,
                  right: (rotations.y / 12.5) * 5,
                }}
              >
                SA<span className="inline-block ml-[0.0625rem]">M</span>{" "}
                BAUTISTA
              </p>
            </div>
          </div>
          <p className="text-lg italic">JS Frontend Engineer</p>
        </div>
        <div className="flex justify-center gap-2 text-center">
          <a
            href="mailto:tadeolinco@gmail.com"
            target="_blank"
            role="button"
            className="hover:underline"
          >
            tadeolinco@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
