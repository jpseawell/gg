# marketing

The `marketing` workspace is the SEO-friendly publishing surface. It is scaffolded with Astro so landing pages, launch pages, and editorial content can stay fast and mostly static.

## Commands

- `pnpm --filter @gg/marketing dev`
- `pnpm --filter @gg/marketing build`
- `pnpm --filter @gg/marketing typecheck`

## Conventions

- Keep acquisition and content concerns here.
- Do not mix authenticated product flows into this workspace.
- Promote shared messaging fragments or schema types to `/packages` only when needed.
- Use `data-analytics-event` on links or controls for simple click tracking.
- Use `src/lib/analytics.ts` for explicit marketing events instead of importing analytics providers directly.
- Keep canonical URL and sitemap configuration aligned with `PUBLIC_MARKETING_URL`.

## Environment

- `PUBLIC_APP_URL` - app origin used for cross-surface links.
- `PUBLIC_MARKETING_URL` - canonical marketing origin used for SEO and sitemap output.
- `PUBLIC_ANALYTICS_ENABLED` - set to `true` to send browser analytics.
- `PUBLIC_ANALYTICS_PROVIDER` - `mixpanel` by default, or `none`.
- `PUBLIC_MIXPANEL_TOKEN` - Mixpanel project token.
- `PUBLIC_MIXPANEL_DEBUG` - set to `true` for local analytics logging.
