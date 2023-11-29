const { sqlPool } = require("../model/connect_sqlserver");

const isAdmin = async (req, res, next) => {
  const { TenTk } = req.user;
  const sqlQuery = `SELECT Quyen FROM taikhoan WHERE TenTk = '${TenTk}' AND Quyen = '1'`;

  sqlPool.query(sqlQuery, (error, results) => {
    if (error) {
      console.error("Lỗi truy vấn SQL:", error);
      res.status(500).send({ message: "Lỗi truy vấn dữ liệu" });
      return;
    }

    if (results.length > 0) {
      next();
    } else {
      res.status(401).send({ message: "User is not Admin" });
    }
  });
};
module.exports = { isAdmin };
