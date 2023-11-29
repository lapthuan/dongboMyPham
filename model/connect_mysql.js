require("dotenv").config();
const mysql = require("mysql2");

const mysqlConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};
const mysqlConnection = mysql.createConnection(mysqlConfig);

const connectMysql = () => {
  mysqlConnection.connect((err) => {
    if (err) {
      console.error("MySQL connection error:", err.message);
    } else {
      console.log("MySQL connected successfully!");
    }
  });
};

module.exports = { mysqlConnection, connectMysql };
