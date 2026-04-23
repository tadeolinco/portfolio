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
        {
          intro:
            "Shipped three flagship features on a React + Vite + GraphQL carbon accounting platform.",
          subItems: [
            "Data driller + audit trail: filterable / exportable data exploration and full activity log for data-heavy customers.",
            "Agents + AI: streaming chat, tool-use artifacts, and gating across agents dashboard, data review v2 + Unravel AI, and phase 1.2.",
            "Custom charts and dashboards: AI-assisted charts, drag-and-drop layout, and access controls.",
          ],
        },
        {
          intro: "Drove self-initiated platform work.",
          subItems: [
            "Version check: Vercel API + client prompt for stale cache; version bumps via Husky.",
            "Bug reports: in-app form with session recording, auto-filled context, webhook to backend.",
            "TypeScript: strict checks repo-wide; merged duplicate components into shared packages (~10.5k lines removed).",
          ],
        },
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
