import { resume, resumePageUrl } from "./resume-content";

/**
 * Schema.org JSON-LD for crawlers, ATS-style tools, and platform importers
 * (LinkedIn, Indeed, etc.) that consume Person + WebPage + ItemList.
 */
export function buildResumeJsonLd(): Record<string, unknown> {
  const personId = `${resumePageUrl}#person`;
  const workListId = `${resumePageUrl}#work-history`;
  const pageId = `${resumePageUrl}#webpage`;

  const skills = [
    ...resume.skills.frontend.split(",").map((s) => s.trim()),
    ...resume.skills.backend.split(",").map((s) => s.trim()),
  ].filter(Boolean);

  const orgNames = Array.from(
    new Set(resume.jobs.map((j) => j.company)),
  ) as string[];

  const firstJob = resume.jobs[0];
  const currentRole = firstJob?.roles[0];
  const currentOrg = firstJob?.company;

  let listPosition = 0;
  const workItems = resume.jobs.flatMap((job) =>
    job.roles.map((role) => {
      listPosition += 1;
      return {
        "@type": "ListItem" as const,
        position: listPosition,
        name: `${role.title} at ${job.company}`,
        description: role.period,
        item: {
          "@type": "Organization",
          name: job.company,
        },
      };
    }),
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": pageId,
        url: resumePageUrl,
        name: "Resume — Sam Bautista",
        inLanguage: "en",
        isPartOf: {
          "@type": "WebSite",
          name: "Sam Bautista",
          url: "https://tadeolinco.dev",
        },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
        mentions: { "@id": workListId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: resume.name,
        givenName: "Sam",
        familyName: "Bautista",
        email: resume.email,
        telephone: resume.phone,
        url: "https://tadeolinco.dev",
        jobTitle: currentRole?.title ?? resume.title,
        description: resume.focusLine,
        sameAs: resume.links.map((l) => l.href),
        knowsAbout: skills,
        alumniOf: {
          "@type": "EducationalOrganization",
          name: resume.education.school,
          description: resume.education.degree,
        },
        worksFor:
          currentOrg && currentRole
            ? {
                "@type": "Organization",
                name: currentOrg,
              }
            : undefined,
        affiliation: orgNames.map((name) => ({
          "@type": "Organization",
          name,
        })),
        mainEntityOfPage: { "@id": pageId },
      },
      {
        "@type": "ItemList",
        "@id": workListId,
        name: "Employment history",
        numberOfItems: workItems.length,
        itemListElement: workItems,
      },
    ],
  };
}

export function safeJsonForScript(
  data: Record<string, unknown> | object,
): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
