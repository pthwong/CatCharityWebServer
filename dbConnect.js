const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "",
  database: "CatCharityDB",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL database!");
});

module.exports = db;
