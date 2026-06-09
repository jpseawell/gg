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
- Use `src/lib/analytics.ts` for tracking, identity, and reset calls instead of importing analytics providers directly.
- Use `@gg/config` links for cross-surface navigation.

## Environment

- `VITE_API_BASE_URL` - API origin consumed by the app.
- `VITE_APP_URL` - canonical app origin used for shared links.
- `VITE_MARKETING_URL` - marketing origin used for cross-surface links.
- `VITE_ANALYTICS_ENABLED` - set to `true` to send browser analytics.
- `VITE_ANALYTICS_PROVIDER` - `mixpanel` by default, or `none`.
- `VITE_MIXPANEL_TOKEN` - Mixpanel project token.
- `VITE_MIXPANEL_DEBUG` - set to `true` for local analytics logging.
