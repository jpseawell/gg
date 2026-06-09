# Project Kickoff

Use this checklist after creating a repository from the template and before feature work starts.

## Identity

- Rename the root package in `package.json`.
- Rename workspace package scopes if `@gg/*` should not remain the package namespace.
- Update app and marketing page titles, descriptions, and visible starter copy.
- Replace or remove `docs/assets/gg-opt.png`.

## Configuration

- Copy each `.env.example` file to the appropriate local environment file.
- Choose deployment targets for `app`, `api`, and `marketing`.
- Add provider-required root config files only after the provider is chosen.

## Documentation

- Fill in `docs/product` with the target audience, problem statement, and initial scope.
- Add the first ADR in `docs/technical` for the application architecture decision.
- Seed `docs/backlog` with the first prioritized milestone.
- Add any recurring operational steps to `docs/runbooks`.

## Validation

- Run `pnpm install`.
- Run `pnpm lint`.
- Run `pnpm typecheck`.
- Run `pnpm test`.
- Run `pnpm build`.
