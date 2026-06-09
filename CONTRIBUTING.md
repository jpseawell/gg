# Contributing

## Setup

1. Use the Node.js version in `.nvmrc`.
2. Run `pnpm install`.
3. Copy any required `.env.example` files to local environment files.

## Common Commands

- `pnpm dev` - run the app, API, and marketing site in parallel.
- `pnpm lint` - check formatting.
- `pnpm typecheck` - run TypeScript checks.
- `pnpm test` - run unit tests.
- `pnpm build` - build every workspace.
- `pnpm smoke:install` - install the Chromium browser bundle used by smoke tests.
- `pnpm smoke` - build and run browser smoke tests.
- `pnpm clean` - remove generated local artifacts.

## Pull Request Checklist

- Update docs when behavior, architecture, or workflow changes.
- Add or update tests for user-visible behavior and shared contracts.
- Run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`.
- Run `pnpm smoke:install` once per machine, then `pnpm smoke` when frontend rendering, routing, assets, or layout changes.

## Repository Boundaries

- `app` owns flagship product UI and authenticated flows.
- `api` owns service logic, contracts, and data adapters.
- `marketing` owns static or SEO-first content.
- `packages` owns shared contracts and reusable modules.
- `docs` owns product, technical, operational, and agentic context.
- `tooling` owns shared scripts and local automation.
