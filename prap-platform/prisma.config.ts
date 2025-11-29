import "dotenv/config";
// If you are configuring Prisma CLI, you typically don't need defineConfig or env imports.
// Remove the invalid import and handle DATABASE_URL via environment variables.
// If you need to export a config, you can use a plain object or adjust according to your toolchain.
// Example (if needed):
// Removed invalid import and use process.env for DATABASE_URL
export default {
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
};
