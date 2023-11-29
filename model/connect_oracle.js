const oracledb = require("oracledb");
require("dotenv").config();

const oracleConfig = {
  user: process.env.ORACLE_USER,
  password: process.env.ORACLE_PASSWORD,
  connectString: process.env.ORACLE_CONNECT_STRING,
  // Các tùy chọn khác nếu cần
};

let oraclePool; // Biến pool kết nối Oracle

const connectOracle = async () => {
  try {
    oraclePool = await oracledb.createPool(oracleConfig);
    console.log("Kết nối Oracle thành công!");
  } catch (error) {
    console.error("Lỗi khi tạo kết nối Oracle: " + error.message);
    throw error;
  }
};

const executeOracleQuery = async (oracleQuery, params = []) => {
    let connection;
    try {
      connection = await oraclePool.getConnection();
      const result = await connection.execute(oracleQuery, params, { autoCommit: true });
      return result; // Trả về kết quả truy vấn
    } catch (error) {
      console.error("Lỗi khi thực hiện truy vấn Oracle: " + error.message);
      throw error;
    } finally {
      if (connection) {
        try {
          await connection.close(); // Luôn đảm bảo đóng kết nối
        } catch (error) {
          console.error("Lỗi khi đóng kết nối Oracle: " + error.message);
        }
      }
    }
  };
  

module.exports = { connectOracle, executeOracleQuery };
