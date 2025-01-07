import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";
// import { config } from "dotenv";
import * as schema from "@/db/schema";
import { setupEnv } from "@/lib/setupEnv";
import ws from "ws";

setupEnv();

neonConfig.webSocketConstructor = ws;

// To work in edge environments (Cloudflare Workers, Vercel Edge, etc.), enable querying over fetch
// neonConfig.poolQueryViaFetch = true

const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) {
  throw new Error("DATABASE_URL is not set");
}

const sql = neon(DB_URL);

const db = drizzle({ client: sql, schema: schema });
export { db };
