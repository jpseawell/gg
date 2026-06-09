Follow the repository boundaries strictly:

- `app` owns flagship product UI and authenticated flows.
- `api` owns service logic, contracts, and data adapters.
- `marketing` owns static or SEO-first content.
- `docs` is the home for product, technical, and agentic context.
- `packages` is the only place shared code should move into once it is used by more than one workspace.
- `tooling` is for shared automation and deployment support, not generated build output.

Before expanding architecture, update the relevant document in `docs` so product and technical context stays current.
