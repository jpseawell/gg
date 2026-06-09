# gg

<p align="center">
  <img src="docs/assets/gg-opt.png" alt="GG" width="720" />
</p>

Starter monorepo template for product work that needs a flagship application, an API surface, SEO-friendly marketing pages, and a single documentation system.

## Structure

- `app` - the primary product application, optimized for interactive client experiences.
- `api` - stubbed or real backend services, adapters, and data access layers.
- `marketing` - static or hybrid content for landing pages, docs marketing, and SEO.
- `docs` - product, technical, agentic, and backlog documentation.
- `packages` - shared types, config, utilities, and reusable modules.
- `tooling` - shared automation, deployment helpers, and local infrastructure scripts.

## Workspace Commands

- `pnpm install` - install all workspace dependencies.
- `pnpm dev` - run the app, api, and marketing surfaces in parallel.
- `pnpm build` - build every workspace that exposes a build script.
- `pnpm typecheck` - run TypeScript checks across the workspace.
- `pnpm test` - run available tests across the workspace.

## Recommended Next Steps

1. Work through `docs/templates/project-kickoff.md` after creating a project from this template.
2. Flesh out `docs` before product-specific code appears.
3. Keep shared code in `packages` rather than importing across app boundaries.
4. Add provider-specific deployment entrypoints only when a real hosting target is chosen.
