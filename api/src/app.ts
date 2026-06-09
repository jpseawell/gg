import type { SurfaceCard } from "@gg/types";
import Fastify from "fastify";

const surfaces: SurfaceCard[] = [
  {
    id: "app",
    title: "Flagship product",
    description: "Interactive product experience and authenticated UI.",
    devCommand: "pnpm dev:app",
    audience: "product",
  },
  {
    id: "api",
    title: "Service layer",
    description: "Endpoints, adapters, and backend integration boundaries.",
    devCommand: "pnpm dev:api",
    audience: "service",
  },
  {
    id: "marketing",
    title: "Static growth surface",
    description: "SEO-friendly pages and launch storytelling.",
    devCommand: "pnpm dev:marketing",
    audience: "growth",
  },
];

export function createApp() {
  const app = Fastify({ logger: false });

  app.get("/", async () => ({
    name: "gg api",
    status: "ready",
    version: "0.1.0",
  }));

  app.get("/health", async () => ({
    ok: true,
    service: "api",
  }));

  app.get("/v1/surfaces", async () => ({
    surfaces,
  }));

  return app;
}
