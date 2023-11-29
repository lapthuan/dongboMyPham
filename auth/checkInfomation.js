const { sqlPool } = require("../model/connect_sqlserver");
const { mysqlConnection } = require("../model/connect_mysql");

const checkInsert = async (checkQuery) => {
  // console.log(checkQuery);
  return new Promise(async (resolve, reject) => {
    try {
      const sqlCheckResult = await sqlPool.request().query(checkQuery);

      mysqlConnection.query(checkQuery, (mysqlError, mysqlResults) => {
        if (mysqlError) {
          reject(mysqlError);
          return;
        }

        const mysqlCount = mysqlResults[0].count;

        console.log("mysql: " + mysqlCount);
        console.log("sql: " + sqlCheckResult.recordset[0].count);
        if (sqlCheckResult.recordset[0].count > 0 || mysqlCount > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

const checkUpdate = async (checkQuery) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sqlCheckResult = await sqlPool.request().query(checkQuery);

      mysqlConnection.query(checkQuery, (mysqlError, mysqlResults) => {
        if (mysqlError) {
          reject(mysqlError);
          return;
        }

        const mysqlCount = mysqlResults[0].count;

        // Kiểm tra kết quả trên cả hai cơ sở dữ liệu
        if (sqlCheckResult.recordset[0].count > 0 && mysqlCount > 0) {
          resolve(true);
        } else if (sqlCheckResult.recordset[0].count == 0 && mysqlCount > 0) {
          resolve(false);
        } else {
          resolve(false);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { checkInsert, checkUpdate };
