import { SQL } from "bun";

// Determine environment
const isProd = process.env.NODE_ENV === "production";

// Configure the Native Bun SQL Client
// This bypasses Node.js overhead for maximum speed.
export const db = new SQL(
  isProd
    ? {
        url: process.env.DB_URL_PROD!,
        // Aiven requires SSL. Bun handles this via the URL usually,
        // but explicit config ensures stability.
        ssl: {
          rejectUnauthorized: true,
        },
      }
    : {
        hostname: process.env.DB_HOST_DEV!,
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
