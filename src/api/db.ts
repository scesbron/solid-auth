import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "~/db/schema";

export const db = drizzle({
  connection: process.env.POSTGRESQL_URL || "",
  schema,
  casing: "snake_case",
  logger: process.env.NODE_ENV !== "production",
});
