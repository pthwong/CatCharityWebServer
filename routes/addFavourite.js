const express = require("express");
const router = express.Router();

// Import the database connection object
const db = require("../dbConnect");

// Import the authenticateToken middleware
const { authenticateToken } = require("../middlewares/auth");

router.post("/", authenticateToken, (req, res) => {
  const { pubEmail, catID } = req.body;

  const sql = "INSERT INTO CatFavourite (pubEmail, catID) VALUES (?, ?)";
  
  db.query(sql, [pubEmail, catID], (err, result) => {
    if (err) {
      // Return a 500 status code and error message
      return res.status(500).json({ error: err.message });
    }

    // Successfully added to favourites
    res.status(200).json({ message: 'Cat added to favourites successfully' });
  });
});

// Export the router
module.exports = router;
