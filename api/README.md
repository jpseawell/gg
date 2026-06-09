# api

The `api` workspace starts as a small Fastify service with a health route and a simple surface descriptor endpoint. It is intended to be the home for stubbed data, real services, adapters, and contracts.

## Commands

- `pnpm --filter @gg/api dev`
- `pnpm --filter @gg/api build`
- `pnpm --filter @gg/api typecheck`
- `pnpm --filter @gg/api test`

## Runtime Configuration

- `HOST` - bind host for the HTTP server. Defaults to `0.0.0.0`.
- `PORT` - bind port for the HTTP server. Defaults to `3001`.

## Conventions

- Keep integration boundaries explicit.
- Prefer route modules and service modules once the API grows.
- Share contract types through `/packages` rather than importing directly from the app.
