import assert from "node:assert/strict";
import test from "node:test";
import { getServerConfig, parsePort } from "./env.js";

test("getServerConfig uses starter defaults", () => {
  assert.deepEqual(getServerConfig({}), {
    host: "0.0.0.0",
    port: 3001,
  });
});

test("getServerConfig reads HOST and PORT", () => {
  assert.deepEqual(
    getServerConfig({
      HOST: "127.0.0.1",
      PORT: "8787",
    }),
    {
      host: "127.0.0.1",
      port: 8787,
    },
  );
});

test("parsePort rejects invalid values", () => {
  assert.throws(() => parsePort("abc"), /PORT must be an integer/);
  assert.throws(() => parsePort("-1"), /PORT must be an integer/);
  assert.throws(() => parsePort("65536"), /PORT must be an integer/);
});
