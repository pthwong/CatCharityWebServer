const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: "3306",
    password: "2000W*82213th",
    database: "CatCharityDB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL database!");
});

module.exports = connection;