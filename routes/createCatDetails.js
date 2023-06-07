const express = require("express");
const router = express.Router();

// Import the database connection object
const db = require("../dbConnect");

const multer = require('multer');
const upload = multer({ dest: 'catImage/' });


router.post('/', upload.single('catImage'), async (req, res) => {
    const {name, gender, age, color, breed, description, cwEmail} = req.body;
    const catImgPath = req.file.filename;

    const createDateTime = new Date();
    const updateDateTime = createDateTime;

    let sql = 'INSERT INTO Cats (name, gender, age, color, breed, description, catImgPath, createDateTime, updateDateTime, cwEmail) VALUES (?,?,?,?,?,?,?,?,?,?)';

    db.query(sql, [name, gender, age, color, breed, description, catImgPath, createDateTime, updateDateTime, cwEmail], (err, result) =>  {
        if (err) {
            console.error('Error: \n', err);
            res.status(500).send('Server error');
        } else {
            res.json({message: 'Details of the cat created successfully!'})
        }
    });
});


// Export the server
module.exports = router;