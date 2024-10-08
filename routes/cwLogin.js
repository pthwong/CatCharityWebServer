const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Import the database connection object
const db = require("../dbConnect");

const crypto = require("crypto");

// const SECRET_KEY = generateSecretKey();
const SECRET_KEY = process.env.JWT_SECRET;
console.log("SECRET_KEY:\n", SECRET_KEY);

router.post("/", (req, res) => {
  const { cwEmail, cwPassword } = req.body;

  if (!cwEmail || !cwPassword) {
    return res.status(400).send("Missing email or password");
  }

  const hashedCwPassword = crypto
    .createHash("sha1")
    .update(cwPassword)
    .digest("hex");

  const sql =
    "SELECT * FROM CharityWorker WHERE cwEmail = ? AND cwPassword = ?";
  db.query(sql, [cwEmail, hashedCwPassword], (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      const charityWorker = result[0];
      const token = jwt.sign({ cwEmail: charityWorker.cwEmail }, SECRET_KEY);
      console.log("Generated token:", token);
      res.json({ token: token });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  });
});

// Export the server
module.exports = router;
