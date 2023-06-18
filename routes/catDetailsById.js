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

router.get("/:catID", function (req, res, next) {
  const catID = req.params.catID;
  getCatDetailsById(catID, function (result) {
    console.log(result.status);
    if (result.status === 200) {
      res.status(result.status).send(result.response); // Use result.response
    } else {
      res.status(result.status).send({ error: result.error }); // Send error message in an object
    }
  });
});

module.exports = router;
