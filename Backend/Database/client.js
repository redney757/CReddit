import pg from "pg";
const client = new pg.Client(process.env.DATABASE_URL); // creates a new PostgresClient using the Database_URL which contains necessary credentials in .env
export default client;