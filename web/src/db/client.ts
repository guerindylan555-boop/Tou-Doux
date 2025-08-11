import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let singletonDb: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (singletonDb) return singletonDb;
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set. Provide it in your environment.");
  }
  const client = neon(databaseUrl);
  singletonDb = drizzle(client, { schema });
  return singletonDb;
}

export type Database = ReturnType<typeof getDb>;
