import type { SurfaceCard } from "@gg/types";
import { surfaceLinks } from "./config";
import { trackAppEvent } from "./lib/analytics";

const surfaces: SurfaceCard[] = [
  {
    id: "app",
    title: "Flagship product",
    description:
      "Own the main product interaction model and authenticated experience.",
    devCommand: "pnpm dev:app",
    audience: "product",
  },
  {
    id: "api",
    title: "Service layer",
    description:
      "Expose health checks, contracts, and data adapters behind stable endpoints.",
    devCommand: "pnpm dev:api",
    audience: "service",
  },
  {
    id: "marketing",
    title: "Static growth surface",
    description:
      "Publish landing pages, narrative content, and SEO-first acquisition flows.",
    devCommand: "pnpm dev:marketing",
    audience: "growth",
  },
];

const documentationAreas = [
  "product requirements and roadmap",
  "technical architecture and ADRs",
  "agent operating notes and prompts",
  "backlog and runbooks",
] as const;

export default function App() {
  function trackMarketingClick() {
    trackAppEvent("Marketing Link Clicked", {
      destination: surfaceLinks.marketing.home,
    });
  }

  return (
    <div className="shell">
      <header className="hero">
        <nav className="surface-nav" aria-label="Workspace surfaces">
          <a href={surfaceLinks.marketing.home} onClick={trackMarketingClick}>
            Marketing
          </a>
        </nav>
        <p className="eyebrow">gg starter</p>
        <h1>Start the repo with clear product boundaries.</h1>
        <p className="intro">
          This starter keeps the flagship application, API, marketing site, and
          documentation system distinct while still sharing one workspace.
        </p>
      </header>

      <main className="content">
        <section>
          <div className="section-heading">
            <p className="eyebrow">Surfaces</p>
            <h2>Each top-level folder owns one concern.</h2>
          </div>

          <div className="card-grid">
            {surfaces.map((surface) => (
              <article className="card" key={surface.id}>
                <p className="card-name">/{surface.id}</p>
                <h3>{surface.title}</h3>
                <p>{surface.description}</p>
                <code>{surface.devCommand}</code>
              </article>
            ))}
          </div>
        </section>

        <section className="docs-panel">
          <div className="section-heading">
            <p className="eyebrow">Documentation</p>
            <h2>Use /docs as the single source of context.</h2>
          </div>

          <ul>
            {documentationAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
