const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "pethome",
  password: "Sony2301",
  port: 5432,
});

module.exports = pool;
