import { describe, it, expect } from "bun:test";
import { checkDbConnection } from "./db";

const hasProdUrl = Boolean(process.env.DB_URL_PROD);
const hasDevCredentials = ["DB_HOST_DEV", "DB_USER_DEV", "DB_PASS_DEV", "DB_NAME_DEV"].every(
  (key) => Boolean(process.env[key]),
);

const describeDb = hasProdUrl || hasDevCredentials ? describe : describe.skip;

describeDb("Database connectivity", () => {
  it("successfully executes a health query", async () => {
    const isAlive = await checkDbConnection();
    expect(isAlive).toBe(true);
  });
});
