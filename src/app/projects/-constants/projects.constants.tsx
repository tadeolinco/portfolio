import { StaticImageData } from "next/image";
import { ReactNode } from "react";
import ISSBImage from "../../../../public/images/ISSB.webp";
import climateProgramImage from "../../../../public/images/climate-program.jpeg";
import dashboardImage from "../../../../public/images/dashboards.jpeg";

export type ProjectType = {
  title: string;
  startDate: Date;
  endDate: Date | null;
  description: string;
  technologies: string[];
  height: number;
  width: number;
  widthDivider?: number;
  content?: ReactNode;
} & (
  | {
      image?: never;
      video: string;
    }
  | {
      image: StaticImageData;
      video?: never;
    }
);

export const PROJECTS: ProjectType[] = [
  {
    title: "Portfolio Website",
    startDate: new Date("2024-01-15"),
    endDate: null,
    description: "Modern portfolio website built with React and TypeScript",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    height: 636,
    width: 1280,
    video: "videos/portfolio.mp4",
    content: (
      <div className="space-y-4 pb-4">
        <p>
          I&apos;ve always wanted to build a portfolio site, but could never
          nail down a design direction. I needed a gimmick. I like film, and I
          recently stumbled on a{" "}
          <a
            href="https://www.youtube.com/watch?v=rC0HFwnK_5E&t=156s"
            target="_blank"
            className="underline"
          >
            YouTube clip
          </a>{" "}
          of the business card scene from American Psycho. That felt like a good
          starting point.
        </p>
        <p>
          Started simple—just a white business card in the center. Experimented
          with CSS rotations and subtitle overlays, but scrapped most of it.
          Nothing quite clicked.
        </p>
        <p>
          Then I was browsing Letterboxd and discovered you can export your
          data. There it was: a CSV of all my liked films, complete with names
          and shortlinks to their pages. Perfect.
        </p>
        <p>
          Built a web scraper using Playwright to grab each film&apos;s poster.
          What better way to make a site visually interesting than borrowing
          from things that are already beautiful? Created a Netflix-style
          carousel, hooked up a window resize listener to calculate how many
          rows to render.
        </p>
        <p>
          Got feedback that the posters were too distracting—pulling attention
          away from the actual content (aka me). Fair point.
        </p>
        <p>
          Played with CSS filters until I found the right balance of blur and
          grayscale. Toned down enough to not compete for attention, but still
          adding nice texture to an otherwise plain site. Made me a bit sad to
          mute those beautiful posters though, so I brought them back to life on
          hover. Interactivity++.
        </p>
        <p>
          But I wanted more. Needed to give people a reason to look back at the
          card while they&apos;re hovering over posters. That&apos;s when I got
          the idea to extract color palettes using{" "}
          <a
            href="https://lokeshdhakar.com/projects/color-thief/"
            target="_blank"
            className="underline"
          >
            color-thief
          </a>{" "}
          and apply them to the card in real-time.
        </p>
        <p>
          Dominant color goes on the front card, secondary colors on the ones
          behind. Calculate contrast ratios to determine whether text should be
          black or white. Then another contrast check against the secondary
          colors to pick an accent for borders and text shadows. The Old Boy
          poster makes this look especially good.
        </p>
        <p>
          Heavy inspiration from{" "}
          <a href="https://rauno.me/" target="_blank" className="underline">
            rauno.me
          </a>
        </p>
      </div>
    ),
  },

  {
    title: "Unravel Carbon - Dashboards",
    startDate: new Date("2024-01-15"),
    endDate: null,
    description: "Dashboards built with React and TypeScript",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    height: 1293,
    width: 1035,
    image: dashboardImage,
  },
  {
    title: "Unravel Carbon - Chart Export",
    startDate: new Date("2024-01-15"),
    endDate: null,
    description: "Export built with React and TypeScript",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    height: 457,
    width: 800,
    video: "videos/chart-export.mp4",
    content: (
      <div className="space-y-4 pb-4">
        <p>
          At Unravel Carbon, we run an Improvements Week every quarter where
          anyone can work on platform enhancements—everything from small
          quality-of-life fixes to tackling tech debt. Before each one, we
          gather feedback from across the company, not just product and
          engineering.
        </p>

        <p>
          One request came from a Sustainability Consultant intern who was
          struggling with how she had to screenshot charts. When building client
          reports, she&apos;d take screenshots of our platform charts instead of
          rebuilding them from exported data. Made sense, but it was
          tedious—prone to errors and impossible to keep sizes consistent.
        </p>

        <p>
          We took it on, especially since it was purely frontend work. No
          backend involvement needed.
        </p>

        <p>
          I went all-in on flexibility. Added toggles for everything. Don&apos;t
          want the chart title? Gone. Borders? Optional. Filters? Your call.
          Want consistent widths across all exports? Easy. Even threw in an
          optional delay before the snapshot, so you could capture tooltips or
          hover states if needed.
        </p>

        <p>
          Turned what used to be a frustrating manual process into something
          actually pleasant to use. Small features, big impact.
        </p>
      </div>
    ),
  },
  {
    title: "Unravel Carbon - Compare Facilities",
    startDate: new Date("2024-01-15"),
    endDate: null,
    description: "Export built with React and TypeScript",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    height: 471,
    width: 800,
    video: "videos/compare.mp4",
  },
  {
    title: "Unravel Carbon - Climate Program",
    startDate: new Date("2024-01-15"),
    endDate: null,
    description: "Dashboard built with React and TypeScript",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    height: 938,
    width: 2500,
    image: climateProgramImage,
  },
  {
    title: "Unravel Carbon - Portfolio Module",
    startDate: new Date("2024-01-15"),
    endDate: null,
    description: "Dashboard built with React and TypeScript",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    height: 1254,
    width: 2400,
    video: "videos/portfolio-module.mp4",
  },
  {
    title: "Unravel Carbon - Data upload revamp",
    startDate: new Date("2024-01-15"),
    endDate: null,
    description: "Dashboard built with React and TypeScript",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    height: 453,
    width: 800,
    video: "videos/data-flow.mp4",
  },
  {
    title: "Unravel Carbon - Data history",
    startDate: new Date("2024-01-15"),
    endDate: null,
    description: "Dashboard built with React and TypeScript",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    height: 720,
    width: 1148,
    video: "videos/data-history.mp4",
  },
  {
    title: "Unravel Carbon - ISSB",
    startDate: new Date("2024-01-15"),
    endDate: null,
    description: "Dashboard built with React and TypeScript",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    height: 1280,
    width: 2048,
    image: ISSBImage,
  },
  {
    title: "Unravel Carbon - Assets Management",
    startDate: new Date("2024-01-15"),
    endDate: null,
    description: "Dashboard built with React and TypeScript",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    height: 450,
    width: 800,
    video: "videos/assets.mp4",
  },
  {
    title: "Unravel Carbon - Data export",
    startDate: new Date("2024-01-15"),
    endDate: null,
    description: "Dashboard built with React and TypeScript",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    height: 446,
    width: 800,
    video: "videos/data-export.mp4",
  },
  {
    title: "Unravel Carbon - Audit Trail",
    startDate: new Date("2024-01-15"),
    endDate: null,
    description: "Dashboard built with React and TypeScript",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    height: 450,
    width: 800,
    video: "videos/audit.mp4",
  },
  {
    title: "Unravel Carbon - Company Builder",
    startDate: new Date("2024-01-15"),
    endDate: null,
    description: "Dashboard built with React and TypeScript",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    height: 456,
    width: 800,
    video: "videos/company-builder.mp4",
  },
  {
    title: "Unravel Carbon - Quick Search",
    startDate: new Date("2024-01-15"),
    endDate: null,
    description: "Dashboard built with React and TypeScript",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    height: 718,
    width: 1276,
    video: "videos/quick-search.mp4",
  },
  {
    title: "Insync - Cloud storage syncing",
    startDate: new Date("2024-01-15"),
    endDate: null,
    description: "Dashboard built with React and TypeScript",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    height: 689,
    width: 798,
    video: "videos/insync.mp4",
  },
  {
    title: "Gastos - Expenses tracker",
    startDate: new Date("2024-01-15"),
    endDate: null,
    description: "Modern portfolio website built with React and TypeScript",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    height: 1080,
    width: 540,
    widthDivider: 2,
    video: "videos/gastos.mp4",
    content: (
      <div className="space-y-4 pb-4">
        <p>
          I needed to track my expenses. And what better way to solve your own
          problems than building your own app?
        </p>

        <p>
          First attempt: Google Sheets. The mobile UX was rough enough that
          I&apos;d just wait until I got home to input transactions. By then,
          I&apos;d either forget what I bought or forget to log it entirely.
        </p>

        <p>
          Next up: YNAB and similar budgeting apps. Learned pretty quickly that
          I don&apos;t actually want to budget—which is ironically the core
          feature of these apps. I just wanted to track where my money goes and
          extract insights from the data.
        </p>

        <p>
          Two key takeaways emerged: First, prioritize speed and ease of input
          above everything else. Second, skip the budgeting—just track
          everything and build whatever charts I need later.
        </p>

        <p>
          Built a PWA with Next.js, hosted on Vercel, with Supabase as the
          backend. Never bothered with a domain since it&apos;s just for me.
          Opens straight to the transaction form, pre-fills everything it can
          infer (currency, recent tags, etc.). Hit enter, focus jumps to the
          next field. Keep going until the final enter submits. Phone goes back
          in pocket, done.
        </p>

        <p>Been using it since May 2022.</p>
      </div>
    ),
  },
];
