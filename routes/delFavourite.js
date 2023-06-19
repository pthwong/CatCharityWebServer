const express = require("express");
const router = express.Router();

// Import the database connection object
const db = require("../dbConnect");

// Import the authenticateToken middleware
const { authenticateToken } = require("../middlewares/auth");

router.delete("/", authenticateToken, (req, res) => {
  const { pubEmail, catID } = req.body;

  // First, check if the entry exists
  const checkSql =
    "SELECT * FROM CatFavourite WHERE pubEmail = ? AND catID = ?";

  db.query(checkSql, [pubEmail, catID], (err, result) => {
    if (err) {
      // Return a 500 status code and error message
      return res.status(500).json({ error: err.message });
    }

    // If the entry does not exist, return 404
    if (result.length === 0) {
      return res.status(404).json({ error: "Cat not found in favourites" });
    }

    // If the entry exists, attempt to delete it
    const deleteSql =
      "DELETE FROM CatFavourite WHERE pubEmail = ? AND catID = ?";

    db.query(deleteSql, [pubEmail, catID], (err, result) => {
      if (err) {
        // Return a 500 status code and error message
        return res.status(500).json({ error: err.message });
      }

      // Successfully removed from favourites
      res
        .status(200)
        .json({ message: "Cat removed from favourites successfully" });
    });
  });
});

// Export the router
module.exports = router;
