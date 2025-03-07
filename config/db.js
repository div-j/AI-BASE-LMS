import { drizzle } from 'drizzle-orm/neon-http';

// Ensure the environment variable is correctly set
const databaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL || process.env.NEXT_DATABASE_URL;

export const db = drizzle(databaseUrl);
