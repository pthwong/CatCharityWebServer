var express = require("express");
var router = express.Router();

// Import the database db object
var db = require("../dbConnect");

function searchCats(params, callback) {
  let query =
    "SELECT catID, name, gender, age, color, breed, updateDateTime, cwEmail, catImgPath FROM Cats WHERE 1=1";

  // Add filtering conditions to the query based on query parameters
  if (params.minAge) {
    query += ` AND age >= ${db.escape(params.minAge)}`;
  }
  if (params.maxAge) {
    query += ` AND age <= ${db.escape(params.maxAge)}`;
  }
  if (params.color) {
    query += ` AND color LIKE ${db.escape(`%${params.color}%`)}`;
  }
  if (params.breed) {
    query += ` AND breed LIKE ${db.escape(`%${params.breed}%`)}`;
  }
  if (params.name) {
    query += ` AND name LIKE ${db.escape(`%${params.name}%`)}`;
  }
  if (params.gender) {
    query += ` AND gender LIKE ${db.escape(`%${params.gender}%`)}`;
  }

  console.log("Generated query:", query);

  db.query(query, function (error, results) {
    if (error) {
      callback({ status: 500, error: error });
    } else {
      if (results.length === 0) {
        callback({ status: 404, error: "Cat not found" });
      } else {
        callback({ status: 200, response: results });
      }
    }
  });
}

router.get("/", function (req, res, next) {
  // Get search parameters from the query string
  const params = {
    minAge: req.query.minAge,
    maxAge: req.query.maxAge,
    color: req.query.color,
    breed: req.query.breed,
    name: req.query.name,
    gender: req.query.gender,
  };

  console.log("Request query parameters:", req.query); // Debugging: print the request query parameters

  searchCats(params, function (result) {
    console.log(result.status);
    if (result.status === 200) {
      res.status(result.status).send(result); // Use result.response
    } else {
      res.status(result.status).send({ error: result.error }); // Send error message in an object
    }
  });
});

module.exports = router;
