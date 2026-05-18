// Prisma configuration для BeautyLanding
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"] || "postgresql://postgres.brwkqtwwcfribgwxejmi:Sambuka4720168!@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true",
  },
});
