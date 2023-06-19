const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Import the database connection object
const db = require("../dbConnect");

const crypto = require("crypto");

// function generateSecretKey(length = 32) {
//   return crypto.randomBytes(length).toString("hex");
// }

// const SECRET_KEY = generateSecretKey();
const SECRET_KEY = process.env.JWT_SECRET;

console.log("SECRET_KEY:\n", SECRET_KEY);

router.post("/", (req, res) => {
  const { pubEmail, pubPassword } = req.body;

  if (!pubEmail || !pubPassword) {
    return res.status(400).send("Missing email or password");
  }

  const hashedPubPassword = crypto
    .createHash("sha1")
    .update(pubPassword)
    .digest("hex");

  const sql = "SELECT * FROM Public WHERE pubEmail = ? AND pubPassword = ?";
  db.query(sql, [pubEmail, hashedPubPassword], (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      const publicUser = result[0];
      const token = jwt.sign({ pubEmail: publicUser.pubEmail }, SECRET_KEY); // replace with your secret key
      console.log("Generated token:", token);
      res.json({ token: token });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  });
});

// Export the server
module.exports = router;
