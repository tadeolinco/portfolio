import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import Link from "next/link";
import type { JobBullet } from "./resume-content";
import { resume, resumePageUrl } from "./resume-content";

const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const jsonLd = (() => {
  const id = (s: string) => `${resumePageUrl}#${s}`;
  const skills = [...resume.skills];
  let n = 0;
  const items = resume.jobs.flatMap((job) =>
    job.roles.map((role) => ({
      "@type": "ListItem" as const,
      position: ++n,
      name: `${role.title} at ${job.company}`,
      description: role.period,
      item: { "@type": "Organization" as const, name: job.company },
    })),
  );
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": id("webpage"),
        url: resumePageUrl,
        name: `Resume - ${resume.name}`,
        inLanguage: "en",
        about: { "@id": id("person") },
        mainEntity: { "@id": id("person") },
        mentions: { "@id": id("work") },
      },
      {
        "@type": "Person",
        "@id": id("person"),
        name: resume.name,
        givenName: "Sam",
        familyName: "Bautista",
        email: resume.email,
        telephone: resume.phone,
        url: "https://tadeolinco.dev",
        jobTitle: resume.jobs[0]?.roles[0]?.title ?? resume.title,
        description: resume.focusLine,
        sameAs: resume.links.map((l) => l.href),
        knowsAbout: skills,
        alumniOf: {
          "@type": "EducationalOrganization",
          name: resume.education.school,
          description: resume.education.degree,
        },
        worksFor: { "@type": "Organization", name: resume.jobs[0].company },
        affiliation: [...new Set(resume.jobs.map((j) => j.company))].map(
          (name) => ({ "@type": "Organization", name }),
        ),
        mainEntityOfPage: { "@id": id("webpage") },
      },
      {
        "@type": "ItemList",
        "@id": id("work"),
        name: "Employment history",
        numberOfItems: items.length,
        itemListElement: items,
      },
    ],
  }).replace(/</g, "\\u003c");
})();

const sectionTitleClass =
  "mb-2 font-serif text-xl font-medium text-stone-900 sm:text-2xl";

function BulletList({ items }: { items: JobBullet[] }) {
  return (
    <ul className="mt-2.5 list-none space-y-2.5 border-l border-stone-300 pl-4 text-sm leading-relaxed text-stone-700">
      {items.map((b, i) => (
        <li key={i} className="pl-0">
          {typeof b === "string" ? (
            b
          ) : (
            <>
              <p className="m-0 text-stone-800">{b.intro}</p>
              <ul className="mt-1.5 list-disc space-y-1 pl-4 text-stone-700 marker:text-stone-500">
                {b.subItems.map((s, j) => (
                  <li key={j}>{s}</li>
                ))}
              </ul>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export const metadata: Metadata = {
  title: "Resume - Sam Bautista",
  description: `${resume.name} - ${resume.title}. ${resume.focusLine}`,
  alternates: { canonical: resumePageUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "profile",
    title: "Resume - Sam Bautista",
    url: resumePageUrl,
    siteName: "Sam Bautista",
    description: resume.focusLine,
    locale: "en_US",
    firstName: "Sam",
    lastName: "Bautista",
  },
  twitter: { card: "summary", title: "Resume - Sam Bautista" },
};

export default function ResumePage() {
  return (
    <div
      className={`${display.className} ${display.variable} ${sans.className} ${sans.variable} min-h-dvh bg-stone-100 text-stone-800 antialiased [font-family:var(--font-sans),system-ui,sans-serif]`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-20 focus:rounded focus:bg-stone-900 focus:px-3 focus:py-2 focus:text-sm focus:text-stone-50"
      >
        Skip to content
      </a>

      <div className="mx-auto max-w-2xl px-5 py-8 sm:px-8 sm:py-10">
        <div className="mb-1 flex justify-end">
          <Link
            href="/"
            className="text-sm text-stone-700 underline-offset-4 transition hover:text-stone-900 hover:underline"
          >
            Home
          </Link>
        </div>

        <main id="main" className="relative space-y-8">
          <div
            className="absolute -left-px top-0 hidden h-full w-px bg-gradient-to-b from-amber-600/30 via-stone-300/80 to-transparent sm:-left-6 sm:block"
            aria-hidden
          />

          <header className="border-b border-stone-200 pb-6">
            <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-950">
              Résumé
            </p>
            <h1
              className="font-serif text-3xl font-medium tracking-tight text-stone-900 sm:text-4xl"
              style={{
                fontFamily: "var(--font-display), ui-serif, Georgia, serif",
              }}
            >
              {resume.name}
            </h1>
            <p className="mt-1.5 text-base text-stone-800">{resume.title}</p>
            <p className="mt-2 max-w-xl text-balance text-sm leading-snug text-stone-800 sm:text-[0.95rem] sm:leading-relaxed">
              {resume.focusLine}
            </p>

            <p className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-sm [word-spacing:0.05em]">
              <a
                className="text-stone-900 underline decoration-stone-500 underline-offset-2 transition hover:decoration-amber-700"
                href={`tel:${resume.phone.replace(/\s/g, "")}`}
              >
                {resume.phone}
              </a>
              <span className="text-stone-300" aria-hidden>
                ·
              </span>
              <a
                className="text-stone-900 underline decoration-stone-500 underline-offset-2 transition hover:decoration-amber-700"
                href={`mailto:${resume.email}`}
              >
                {resume.email}
              </a>
              {resume.links.map((l) => (
                <span key={l.href} className="inline-flex items-center gap-x-2">
                  <span className="text-stone-300" aria-hidden>
                    ·
                  </span>
                  <a
                    className="text-stone-900 underline decoration-stone-500 underline-offset-2 transition hover:decoration-amber-700"
                    href={l.href}
                    rel="me noopener noreferrer"
                    target="_blank"
                  >
                    {l.label}
                  </a>
                </span>
              ))}
            </p>
          </header>

          <section aria-labelledby="skills">
            <h2
              id="skills"
              className={sectionTitleClass}
              style={{
                fontFamily: "var(--font-display), ui-serif, Georgia, serif",
              }}
            >
              Skills
            </h2>
            <p className="m-0 text-sm leading-snug text-stone-800">
              {resume.skills.join(", ")}
            </p>
          </section>

          <section aria-labelledby="work">
            <h2
              id="work"
              className={sectionTitleClass}
              style={{
                fontFamily: "var(--font-display), ui-serif, Georgia, serif",
              }}
            >
              Experience
            </h2>
            <ol className="list-none space-y-8 p-0 sm:space-y-9">
              {resume.jobs.map((job) => (
                <li key={job.company}>
                  <h3
                    className="font-serif text-lg font-medium text-stone-900 sm:text-xl"
                    style={{
                      fontFamily:
                        "var(--font-display), ui-serif, Georgia, serif",
                    }}
                  >
                    {job.company}
                  </h3>
                  <ul className="mt-1.5 list-none space-y-1.5 p-0">
                    {job.roles.map((r) => (
                      <li
                        key={r.title + r.period}
                        className="flex flex-col gap-0.5 sm:flex-row sm:justify-between"
                        data-employment
                        data-org={job.company}
                        data-title={r.title}
                        data-start={r.startDate}
                        data-end={r.endDate ?? ""}
                      >
                        <span className="text-stone-800">{r.title}</span>
                        <span className="shrink-0 text-sm text-stone-700 tabular-nums sm:text-right">
                          {r.period}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <BulletList items={job.bullets} />
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="projects">
            <h2
              id="projects"
              className={sectionTitleClass}
              style={{
                fontFamily: "var(--font-display), ui-serif, Georgia, serif",
              }}
            >
              Side projects
            </h2>
            <ul className="list-none space-y-3 p-0">
              {resume.sideProjects.map((p) => (
                <li
                  key={p.title}
                  className="border-l-2 border-amber-600/25 pl-4"
                >
                  <h3 className="text-[0.95rem] font-medium text-stone-900">
                    {p.title}
                  </h3>
                  <p className="mt-0.5 text-sm leading-snug text-stone-800 sm:leading-relaxed">
                    {p.summary}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="edu">
            <h2
              id="edu"
              className={sectionTitleClass}
              style={{
                fontFamily: "var(--font-display), ui-serif, Georgia, serif",
              }}
            >
              Education
            </h2>
            <p className="m-0 text-sm leading-relaxed text-stone-800 sm:leading-relaxed">
              <span className="font-medium text-stone-900">
                {resume.education.school}
              </span>
              <span className="text-stone-600">, </span>
              {resume.education.degree}
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
