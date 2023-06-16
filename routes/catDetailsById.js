var express = require("express");
var router = express.Router();

var express = require("express");
var router = express.Router();

// Import the db object
var db = require("../dbConnect");

function getCatDetailsById(catID, callback) {
  db.query(
    "SELECT catID, name, gender, age, color, breed, description, updateDateTime, catImgPath, cwEmail FROM Cats WHERE catID = ?",
    [catID],
    function (error, results, fields) {
      if (error) {
        callback({ status: 500, error: error, response: null });
      } else {
        callback({ status: 200, error: null, response: results });
      }
    }
  );
}

router.get("/:catID", function (req, res, next) {
  const catID = req.params.catID;
  getCatDetailsById(catID, function (response) {
    res.send(response);
  });
});

module.exports = router;
