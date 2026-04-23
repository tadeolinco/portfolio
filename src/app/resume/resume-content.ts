export type JobBullet =
  | string
  | { intro: string; subItems: string[] };

export type JobEntry = {
  company: string;
  roles: { title: string; period: string }[];
  bullets: JobBullet[];
};

export type SideProject = {
  title: string;
  summary: string;
};

export const resume = {
  name: "Sam Bautista",
  title: "Frontend Engineer",
  focusLine: "Prefer startups and high-growth teams — ownership, pace, product-minded work.",
  phone: "+6593707275",
  email: "tadeolinco@gmail.com",
  links: [
    { label: "tadeolinco.dev", href: "https://tadeolinco.dev" },
    { label: "LinkedIn", href: "https://linkedin.com/in/tadeolinco" },
  ],
  skills: {
    frontend:
      "ReactJS, React Hooks, NextJS, Socket.io, CSS, TailwindCSS, Recoil, Redux, Jest, Cypress",
    backend:
      "NodeJS, NestJS, ExpressJS, TypeORM, Prisma 2, Supabase",
  },
  jobs: [
    {
      company: "Unravel Carbon",
      roles: [
        { title: "Senior Frontend Engineer", period: "April 2024 – present" },
        { title: "Frontend Engineer", period: "November 2022 – April 2024" },
      ],
      bullets: [
        "Developed features for a carbon accounting and decarbonization platform such as a revamped dashboard with exportable charts, facility comparison tool, climate program tool, portfolio management, intensity metrics management, data input tooling, data history, world’s first AI-assisted regulatory reporting framework (ISSB), asset registry, data export and auditing, ESG tooling, product carbon footprint tooling, feature flags.",
        {
          intro:
            "Took initiatives outside of the product roadmap to improve the platform.",
          subItems: [
            "Revamped company structure UI after customer feedback that it was harder to navigate and search with larger company structures.",
            "A “What’s new?” banner to educate users about new features in the platform.",
            "Quick search (⌘K) so power users can navigate a growing feature set more easily.",
          ],
        },
        "Upheld a strong product mindset in a fast-paced environment where requirements are always changing.",
        "Mentored other engineers for best practices in React.",
      ],
    },
    {
      company: "Pomelo Pay",
      roles: [
        { title: "Senior Frontend Engineer", period: "August 2022 – October 2022" },
      ],
      bullets: [
        "Updated legacy Redux to use more modern approaches for global state.",
        "Introduced the team to best practices in React.",
      ],
    },
    {
      company: "OOZOU",
      roles: [{ title: "Full-stack Engineer", period: "September 2021 – August 2022" }],
      bullets: [
        "Worked as a full-stack engineer on a client’s revamped learning management system.",
        "Used NextJS and NestJS to translate technical requirements from JIRA into new features, mostly for their admin CMS, course management platform, course session bookings, and email/notifications CMS.",
      ],
    },
    {
      company: "eFeed",
      roles: [{ title: "Product Engineer", period: "December 2020 – September 2021" }],
      bullets: [
        "Very early-stage startup aggregating third-party data from different apps as feeds, with supplementary features for a collaborative workflow.",
        "Implemented features such as rich text chat using SlateJS and Pusher, a Trello-like kanban for feed items from third-party apps, reminders, and activities.",
      ],
    },
    {
      company: "Insync",
      roles: [{ title: "Lead UI Engineer", period: "July 2019 – December 2020" }],
      bullets: [
        "Refactored 5+ year old code to modern React/JavaScript standards, enabling window resizing, responsive layouts, and significant performance gains (virtualization).",
        "Led a rehaul of the frontend using TypeScript and automated testing for higher confidence, plus state management practices to minimize unnecessary re-renders.",
      ],
    },
    {
      company: "Stratpoint",
      roles: [
        { title: "Frontend Software Developer", period: "July 2018 – July 2019" },
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
