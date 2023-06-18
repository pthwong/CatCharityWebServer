var express = require("express");
var router = express.Router();

// Import the database db object
var db = require("../dbConnect");

function getCatsInfo(callback) {
  db.query(
    "SELECT catID, name, gender, age, color, breed, updateDateTime, cwEmail, catImgPath FROM Cats",
    function (error, results) {
      if (error) {
        callback({ status: 500, error: error });
      } else {
        if (results.length === 0) {
          callback({ status: 404, error: "Cat not found" });
        } else {
          callback({ status: 200, response: results });
        }
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
