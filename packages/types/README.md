# @gg/types

Use this package for contracts and shared domain types that should be referenced by more than one workspace.

Starting it early keeps the monorepo from drifting into direct imports between app, api, and marketing.

## Contract

- Prefer `import type` when consuming exports from this package.
- Keep runtime helpers in a separate shared package unless they are truly part of the public contract.
- `pnpm build` emits JavaScript and declaration files to `dist` so future runtime exports have a real package entrypoint.
