const { Pool } = require("pg");
require("dotenv").config();

const connectionString =
  process.env.DATABASE_URL ||
  "postgres://qa:qa_local_synthetic@localhost:15443/cuidarte_qa";

const pool = new Pool({ connectionString });

module.exports = { pool };
