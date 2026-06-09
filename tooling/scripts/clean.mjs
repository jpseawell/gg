import { rm } from "node:fs/promises";
import { relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(fileURLToPath(new URL("../..", import.meta.url)));
const targets = [
  "app/dist",
  "api/dist",
  "marketing/.astro",
  "marketing/dist",
  "packages/types/dist",
  "coverage",
  "playwright-report",
  "test-results",
];

await Promise.all(
  targets.map(async (target) => {
    const absoluteTarget = resolve(repoRoot, target);
    await rm(absoluteTarget, { force: true, recursive: true });
    console.log(`removed ${relative(repoRoot, absoluteTarget)}`);
  }),
);
