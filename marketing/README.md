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
