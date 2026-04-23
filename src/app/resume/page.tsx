import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Link from "next/link";
import { buildResumeJsonLd, safeJsonForScript } from "./json-ld";
import type { JobBullet } from "./resume-content";
import { resume, resumePageUrl } from "./resume-content";

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
  alternates: { canonical: resumePageUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "profile",
    title: "Resume — Sam Bautista",
    url: resumePageUrl,
    siteName: "Sam Bautista",
    description:
      "Sam Bautista — Frontend Engineer. Startups and high-growth teams.",
    locale: "en_US",
    firstName: "Sam",
    lastName: "Bautista",
    username: "tadeolinco",
  },
  twitter: {
    card: "summary",
    title: "Resume — Sam Bautista",
  },
  formatDetection: {
    email: true,
    telephone: true,
    address: false,
  },
};

const jsonLdString = safeJsonForScript(
  buildResumeJsonLd() as Record<string, unknown>,
);

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 scroll-mt-6 border-b-2 border-neutral-900/90 pb-3 text-base font-bold tracking-tight text-neutral-900 sm:mb-7 sm:text-lg">
      {children}
    </h2>
  );
}

const contactItems = [
  {
    key: "phone",
    node: (
      <a
        className="p-tel u-tel text-neutral-800 underline decoration-neutral-300 underline-offset-2 transition hover:decoration-neutral-500"
        href={`tel:${resume.phone.replace(/\s/g, "")}`}
        title="Phone"
      >
        {resume.phone}
      </a>
    ),
  },
  {
    key: "email",
    node: (
      <a
        className="u-email text-neutral-800 underline decoration-neutral-300 underline-offset-2 transition hover:decoration-neutral-500"
        href={`mailto:${resume.email}`}
        title="Email"
      >
        {resume.email}
      </a>
    ),
  },
  ...resume.links.map((link) => ({
    key: link.href,
    node: (
      <a
        className={
          link.href.includes("tadeolinco.dev")
            ? "u-url text-neutral-800 underline decoration-neutral-300 underline-offset-2 transition hover:decoration-neutral-500"
            : "text-neutral-800 underline decoration-neutral-300 underline-offset-2 transition hover:decoration-neutral-500"
        }
        href={link.href}
        target="_blank"
        rel={
          /tadeolinco\.dev|linkedin\.com/i.test(link.href)
            ? "me noopener noreferrer"
            : "noopener noreferrer"
        }
        title={link.label}
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />
      <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14 lg:max-w-4xl">
        <article className="h-resume overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-neutral-200/90">
          <header className="h-card border-b border-neutral-200/80 bg-gradient-to-b from-white to-neutral-50/80 px-6 py-9 sm:px-12 sm:py-11">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
              <div className="min-w-0 flex-1 space-y-3">
                <div>
                  <h1 className="p-name text-2xl font-bold tracking-tight text-neutral-900 sm:text-[1.75rem] sm:leading-tight">
                    {resume.name}
                  </h1>
                  <p className="p-title mt-1.5 text-[0.95rem] text-neutral-600 sm:text-base">
                    {resume.title}
                  </p>
                </div>
                <p className="p-summary max-w-lg text-sm leading-relaxed text-neutral-600">
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

            <div className="mt-9 flex flex-wrap items-center gap-x-1 gap-y-2.5 text-sm leading-relaxed text-neutral-700 sm:mt-10">
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

          <main className="px-6 pb-12 pt-10 sm:px-12 sm:pb-14">
            <div className="space-y-12 sm:space-y-14">
              <section aria-labelledby="skills-heading" className="max-w-none">
                <SectionTitle>
                  <span id="skills-heading">Technical skills</span>
                </SectionTitle>
                <ul className="grid gap-8 text-sm leading-relaxed text-neutral-700 md:grid-cols-2 md:gap-x-12 md:gap-y-0">
                  <li className="min-w-0">
                    <span className="mb-2.5 block text-[0.7rem] font-bold uppercase tracking-[0.12em] text-neutral-800">
                      Frontend
                    </span>
                    <p className="p-skill m-0">{resume.skills.frontend}</p>
                  </li>
                  <li className="min-w-0">
                    <span className="mb-2.5 block text-[0.7rem] font-bold uppercase tracking-[0.12em] text-neutral-800">
                      Backend
                    </span>
                    <p className="p-skill m-0">{resume.skills.backend}</p>
                  </li>
                </ul>
              </section>

              <section aria-labelledby="employment-heading">
                <SectionTitle>
                  <span id="employment-heading">Employment history</span>
                </SectionTitle>
                <ol className="space-y-14 sm:space-y-16">
                  {resume.jobs.map((job) => (
                    <li key={job.company}>
                      <article className="space-y-4">
                        <h3 className="p-org text-lg font-bold leading-snug tracking-tight text-neutral-900 sm:text-xl">
                          {job.company}
                        </h3>
                        <ul className="space-y-1.5">
                          {job.roles.map((r) => (
                            <li
                              key={`${r.title}-${r.period}`}
                              className="flex flex-col gap-0.5 text-sm sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                              data-employment-item="true"
                              data-org={job.company}
                              data-role={r.title}
                              data-start-date={r.startDate}
                              data-end-date={r.endDate ?? ""}
                            >
                              <span className="text-neutral-800">
                                {r.title}
                              </span>
                              <span
                                className="dt-duration shrink-0 text-neutral-500 tabular-nums sm:text-right"
                                title={`${r.startDate}–${r.endDate ?? "present"}`}
                              >
                                {r.endDate == null ? (
                                  <>
                                    <time
                                      dateTime={r.startDate}
                                      className="font-medium"
                                    >
                                      {r.period.split("–")[0]?.trim() ??
                                        r.period}
                                    </time>
                                    <span className="text-neutral-300">
                                      {" "}
                                      –{" "}
                                    </span>
                                    present
                                  </>
                                ) : (
                                  r.period
                                )}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <ul className="mt-2 list-none space-y-2.5 border-l-[3px] border-neutral-300 pl-5 text-sm leading-relaxed text-neutral-700 sm:pl-6">
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
                <ul className="space-y-8">
                  {resume.sideProjects.map((project) => (
                    <li
                      key={project.title}
                      className="border-l-[3px] border-neutral-300 pl-5 sm:pl-6"
                    >
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-bold leading-snug text-neutral-900">
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
                <p className="p-education text-sm leading-relaxed text-neutral-700 sm:text-base">
                  <span className="p-org font-bold text-neutral-900">
                    {resume.education.school}
                  </span>
                  <span className="text-neutral-400"> — </span>
                  {resume.education.degree}
                </p>
              </section>
            </div>
          </main>
        </article>
      </div>
    </div>
  );
}
