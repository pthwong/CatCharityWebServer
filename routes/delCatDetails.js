var express = require("express");
var router = express.Router();

var express = require("express");
var router = express.Router();

// Import the db object
var db = require("../dbConnect");

function deleteCatDetails(catID, callback) {
  db.query(
    "DELETE FROM Cats WHERE catID = ?",
    [catID],
    function (error, results, fields) {
      if (error) {
        callback({ status: 500, error: error, response: null });
      } else {
        callback({ status: 200, error: null, response: 'Cat details has been removed' });
      }
    }
  );
}

router.delete("/:catID", function (req, res, next) {
  const catID = req.params.catID;
  deleteCatDetails(catID, function (response) {
    res.send(response);
  });
});

module.exports = router;
