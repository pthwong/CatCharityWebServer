const express = require("express");
const router = express.Router();

// Import the database connection object
const db = require("../dbConnect");

const multer = require('multer');
const upload = multer({ dest: 'catImage/' });

// Endpoint to update the details of a cat
router.put('/:catID', upload.single('catImage'), async (req, res) => {
    const { catID } = req.params;
    const { name, gender, age, color, breed, description, cwEmail } = req.body;
    let catImgPath = '';

    if (req.file) {
        catImgPath = req.file.filename;
    }

    const updateDateTime = new Date();

    // First check if the cat exists
    db.query('SELECT * FROM Cats WHERE catID = ?', [catID], (err, result) => {
        if (err) {
            console.error('Error: \n', err);
            return res.status(500).json({ error: 'Server error' });
        }

        if (result.length === 0) {
            // Cat not found
            return res.status(404).json({ message: 'Cat not found' });
        }

        // Proceed to update the cat details
        let sql = 'UPDATE Cats SET name = ?, gender = ?, age = ?, color = ?, breed = ?, description = ?, catImgPath = ?, updateDateTime = ?, cwEmail = ? WHERE catID = ?';

        db.query(sql, [name, gender, age, color, breed, description, catImgPath, updateDateTime, cwEmail, catID], (err, result) => {
            if (err) {
                console.error('Error: \n', err);
                return res.status(500).json({ error: 'Server error' });
            } else {
                return res.status(200).json({ message: 'Details of the cat updated successfully!' });
            }
        });
    });
});

// Export the router
module.exports = router;
