import assert from "node:assert/strict";
import test from "node:test";
import { createApp } from "./app.js";

test("GET /health returns service status", async () => {
  const app = createApp();
  const response = await app.inject({ method: "GET", url: "/health" });

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.json(), {
    ok: true,
    service: "api",
  });

  await app.close();
});

test("GET /v1/surfaces returns starter metadata", async () => {
  const app = createApp();
  const response = await app.inject({ method: "GET", url: "/v1/surfaces" });

  assert.equal(response.statusCode, 200);

  const body = response.json() as {
    surfaces: Array<{ id: string }>;
  };

  assert.equal(body.surfaces.length, 3);
  assert.equal(body.surfaces[0]?.id, "app");

  await app.close();
});
