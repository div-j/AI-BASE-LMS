import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./config/schema.js",
  dbCredentials: {
    url: "postgresql://neondb_owner:ogOp14xAclRi@ep-curly-dream-a5z9jkkt.us-east-2.aws.neon.tech/ai-base-lms-db?sslmode=require",
  },
});
