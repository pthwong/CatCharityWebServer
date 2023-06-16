const express = require("express");
const router = express.Router();

// Import the database connection object
const db = require("../dbConnect");

router.post("/", (req, res) => {
  const { email, role } = req.body;

  if (!email || !role) {
    return res.status(400).json({ error: "Missing email or role" });
  }

  let tableName;
  let nameRole;
  let emailRole;
  switch (role) {
    case "cw":
      tableName = "CharityWorker";
      nameRole = "cwName";
      emailRole = "cwEmail";
      break;
    case "pub":
      tableName = "Public";
      nameRole = "pubName";
      emailRole = "pubEmail";
      break;
    default:
      return res.status(400).send("Invalid role");
  }

  const sql = `SELECT ${nameRole}, ${emailRole} FROM ${tableName} WHERE ${emailRole} = ?`;
  db.query(sql, [email], (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      const user = result[0];
      res.json({ user }); // send user info along with the token
    } else {
      res.status(401).json({ error: "Incorrect user role or invalid email" });
    }
  });
});

// Export the router
module.exports = router;
