import { SQL } from "bun";
import { isProd, isLocalHost } from "../utils/env";

const isProduction = isProd();
const devHostname = process.env.DB_HOST_DEV ?? "localhost";
const resolvedDevHost = isLocalHost(devHostname) ? "127.0.0.1" : devHostname;

// Native Bun SQL Client config to bypass Node.js overhead for maximum speed.
export const db = new SQL(
  isProduction
    ? {
        url: process.env.DB_URL_PROD!,
        // Aiven requires SSL. Bun handles this via the URL usually,
        // but explicit config ensures stability.
        ssl: {
          rejectUnauthorized: true,
        },
      }
    : {
        adapter: "mysql",
        hostname: resolvedDevHost,
        username: process.env.DB_USER_DEV!,
        password: process.env.DB_PASS_DEV!,
        database: process.env.DB_NAME_DEV!,
        port: 3306,
      },
);

// Simple health check helper
export const checkDbConnection = async () => {
  try {
    const result = await db`SELECT 1 as alive`.values();
    return !!result.length;
  } catch (e) {
    console.error("DB Connection Error:", e);
    return false;
  }
};
