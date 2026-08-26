import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
const sql = neon(process.env.DATABASE_URL!);
// Drizzle, use this sql connection to communicate with my database.
export const db = drizzle({ client: sql });