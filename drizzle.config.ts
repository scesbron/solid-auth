export default {
  dialect: "postgresql",
  casing: "snake_case",
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations/",
  dbCredentials: {
    url: process.env.POSTGRESQL_URL || "",
  },
};
