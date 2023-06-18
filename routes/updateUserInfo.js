var express = require("express");
var router = express.Router();
var crypto = require("crypto");
var db = require("../dbConnect");

router.put("/", (req, res) => {
  const { name, email, oldPassword, newPassword, retypeNewPassword, role } =
    req.body;

  let tableName;
  let nameRole;
  let emailRole;
  let passwordColumnName;
  let updateSql;
  switch (role) {
    case "cw":
      tableName = "CharityWorker";
      nameRole = "cwName";
      emailRole = "cwEmail";
      passwordColumnName = "cwPassword";
      break;
    case "pub":
      tableName = "Public";
      nameRole = "pubName";
      emailRole = "pubEmail";
      passwordColumnName = "pubPassword";
      break;
    default:
      return res.status(400).json({ error: "Invalid role" });
  }

  const sql = `SELECT * FROM ${tableName} WHERE ${emailRole} = ?`;

  db.query(sql, [email], (err, result) => {
    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    } else {
      //Update password
      if (
        oldPassword ||
        newPassword ||
        retypeNewPassword ||
        oldPassword ||
        newPassword ||
        retypeNewPassword
      ) {
        // Validate input
        if (!email || !role) {
          return res
            .status(400)
            .json({ error: "Please provide all required fields" });
        }

        if (newPassword !== retypeNewPassword) {
          return res
            .status(401)
            .json({ error: "New password and retype password do not match" });
        }

        // Check if old password is correct
        const hashedOldPassword = crypto
          .createHash("sha1")
          .update(oldPassword)
          .digest("hex");
        const sql = `SELECT * FROM ${tableName} WHERE ${emailRole} = ? AND ${passwordColumnName} = ?`;

        db.query(sql, [email, hashedOldPassword], (err, result) => {
          if (err) return res.status(500).json({ error: "Server error" });

          if (result.length === 0) {
            return res.status(401).json({ error: "Old password is incorrect" });
          }

          // Update password in database
          const hashedNewPassword = crypto
            .createHash("sha1")
            .update(newPassword)
            .digest("hex");

          //If not update name
          if (!name) {
            updateSql = `UPDATE ${tableName} SET ${passwordColumnName} = ? WHERE ${emailRole} = ?`;

            db.query(
              updateSql,
              [hashedNewPassword, email],
              (err, updateResult) => {
                if (err) return res.status(500).json({ error: "Server error" });

                res.json({ message: "User Info updated successfully" });
              }
            );
          } else {
            //If update name also
            updateSql = `UPDATE ${tableName} SET ${nameRole} = ?, ${passwordColumnName} = ? WHERE ${emailRole} = ?`;

            db.query(
              updateSql,
              [name, hashedNewPassword, email],
              (err, updateResult) => {
                if (err) return res.status(500).json({ error: "Server error" });

                res.json({ message: "User Info updated successfully" });
              }
            );
          }
        });
      }

      //Update name only
      if (name || !oldPassword || !newPassword || !retypeNewPassword) {
        // Validate input
        if (!email || !role) {
          return res
            .status(400)
            .json({ error: "Please provide all required fields" });
        }

        const updateSql = `UPDATE ${tableName} SET ${nameRole} = ? WHERE ${emailRole} = ?`;

        db.query(updateSql, [name, email], (err, updateResult) => {
          if (err) return res.status(500).json({ error: "Server error" });

          res.json({ message: "Name updated successfully" });
        });
      }
    }
  });
});

module.exports = router;
