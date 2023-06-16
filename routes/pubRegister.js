const express = require("express");
const router = express.Router();

const crypto = require("crypto");

// Import the database connection object
const db = require("../dbConnect");

router.post("/", async (req, res) => {
  const { pubName, pubEmail, pubPassword } = req.body;

  try {
    // Hash the password with SHA1
    const hashedPubPassword = crypto
      .createHash("sha1")
      .update(pubPassword)
      .digest("hex");

    const sqlRegister =
      "INSERT INTO Public (pubName, pubEmail, pubPassword) VALUES (?, ?, ?)";

    db.query(
      sqlRegister,
      [pubName, pubEmail, hashedPubPassword],
      (err, result) => {
        if (err) {
          // Handle error
          res.status(500).json({ error: err.message });
        } else {
          // Registration was successful
          res.json({ message: "Signing up Public account successful" });
        }
      }
    );
  } catch (err) {
    // Handle error
    res.status(500).json({ error: err.message });
  }
});

// Export the server
module.exports = router;
