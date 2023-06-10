const express = require("express");
const router = express.Router();

// Import the database connection object
const db = require("../dbConnect");

const multer = require('multer');
const upload = multer({ dest: 'catImage/' });

router.put('/:catID', upload.single('catImage'), async (req, res) => {
  try {
    const { name, gender, age, color, breed, description, cwEmail } = req.body;
    const { catID } = req.params;
    let catImgPath = '';

    if (req.file) {
      catImgPath = req.file.filename;
    }

    const updateDateTime = new Date();

    let sql = 'UPDATE Cats SET name = ?, gender = ?, age = ?, color = ?, breed = ?, description = ?, catImgPath = ?, updateDateTime = ?, cwEmail = ? WHERE catID = ?';

    db.query(
      sql,
      [name, gender, age, color, breed, description, catImgPath, updateDateTime, cwEmail, catID],
      (err, result) => {
        if (err) {
          console.error('Error: \n', err);
          res.status(500).send('Server error');
        } else {
          res.json({ message: 'Details of the cat updated successfully!' });
        }
      }
    );
  } catch (error) {
    console.error('Error: \n', error);
    res.status(500).send('Server error');
  }
});


// Export the server
module.exports = router;