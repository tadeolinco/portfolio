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
  href?: string;
};

export const resume = {
  name: "Sam Bautista",
  title: "Senior Frontend Engineer",
  location: "Singapore",
  focusLine:
    "B2B climate SaaS: enterprise data workflows, Sustainability Copilot UX, production ownership.",
  phone: "+6593707275",
  email: "tadeolinco@gmail.com",
  links: [
    { label: "tadeolinco.dev", href: "https://tadeolinco.dev" },
    { label: "LinkedIn", href: "https://linkedin.com/in/tadeolinco" },
  ],
  skills: [
    "React",
    "TypeScript",
    "Next.js",
    "TanStack Query/Router/Table",
    "Tailwind CSS",
    "MUI",
    "Playwright E2E",
    "Supabase",
    "i18n",
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
        "Primary frontend owner for production support: triaged 100+ customer-facing bugs, built in-app bug reporting (platform → Slack → Notion), with ~24-minute median first response on urgent issues.",
        "Shipped emissions dashboards and Track module UX (Scope 1/2/3 drill-down, benchmarking, time-series) for enterprise sustainability teams.",
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
      bullets: [],
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
        "Full-stack engineer on a client LMS rebuild (Next.js, NestJS): admin CMS, course management, session bookings, and notification tooling.",
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
        "Built rich text chat (SlateJS, Pusher), a Trello-like kanban for third-party feed items, reminders, and activity tracking at an early-stage startup.",
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
        "Built and maintained customized CMS-like admin dashboards for Globe, one of the Philippines’ major telecommunications companies, using React.",
        "Led the JavaScript side of the company’s first commercial React Native project.",
      ],
    },
  ] satisfies JobEntry[],
  sideProjects: [
    {
      title: "Can Book",
      href: "https://canbook.sh",
      summary:
        "Letterboxd-inspired showtimes board for Singapore and Philippines cinemas. Server Playwright scrapes across 8+ chains, normalizes rows into one poster grid with booking deep links, favourite venues, watchlist alerts, and a weekly digest email. TanStack Start, Supabase, Vercel Blob.",
    },
    {
      title: "Personal productivity apps",
      summary:
        "Expenses Tracker and Workout Tracker: mobile-first logging, category trends, in-app timers; in daily use 2+ years. Next.js, Tailwind, Prisma, Supabase.",
    },
  ] satisfies SideProject[],
  education: {
    school: "University of the Philippines Los Baños",
    degree: "BS Computer Science",
  },
} as const;
