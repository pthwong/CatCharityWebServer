const express = require("express");
const router = express.Router();

// Import the database connection object
const db = require("../dbConnect");

router.post("/", (req, res) => {
  const { pubEmail } = req.body;

  const sql = `SELECT * FROM CatFavourite INNER JOIN Cats ON CatFavourite.catID = Cats.catID WHERE CatFavourite.pubEmail = ?`;
  //SELECT * FROM CatFavourite INNER JOIN Cats ON CatFavourite.catID = Cats.catID WHERE CatFavourite.pubEmail = 'peterleung123@gmail.com'
  db.query(sql, [pubEmail], (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      const response = result;
      res.json({ response }); // send user info along with the token
    } else {
      res
        .status(400)
        .json({ error: "The user did not have cat favourite list" });
    }
  });
});

// Export the router
module.exports = router;
