require("dotenv").config();
const sql = require("mssql");

const sqlConfig = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  server: process.env.SERVER_NAME,
  database: process.env.SQL_DATABASE,
  requestTimeout: 600000,
  options: {
    encrypt: false,
  },
};

const sqlPool = new sql.ConnectionPool(sqlConfig);

const connectSQL = async () => {
  try {
    await sqlPool.connect();
    console.log("SQL Server connected successfully!");
  } catch (error) {
    console.log("SQL Server connection error: " + error);
  }
};
module.exports = { sqlPool, connectSQL };
