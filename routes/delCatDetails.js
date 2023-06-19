var express = require("express");
var router = express.Router();

// Import the db object
var db = require("../dbConnect");
const { authenticateToken } = require("../middlewares/auth");

function deleteCatDetails(catID, callback) {
  // First check if the cat with the given catID exists
  db.query(
    "SELECT * FROM Cats WHERE catID = ?",
    [catID],
    function (error, results, fields) {
      if (error) {
        callback({ status: 500, error: error });
      } else {
        // If no records found, send a 404 response
        if (results.length === 0) {
          callback({ status: 404, error: "Cat not found" });
        } else {
          // If the record exists, attempt to delete it
          db.query(
            "DELETE FROM Cats WHERE catID = ?",
            [catID],
            function (error, results, fields) {
              if (error) {
                callback({ status: 500, error: error });
              } else {
                // Send a 200 response indicating the record was deleted
                callback({
                  status: 200,
                  response: "Cat details have been removed",
                });
              }
            }
          );
        }
      }
    }
  );
}

router.delete("/:catID", authenticateToken, function (req, res, next) {
  const catID = req.params.catID;
  deleteCatDetails(catID, function (response) {
    res.status(response.status).send(response);
  });
});

module.exports = router;
