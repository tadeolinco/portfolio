import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Link from "next/link";
import type { JobBullet } from "./resume-content";
import { resume } from "./resume-content";

const resumeSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
});

function JobBulletItem({ bullet }: { bullet: JobBullet }) {
  if (typeof bullet === "string") {
    return <li className="pl-1">{bullet}</li>;
  }
  return (
    <li className="pl-1">
      <p>{bullet.intro}</p>
      <ul className="mt-2 list-[circle] space-y-1.5 pl-4 text-neutral-700 marker:text-neutral-300">
        {bullet.subItems.map((item, j) => (
          <li key={j} className="pl-0.5">
            {item}
          </li>
        ))}
      </ul>
    </li>
  );
}

export const metadata: Metadata = {
  title: "Resume — Sam Bautista",
  description:
    "Sam Bautista — Frontend Engineer. Startups and high-growth teams. Technical skills, employment history, side projects, and education.",
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 mt-14 border-b border-neutral-200 pb-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-neutral-500 first:mt-0 sm:text-xs">
      {children}
    </h2>
  );
}

const contactItems = [
  {
    key: "phone",
    node: (
      <a
        className="text-neutral-800 underline decoration-neutral-300 underline-offset-2 transition hover:decoration-neutral-500"
        href={`tel:${resume.phone.replace(/\s/g, "")}`}
      >
        {resume.phone}
      </a>
    ),
  },
  {
    key: "email",
    node: (
      <a
        className="text-neutral-800 underline decoration-neutral-300 underline-offset-2 transition hover:decoration-neutral-500"
        href={`mailto:${resume.email}`}
      >
        {resume.email}
      </a>
    ),
  },
  ...resume.links.map((link) => ({
    key: link.href,
    node: (
      <a
        className="text-neutral-800 underline decoration-neutral-300 underline-offset-2 transition hover:decoration-neutral-500"
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {link.label}
      </a>
    ),
  })),
];

export default function ResumePage() {
  return (
    <div
      className={`${resumeSans.className} min-h-dvh bg-neutral-100 text-neutral-800 antialiased`}
    >
      <div className="mx-auto w-full max-w-[42rem] px-4 py-8 sm:px-6 sm:py-12 lg:max-w-[48rem]">
        <article className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-neutral-200/80">
          <header className="border-b border-neutral-100 bg-gradient-to-b from-white to-neutral-50/80 px-6 py-8 sm:px-10 sm:py-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
              <div className="min-w-0 flex-1 space-y-3">
                <div>
                  <h1 className="text-[1.65rem] font-semibold tracking-tight text-neutral-900 sm:text-3xl sm:tracking-tight">
                    {resume.name}
                  </h1>
                  <p className="mt-1.5 text-[0.95rem] text-neutral-600 sm:text-base">
                    {resume.title}
                  </p>
                </div>
                <p className="max-w-lg text-sm leading-relaxed text-neutral-600">
                  {resume.focusLine}
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex w-fit shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white px-3.5 py-2 text-sm font-medium text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900"
              >
                ← Home
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-1 gap-y-2 text-sm text-neutral-700">
              {contactItems.map((item, i) => (
                <span key={item.key} className="contents">
                  {i > 0 ? (
                    <span
                      className="mx-1.5 select-none text-neutral-300"
                      aria-hidden
                    >
                      ·
                    </span>
                  ) : null}
                  {item.node}
                </span>
              ))}
            </div>
          </header>

          <main className="px-6 pb-10 pt-2 sm:px-10 sm:pb-12">
            <section aria-labelledby="skills-heading">
              <SectionTitle>
                <span id="skills-heading">Technical skills</span>
              </SectionTitle>
              <ul className="grid gap-5 text-sm leading-relaxed text-neutral-700 md:grid-cols-2 md:gap-x-10">
                <li className="min-w-0">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Frontend
                  </span>
                  {resume.skills.frontend}
                </li>
                <li className="min-w-0">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Backend
                  </span>
                  {resume.skills.backend}
                </li>
              </ul>
            </section>

            <section aria-labelledby="employment-heading">
              <SectionTitle>
                <span id="employment-heading">Employment history</span>
              </SectionTitle>
              <ol className="space-y-12">
                {resume.jobs.map((job) => (
                  <li key={job.company}>
                    <article className="space-y-3">
                      <h3 className="text-base font-semibold tracking-tight text-neutral-900">
                        {job.company}
                      </h3>
                      <ul className="space-y-1.5">
                        {job.roles.map((r) => (
                          <li
                            key={`${r.title}-${r.period}`}
                            className="flex flex-col gap-0.5 text-sm sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                          >
                            <span className="text-neutral-800">{r.title}</span>
                            <span className="shrink-0 text-neutral-500 tabular-nums sm:text-right">
                              {r.period}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <ul className="mt-4 list-none space-y-2.5 border-l-2 border-neutral-200 pl-4 text-sm leading-relaxed text-neutral-700">
                        {job.bullets.map((bullet, i) => (
                          <JobBulletItem key={i} bullet={bullet} />
                        ))}
                      </ul>
                    </article>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="side-projects-heading">
              <SectionTitle>
                <span id="side-projects-heading">Side projects</span>
              </SectionTitle>
              <ul className="space-y-6">
                {resume.sideProjects.map((project) => (
                  <li
                    key={project.title}
                    className="flex gap-3 border-l-2 border-neutral-200 pl-4"
                  >
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-neutral-900">
                        {project.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                        {project.summary}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="education-heading">
              <SectionTitle>
                <span id="education-heading">Education</span>
              </SectionTitle>
              <p className="text-sm leading-relaxed text-neutral-700">
                <span className="font-semibold text-neutral-900">
                  {resume.education.school}
                </span>
                <span className="text-neutral-400"> — </span>
                {resume.education.degree}
              </p>
            </section>
          </main>
        </article>
      </div>
    </div>
  );
}
