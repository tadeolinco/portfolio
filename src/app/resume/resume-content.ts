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

export type ResumeVariantId =
  | "default"
  | "climate"
  | "ai"
  | "platform"
  | "floEnergy";

type UnravelBulletKey =
  | "copilot"
  | "chartBuilder"
  | "productionSupport"
  | "emissionsDashboards"
  | "dataUpload"
  | "platformQuality"
  | "customerWorkflows";

type ResumeVariant = {
  focusLine: string;
  skills?: readonly string[];
  unravelBulletKeys: readonly UnravelBulletKey[];
};

/**
 * Active variant for the public resume page.
 * Change when tailoring for a specific job post (see notes/resume-guidance.md).
 */
export const activeResumeVariantId = "floEnergy" satisfies ResumeVariantId;

const unravelBulletPool = {
  copilot:
    "Shipped frontend for Sustainability Copilot and AI agents (peer benchmarking, gap analysis, data collection), including chat UX, tool artifacts, and streaming workflows used by enterprise sustainability teams.",
  chartBuilder:
    "Built a custom chart builder in 3 weeks as an alternative to a paid vendor integration estimated at $10K+, owning POC through production and iterating on 70+ post-launch feedback items.",
  productionSupport:
    "Primary frontend owner for production support: triaged 100+ customer-facing bugs, built in-app bug reporting (platform → Slack → Notion), with ~24-minute median first response on urgent issues.",
  emissionsDashboards:
    "Shipped emissions dashboards and Track module UX (Scope 1/2/3 drill-down, benchmarking, time-series) for enterprise sustainability teams.",
  dataUpload:
    "Led frontend for enterprise data upload workflows (v1 and v2), including supplier collection, task mapping, OCR intake, and GHG category modules for fuel, waste, and refrigerants.",
  platformQuality:
    "Drove platform quality: Playwright E2E across environments, i18n (including Japanese), Sentry and PostHog observability, and security dependency fixes.",
  customerWorkflows:
    "Built customer-facing workflows across data collection, emissions dashboards, reporting, onboarding, and AI agents in a React/Next.js monorepo for B2B climate teams.",
} as const satisfies Record<UnravelBulletKey, string>;

export const resumeVariants = {
  default: {
    focusLine:
      "Senior frontend engineer: high-growth B2B product, enterprise UX, AI interfaces, shipping with ownership.",
    unravelBulletKeys: [
      "copilot",
      "chartBuilder",
      "productionSupport",
      "emissionsDashboards",
    ],
  },
  climate: {
    focusLine:
      "B2B climate SaaS: enterprise data workflows, Sustainability Copilot UX, production ownership.",
    unravelBulletKeys: [
      "copilot",
      "chartBuilder",
      "emissionsDashboards",
      "dataUpload",
    ],
  },
  ai: {
    focusLine:
      "Senior frontend engineer: AI copilot UX, streaming interfaces, and agent workflows in B2B product.",
    unravelBulletKeys: [
      "copilot",
      "chartBuilder",
      "platformQuality",
      "productionSupport",
    ],
  },
  platform: {
    focusLine:
      "Senior frontend engineer: platform quality, E2E testing, i18n, and design systems in production B2B apps.",
    unravelBulletKeys: [
      "chartBuilder",
      "platformQuality",
      "productionSupport",
      "emissionsDashboards",
    ],
  },
  floEnergy: {
    focusLine:
      "Senior frontend engineer for climate and energy products: React/Next.js customer journeys, AI interfaces, and production ownership.",
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "TanStack Query/Router/Table",
      "Tailwind CSS",
      "MUI",
      "Playwright E2E",
      "AI chat UX",
      "Design systems",
      "i18n",
      "Sentry/PostHog",
      "Supabase/Postgres",
    ],
    unravelBulletKeys: [
      "customerWorkflows",
      "copilot",
      "chartBuilder",
      "dataUpload",
      "platformQuality",
    ],
  },
} as const satisfies Record<ResumeVariantId, ResumeVariant>;

const defaultSkills = [
  "React",
  "TypeScript",
  "Next.js",
  "TanStack Query/Router/Table",
  "Tailwind CSS",
  "MUI",
  "Playwright E2E",
  "AI chat UX",
  "Design systems",
  "i18n",
  "Sentry/PostHog",
  "Supabase",
] as const;

const unravelCarbonJob = {
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
} as const;

const otherJobs = [
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
] satisfies JobEntry[];

function buildUnravelJob(bulletKeys: readonly UnravelBulletKey[]): JobEntry {
  return {
    company: unravelCarbonJob.company,
    roles: unravelCarbonJob.roles.map((role) => ({ ...role })),
    bullets: bulletKeys.map((bulletKey) => unravelBulletPool[bulletKey]),
  };
}

const activeVariant: ResumeVariant = resumeVariants[activeResumeVariantId];

export const resume = {
  name: "Sam Bautista",
  title: "Senior Frontend Engineer",
  location: "Singapore",
  focusLine: activeVariant.focusLine,
  phone: "+6593707275",
  email: "tadeolinco@gmail.com",
  links: [
    { label: "tadeolinco.dev", href: "https://tadeolinco.dev" },
    { label: "LinkedIn", href: "https://linkedin.com/in/tadeolinco" },
  ],
  skills: [...(activeVariant.skills ?? defaultSkills)],
  jobs: [buildUnravelJob(activeVariant.unravelBulletKeys), ...otherJobs],
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
