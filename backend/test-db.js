const { neonConfig, Pool } = require("@neondatabase/serverless");
const ws = require("ws");
neonConfig.webSocketConstructor = ws;

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_7hOEb6KJojdy@ep-raspy-hall-a4n4xkqb.us-east-1.aws.neon.tech/neondb?sslmode=require",
});

pool
  .query("SELECT 1")
  .then(() => {
    console.log("SUCCESS!");
    pool.end();
  })
  .catch((err) => console.log("FAILED -", err.message));
