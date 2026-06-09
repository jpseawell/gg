import type { AddressInfo } from "node:net";
import { createApp } from "./app.js";
import { getServerConfig } from "./env.js";

const app = createApp();
const { host, port } = getServerConfig();
let isShuttingDown = false;

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => {
    if (isShuttingDown) {
      return;
    }

    isShuttingDown = true;

    void app
      .close()
      .then(() => {
        process.exit(0);
      })
      .catch((error: unknown) => {
        console.error(error);
        process.exit(1);
      });
  });
}

try {
  await app.listen({ host, port });

  const address = app.server.address() as AddressInfo | null;
  const displayHost = host === "0.0.0.0" ? "localhost" : host;
  const displayPort = address?.port ?? port;

  console.log(`gg api listening on http://${displayHost}:${displayPort}`);
} catch (error) {
  console.error(error);
  process.exit(1);
}
