import type { Metadata } from "next";
import Link from "next/link";
import type { JobBullet } from "./resume-content";
import { resume, resumePageUrl } from "./resume-content";

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

const linkClass = "text-[#0969da] hover:underline";

function BulletList({ items }: { items: JobBullet[] }) {
  return (
    <ul className="my-2 list-disc space-y-1 pl-6">
      {items.map((bullet, bulletIndex) => (
        <li key={bulletIndex}>
          {typeof bullet === "string" ? (
            bullet
          ) : (
            <>
              <p className="m-0">{bullet.intro}</p>
              <ul className="my-1 list-disc space-y-1 pl-6">
                {bullet.subItems.map((subItem, subItemIndex) => (
                  <li key={subItemIndex}>{subItem}</li>
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
    <div className="min-h-dvh bg-white font-sans text-base leading-normal text-[#24292f] antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-20 focus:rounded focus:bg-[#24292f] focus:px-3 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <div className="mx-auto max-w-[980px] px-4 py-8 print:py-4 sm:px-8">
        <p className="mb-6 text-right print:hidden">
          <Link href="/" className={linkClass}>
            Home
          </Link>
        </p>

        <main
          id="main"
          className="[&_h1]:mb-4 [&_h1]:border-b [&_h1]:border-[#d0d7de] [&_h1]:pb-2 [&_h1]:text-[2em] [&_h1]:font-semibold [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:border-b [&_h2]:border-[#d0d7de] [&_h2]:pb-2 [&_h2]:text-[1.5em] [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-[1.25em] [&_h3]:font-semibold [&_p]:my-4 [&_ul]:my-2 [&_ol]:my-2"
        >
          <header>
            <h1>{resume.name}</h1>
            <p className="!mt-0 !mb-2 font-semibold">{resume.title}</p>
            <p className="!my-2">{resume.focusLine}</p>

            <p className="!my-4">
              <a
                className={linkClass}
                href={`tel:${resume.phone.replace(/\s/g, "")}`}
              >
                {resume.phone}
              </a>
              {" · "}
              <a className={linkClass} href={`mailto:${resume.email}`}>
                {resume.email}
              </a>
              {resume.links.map((link) => (
                <span key={link.href}>
                  {" · "}
                  <a
                    className={linkClass}
                    href={link.href}
                    rel="me noopener noreferrer"
                    target="_blank"
                  >
                    {link.label}
                  </a>
                </span>
              ))}
            </p>
          </header>

          <section aria-labelledby="skills">
            <h2 id="skills">Skills</h2>
            <p className="!my-0">{resume.skills.join(", ")}</p>
          </section>

          <section aria-labelledby="work">
            <h2 id="work">Experience</h2>
            <ol className="list-none space-y-6 p-0">
              {resume.jobs.map((job) => (
                <li key={job.company}>
                  <h3>{job.company}</h3>
                  <ul className="list-none space-y-1 p-0">
                    {job.roles.map((role) => (
                      <li
                        key={role.title + role.period}
                        className="flex flex-col gap-0.5 sm:flex-row sm:justify-between"
                        data-employment
                        data-org={job.company}
                        data-title={role.title}
                        data-start={role.startDate}
                        data-end={role.endDate ?? ""}
                      >
                        <span>{role.title}</span>
                        <span className="shrink-0 text-[#57606a] tabular-nums sm:text-right">
                          {role.period}
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
            <h2 id="projects">Side projects</h2>
            <ul className="list-none space-y-4 p-0">
              {resume.sideProjects.map((project) => (
                <li key={project.title}>
                  <h3 className="!mt-0 !text-base">{project.title}</h3>
                  <p className="!my-1">{project.summary}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="edu">
            <h2 id="education">Education</h2>
            <p className="!my-0">
              <strong>{resume.education.school}</strong>,{" "}
              {resume.education.degree}
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
