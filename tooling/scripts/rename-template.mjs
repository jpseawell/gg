import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(fileURLToPath(new URL("../..", import.meta.url)));
const args = parseArgs(process.argv.slice(2));

if (args.help || !args.name) {
  printUsage();
  process.exit(args.help ? 0 : 1);
}

const projectName = String(args.name);
const packageScope = args.scope ? String(args.scope) : "@gg";
const displayName = args.title ? String(args.title) : projectName;
const dryRun = Boolean(args["dry-run"]);

validatePackageName(projectName, "name");
validatePackageName(packageScope, "scope");

const packageFiles = [
  "package.json",
  "app/package.json",
  "api/package.json",
  "marketing/package.json",
  "packages/types/package.json",
];

const textFiles = [
  "README.md",
  "app/index.html",
  "app/src/App.tsx",
  "api/src/app.ts",
  "api/src/server.ts",
  "marketing/src/layouts/SiteLayout.astro",
  "marketing/src/pages/index.astro",
  "packages/types/README.md",
];

await updatePackages();
await updateTextReferences();

console.log(
  dryRun
    ? "dry run complete; no files changed"
    : "template identity updated; run pnpm install to refresh the lockfile",
);

async function updatePackages() {
  const workspaceNames = new Map([
    ["app/package.json", `${packageScope}/app`],
    ["api/package.json", `${packageScope}/api`],
    ["marketing/package.json", `${packageScope}/marketing`],
    ["packages/types/package.json", `${packageScope}/types`],
  ]);

  for (const file of packageFiles) {
    const path = resolve(repoRoot, file);
    const data = JSON.parse(await readFile(path, "utf8"));

    if (file === "package.json") {
      data.name = projectName;
    } else {
      data.name = workspaceNames.get(file);
    }

    for (const section of ["dependencies", "devDependencies"]) {
      if (data[section]?.["@gg/types"]) {
        data[section][`${packageScope}/types`] = data[section]["@gg/types"];
        delete data[section]["@gg/types"];
      }
    }

    await writeIfChanged(file, `${JSON.stringify(data, null, 2)}\n`);
  }
}

async function updateTextReferences() {
  const replacements = [
    ["@gg/types", `${packageScope}/types`],
    ["@gg/", `${packageScope}/`],
    ["# gg", `# ${displayName}`],
    ["gg starter", `${displayName} starter`],
    ["gg app", `${displayName} app`],
    ["gg api", `${displayName} api`],
    ["gg marketing", `${displayName} marketing`],
    ["gg monorepo template", `${displayName} project`],
  ];

  for (const file of textFiles) {
    const path = resolve(repoRoot, file);
    let content = await readFile(path, "utf8");

    for (const [from, to] of replacements) {
      content = content.split(from).join(to);
    }

    await writeIfChanged(file, content);
  }
}

async function writeIfChanged(file, content) {
  const path = resolve(repoRoot, file);
  const current = await readFile(path, "utf8");

  if (content === current) {
    return;
  }

  if (dryRun) {
    console.log(`would update ${file}`);
    return;
  }

  await writeFile(path, content);
  console.log(`updated ${file}`);
}

function parseArgs(values) {
  const parsed = {};

  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];

    if (!value.startsWith("--")) {
      continue;
    }

    const [rawKey, rawInlineValue] = value.slice(2).split("=", 2);
    const nextValue = values[index + 1];

    if (rawInlineValue !== undefined) {
      parsed[rawKey] = rawInlineValue;
    } else if (!nextValue || nextValue.startsWith("--")) {
      parsed[rawKey] = true;
    } else {
      parsed[rawKey] = nextValue;
      index += 1;
    }
  }

  return parsed;
}

function validatePackageName(value, label) {
  const pattern =
    label === "scope" ? /^@[a-z0-9][a-z0-9._-]*$/ : /^[a-z0-9][a-z0-9._-]*$/;

  if (!pattern.test(value)) {
    throw new Error(`Invalid ${label}: ${value}`);
  }
}

function printUsage() {
  console.log(`Usage:
  pnpm rename:template -- --name my-project --scope @myorg --title "My Project"
  pnpm rename:template -- --name my-project --dry-run

Options:
  --name       Root package name to use for the new project. Required.
  --scope      Workspace package scope. Defaults to @gg.
  --title      Human-readable project name. Defaults to --name.
  --dry-run    Print files that would change without writing them.
`);
}
