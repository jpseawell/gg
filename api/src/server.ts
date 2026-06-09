import { createApp } from "./app.js";

const app = createApp();
const port = Number(process.env.PORT ?? 3001);

await app.listen({
  host: "0.0.0.0",
  port,
});

console.log(`gg api listening on http://localhost:${port}`);
