const express = require("express");
const router = express.Router();

// Import the database connection object
const db = require("../dbConnect");

router.post("/", (req, res) => {
  const { pubEmail } = req.body;

  const sql = `SELECT * FROM CatFavourite INNER JOIN Cats ON CatFavourite.catID = Cats.catID WHERE CatFavourite.pubEmail = ?`;
  //SELECT * FROM CatFavourite INNER JOIN Cats ON CatFavourite.catID = Cats.catID WHERE CatFavourite.pubEmail = 'peterleung123@gmail.com'
  db.query(sql, [pubEmail], (err, result) => {
    
    if (err) {
      // Return a 500 status code and error message
      return res.status(500).json({ error: err });
    }

    if (result.length > 0) {
      const response = result;
      res.status(200).json({ response }); // send user info along with the token
    } else {
      res
        .status(404)
        .json({ error: "The user did not have cat favourite list" });
    }
  });
});

// Export the router
module.exports = router;
