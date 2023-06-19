const express = require("express");
const router = express.Router();

const crypto = require("crypto");

// Import the database connection object
const db = require("../dbConnect");

router.post("/", async (req, res) => {
  const { cwName, cwEmail, cwPassword, signUpCode } = req.body;

  try {
    // Hash the password with SHA1
    const hashedCwPassword = crypto
      .createHash("sha1")
      .update(cwPassword)
      .digest("hex");

    // Hash the signup code with SHA1
    const hashedSignupCode = crypto
      .createHash("sha1")
      .update(signUpCode)
      .digest("hex");

    const sqlCheckCode = "SELECT * FROM SignUpCodeTable WHERE signUpCode = ?";

    db.query(sqlCheckCode, [hashedSignupCode], async (err, result) => {
      if (err) {
        // Handle error
        res.status(500).json({ error: err.message });
        return;
      }

      if (result.length === 0) {
        // Signup code does not exist in the database
        res.status(400).json({ error: "Invalid sign up code" });
        return;
      }

      // Signup code exists, proceed with registration
      const sqlRegister =
        "INSERT INTO CharityWorker (cwName, cwEmail, cwPassword, signUpCode) VALUES (?, ?, ?, ?)";

      db.query(
        sqlRegister,
        [cwName, cwEmail, hashedCwPassword, hashedSignupCode],
        (err, result) => {
          if (err) {
            // Check if it is a duplicate entry error
            if (err.code === "ER_DUP_ENTRY") {
              res.status(409).json({ error: "There is a user already" });
            } else {
              // Handle other errors
              res.status(500).json({ error: err.message });
            }
          } else {
            // Registration was successful
            res.status(200).json({
              message: "Successful signing up charity worker account",
            });
          }
        }
      );
    });
  } catch (err) {
    // Handle error
    res.status(500).json({ error: err.message });
  }
});

// Export the server
module.exports = router;
