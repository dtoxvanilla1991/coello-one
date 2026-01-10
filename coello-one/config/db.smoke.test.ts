import { describe, it, expect } from "bun:test";
import { loadLocalEnv } from "./loadLocalEnv";

const REQUIRED_DB_KEYS = ["DB_HOST_DEV", "DB_USER_DEV", "DB_PASS_DEV", "DB_NAME_DEV"];

await loadLocalEnv({ keys: REQUIRED_DB_KEYS });

const { checkDbConnection } = await import("./db");

const shouldRunDbSmoke =
  process.env.DB_SMOKE_TESTS === "1" || process.env.RUN_DB_SMOKE_TESTS === "1";

const hasProdUrl = Boolean(process.env.DB_URL_PROD);
const hasDevCredentials = REQUIRED_DB_KEYS.every((key) => Boolean(process.env[key]));

const describeDb = shouldRunDbSmoke && (hasProdUrl || hasDevCredentials) ? describe : describe.skip;

describeDb("Database connectivity", () => {
  it("successfully executes a health query", async () => {
    const isAlive = await checkDbConnection();
    expect(isAlive).toBe(true);
  });
});
