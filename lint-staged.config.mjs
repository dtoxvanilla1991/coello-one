import { relative } from "node:path";

const frontendPattern = "coello-one/**/*.{ts,tsx,js,jsx,mjs,cjs,json,css,md}";
const backendPattern = "flask-server/**/*.py";

const buildPrettierCommand = (files) => {
  if (files.length === 0) {
    return [];
  }
  const relativePaths = files.map((file) => relative("coello-one", file));
  const quoted = relativePaths.map((file) => `"${file}"`).join(" ");
  return `cd coello-one && bunx --bun prettier --config ./prettier.config.mjs --write ${quoted}`;
};

const buildBlackCommand = (files) => {
  if (files.length === 0) {
    return [];
  }
  const relativePaths = files.map((file) => relative("flask-server", file));
  const quoted = relativePaths.map((file) => `"${file}"`).join(" ");
  // Ensure we use the repo-managed venv (../.venv) so pre-commit does not depend
  // on a globally-installed Black.
  return `cd flask-server && (test -x ../.venv/bin/python || make install) && ../.venv/bin/python -m black ${quoted}`;
};

export default {
  [frontendPattern]: buildPrettierCommand,
  [backendPattern]: buildBlackCommand,
};
