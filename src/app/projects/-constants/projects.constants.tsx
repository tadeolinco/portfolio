import { ReactNode } from "react";

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
      image: string;
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
          I've always wanted to create a portfolio website, but lacked the
          inspiration for the design. I wanted a gimmick. I like film, and I
          just recently watched a{" "}
          <a
            href="https://www.youtube.com/watch?v=rC0HFwnK_5E&t=156s"
            target="_blank"
            className="underline"
          >
            YouTube clip
          </a>{" "}
          of the business card scene in American Psycho. So that was a start.
        </p>
        <p>
          Initially I just had a white version of the center card, and that's
          it. Played around with some CSS rotations, some gimmicks with
          subtitles, but ended up scrapping a lot of the ideas.
        </p>
        <p>
          Took a break and visited Letterboxd, and found out that I could
          apparently export my personal data. And there it was, a CSV of all my
          liked films, complete with names and shortlinks to each of their
          Letterboxd film pages.
        </p>
        <p>
          So I built a webscraper using Playwright to automatically get each
          film's poster from their site. What better way of making your site
          pretty than using something that's already pretty. Made a carousel à
          la netflix. Then hook up a window resize listener to check the number
          of carousels to render.
        </p>
        <p>
          Got some feedback that the posters were a bit too distractingly
          pretty, taking away attention from the important information (which
          was me).
        </p>
        <p>
          Played around with some CSS filters until I got a good combination of
          blur and grayscale to somewhat make them less eye catching, but with
          the carousel animation and different posters hopefully providing a
          nice texture to an otherwise boring site. However, that made me sad
          since the posters also warranted some love. So I brought back its
          liveliness on hover (interactivity++).
        </p>
        <p>
          I wanted more though. I needed a reason for them to still go back to
          the card, as they hovering over the posters. Landed with the idea of
          using the CSS rotations again and using a library (
          <a
            href="https://lokeshdhakar.com/projects/color-thief/"
            target="_blank"
            className="underline"
          >
            color-thief
          </a>
          ) to get the color palette of the film poster, and applying that to
          the card.
        </p>
        <p>
          Dominant color on the front card, secondary colors for the succeeding
          cards behind it, then calculating contrast values to know if the text
          should be black or white. Then another contrast check among the
          secondary colors, but now against the chosen text color to use as a
          accent for the border and my name's shadow. I especially like how it
          turned out for Old Boy.
        </p>
        <p>
          Heavy insipiration from{" "}
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
    image: "images/dashboards.jpeg",
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
          In Unravel Carbon, at this time, we recently incorporated Improvements
          Week, in where every quarter, we can work on anything we wanted to
          improve in the platform, be it small quality-of-life improvements or
          just addressing tech debt.
        </p>

        <p>
          Before we do this event, we usually gather feedback from the other
          teams, not just product and engineering.
        </p>

        <p>
          One such feedback was from one of our Sustainability Consultant
          interns, who wanted a better way of screenshotting the many charts
          that we have in the platform. Her use case was that when building
          sustainability reports for our clients, instead of building the chart
          herself from our exported data, she would just screenshot our charts
          from the platform straight up. However, this became tedious as it was
          prone to error and was hard to make the sizes consistent.
        </p>

        <p>
          So the team decided take the request in, especially since this didn't
          need effort from backend side.
        </p>

        <p>
          My approach was that I wanted ultimate flexibility for their exports,
          so I added a bunch of toggles. Don't want to include the chart title?
          Okay. No borders? Sure. No filters? No problem. Consistent widths? EZ.
          I even added an optional delay to when the picture snaps just in case
          they wanted to show a tooltip in the exported image, for example.
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
    image: "images/climate-program.jpeg",
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
    image: "images/ISSB.webp",
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
          I needed to track my own expenses, and what better way to fix my
          problems than creating my own app.
        </p>

        <p>
          Initially, I tried tracking everything in Google Sheets. The problem
          there was the UX of inputting new transaction on my phone was that
          good, and I ended up putting them in once I get home. I then either
          forgot the things I bought that day, or just forgot to put them in at
          all.
        </p>

        <p>
          Next, I tried YNAB, and other simple budgetting apps. I found out
          about myself that I didn't really want to budget, which is usually a
          core functionality of these apps. I just wanted to track where I spend
          my money, and then get insights from that data.
        </p>

        <p>
          So my key takeaways from my previous attempts of being more
          financially responsible was that first, I priorize the ease of use of
          putting the data in as quickly and conveniently as possible. Second,
          no budgets - just straight up tracking. For insights, I can make
          whatever chart I want later on if I see the use case for it.
        </p>

        <p>
          And then a PWA was made using NextJS, vercel for hosting, and supabase
          as the database. Didn't bother buying a domain since I never planned
          on letting anyone else use it. When I open it up, it goes directly to
          the create transcation page, and fills up any information that it can
          already assume from other settings, like currency, current tags, etc.
          Entering inputs smartly passes the focus onto the next input, and on
          and on, until it the next enter would submit the transaction
          altogether. Afterwards, I put my phone away and forget about it.
        </p>

        <p>I've been using it since May 2022 now.</p>
      </div>
    ),
  },
];
