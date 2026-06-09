# app

The `app` workspace is the flagship product surface. It is scaffolded as a Vite + React + TypeScript SPA so the core experience can move quickly without inheriting marketing-site constraints.

## Commands

- `pnpm --filter @gg/app dev`
- `pnpm --filter @gg/app build`
- `pnpm --filter @gg/app typecheck`

## Conventions

- Keep product-specific state and UI here.
- Promote only genuinely shared code into `/packages`.
- Treat API URLs and environment wiring as runtime configuration.
