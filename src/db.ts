import { Pool } from "pg";

const connectionString = 'postgres://eksnhtqn:e55Gif5Nz4q-CgTkzNPdLXp0jtnzvkbE@kesavan.db.elephantsql.com/eksnhtqn';
const db = new Pool({ connectionString });
export { db };