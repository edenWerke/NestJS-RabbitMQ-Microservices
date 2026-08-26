import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'

const sql = neon(process.env.DATABASE_URL!);
// Drizzle, use this sql connection to communicate with my database.
export const db = drizzle(sql ,{schema});