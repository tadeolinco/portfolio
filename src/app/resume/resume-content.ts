export type JobBullet =
  | string
  | { intro: string; subItems: string[] };

export type JobRole = {
  title: string;
  period: string;
  /** ISO 8601 calendar date (YYYY-MM-DD) for structured data and parsers */
  startDate: string;
  /** End date, or `null` if current; ISO 8601 (YYYY-MM-DD) */
  endDate: string | null;
};

export type JobEntry = {
  company: string;
  roles: JobRole[];
  bullets: JobBullet[];
};

/** Public URL of this page (for JSON-LD, Open Graph, canonical) */
export const resumePageUrl = "https://tadeolinco.dev/resume" as const;

export type SideProject = {
  title: string;
  summary: string;
};

export const resume = {
  name: "Sam Bautista",
  title: "Frontend Engineer",
  focusLine:
    "Startups, high-growth teams: ownership, pace, product-minded work.",
  phone: "+6593707275",
  email: "tadeolinco@gmail.com",
  links: [
    { label: "tadeolinco.dev", href: "https://tadeolinco.dev" },
    { label: "LinkedIn", href: "https://linkedin.com/in/tadeolinco" },
  ],
  skills: [
    "ReactJS",
    "TanStack",
    "NextJS",
    "TailwindCSS",
    "MUI",
    "Playwright",
    "Supabase",
    "Typescript",
    "GitHub",
  ],
  jobs: [
    {
      company: "Unravel Carbon",
      roles: [
        {
          title: "Senior Frontend Engineer",
          period: "April 2024 to present",
          startDate: "2024-04-01",
          endDate: null,
        },
        {
          title: "Frontend Engineer",
          period: "November 2022 to April 2024",
          startDate: "2022-11-01",
          endDate: "2024-04-01",
        },
      ],
      bullets: [
        "Shipped frontend for Sustainability Copilot and AI agents (peer benchmarking, gap analysis, data collection), including chat UX, tool artifacts, and streaming workflows used by enterprise sustainability teams.",
        "Built a custom chart builder in 3 weeks as an alternative to a paid vendor integration estimated at $10K+, owning POC through production and iterating on 70+ post-launch feedback items.",
        "Primary frontend owner for production support: triaged 100+ customer-facing bugs, built in-app bug reporting (platform → Slack → Notion), and resolved 54 Notion tickets with ~24-minute median first response on urgent issues.",
        "Led frontend for enterprise data upload workflows (v1 and v2), including supplier collection, task mapping, OCR intake, and GHG category modules for fuel, waste, and refrigerants.",
      ],
    },
    {
      company: "Pomelo Pay",
      roles: [
        {
          title: "Senior Frontend Engineer",
          period: "August 2022 to October 2022",
          startDate: "2022-08-01",
          endDate: "2022-10-01",
        },
      ],
      bullets: [
        "Updated legacy Redux to use more modern approaches for global state.",
        "Introduced the team to best practices in React.",
      ],
    },
    {
      company: "OOZOU",
      roles: [
        {
          title: "Full-stack Engineer",
          period: "September 2021 to August 2022",
          startDate: "2021-09-01",
          endDate: "2022-08-01",
        },
      ],
      bullets: [
        "Worked as a full-stack engineer on a client’s revamped learning management system.",
        "Used NextJS and NestJS to translate technical requirements from JIRA into new features, mostly for their admin CMS, course management platform, course session bookings, and email/notifications CMS.",
      ],
    },
    {
      company: "eFeed",
      roles: [
        {
          title: "Product Engineer",
          period: "December 2020 to September 2021",
          startDate: "2020-12-01",
          endDate: "2021-09-01",
        },
      ],
      bullets: [
        "Very early-stage startup aggregating third-party data from different apps as feeds, with supplementary features for a collaborative workflow.",
        "Implemented features such as rich text chat using SlateJS and Pusher, a Trello-like kanban for feed items from third-party apps, reminders, and activities.",
      ],
    },
    {
      company: "Insync",
      roles: [
        {
          title: "Lead UI Engineer",
          period: "July 2019 to December 2020",
          startDate: "2019-07-01",
          endDate: "2020-12-01",
        },
      ],
      bullets: [
        "Refactored 5+ year old code to modern React/JavaScript standards, enabling window resizing, responsive layouts, and significant performance gains (virtualization).",
        "Led a rehaul of the frontend using TypeScript and automated testing for higher confidence, plus state management practices to minimize unnecessary re-renders.",
      ],
    },
    {
      company: "Stratpoint",
      roles: [
        {
          title: "Frontend Software Developer",
          period: "July 2018 to July 2019",
          startDate: "2018-07-01",
          endDate: "2019-07-01",
        },
      ],
      bullets: [
        "Built and maintained customized CMS-like admin dashboards for Globe, one of the Philippines’ major telecommunications companies, using ReactJS.",
        "Led the JavaScript side of the company’s first commercial React Native project.",
      ],
    },
  ] satisfies JobEntry[],
  sideProjects: [
    {
      title: "Can Book",
      summary:
        "Letterboxd-inspired showtimes board for Singapore and Philippines cinemas. Server Playwright scrapes across 8+ chains, normalizes rows into one poster grid with booking deep links, favourite venues, watchlist alerts, and a weekly digest email. TanStack Start, Supabase, Vercel Blob. canbook.sh.",
    },
    {
      title: "Expenses Tracker",
      summary:
        "Mobile-first expense logging and category trends; in daily use 2+ years. Next.js, Tailwind, Prisma, Supabase.",
    },
    {
      title: "Workout Tracker",
      summary:
        "Session logging with in-app timer and audio cues. Next.js, Tailwind, Prisma, Supabase.",
    },
  ] satisfies SideProject[],
  education: {
    school: "University of the Philippines Los Baños",
    degree: "BS Computer Science",
  },
} as const;
