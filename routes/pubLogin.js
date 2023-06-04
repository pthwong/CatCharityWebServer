const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Import the database connection object
const db = require("../dbConnect");

const crypto = require("crypto");

function generateSecretKey(length = 32) {
  return crypto.randomBytes(length).toString("hex");
}

const SECRET_KEY = generateSecretKey();
console.log("SECRET_KEY:\n", SECRET_KEY);

router.post("/", (req, res) => {
    const { pubEmail, pubPassword } = req.body;
  
    if (!pubEmail || !pubPassword) {
      return res.status(400).send('Missing username or password');
    }
  
    const hashedpubPassword = crypto.createHash('sha1').update(pubPassword).digest('hex');
    
    const sql = 'SELECT * FROM Public WHERE pubEmail = ? AND pubPassword = ?';
    db.query(sql, [pubEmail, hashedpubPassword], (err, result) => {
      if (err) throw err;
      
      if (result.length > 0) {
        const public = result[0];
        const token = jwt.sign({ pubEmail: public.pubEmail }, SECRET_KEY); // replace with your secret key
        res.json({ token });
      } else {
        res.status(401).send('Invalid username or password');
      }
    });
  });

  // Export the server
module.exports = router;