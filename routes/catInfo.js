var express = require("express");
var router = express.Router();

// Import the connection object
var connection = require("../dbConnect");

function getCatsInfo(callback) {
  connection.query(
    "SELECT catID, name, gender, age, color, createDateTime, cwEmail FROM Cats",
    function (error, results, fields) {
      if (error) {
        callback({ status: 500, error: error, response: null });
      } else {
        callback({ status: 200, error: null, response: results });
      }
    }
  );
}

router.get("/", function (req, res, next) {
  getCatsInfo(function (response) {
    res.send(response);
  });
});

module.exports = router;
