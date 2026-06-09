# tooling

Use this folder for shared automation, deployment helpers, and local infrastructure support.

## What belongs here

- reusable scripts that coordinate multiple workspaces
- local infrastructure helpers such as compose files or seed scripts
- provider-specific supporting assets that are not required to live at the repo root

## What does not belong here

- platform-required entrypoint files such as `.github/workflows/*`
- provider root config files such as `netlify.toml` when the platform expects them at the root
- generated artifacts and build output
