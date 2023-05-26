const mysql = require("mysql2");

module.exports.db = mysql.createConnection({
  database: "employee_db",
  user: "root",
  password: "Cjscrew0942",
});
