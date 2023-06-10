const express = require("express");
const cors = require("cors");

let catInfo = require("./routes/catInfo"); // API for displaying all cats in simplied info.
let catDetailsById = require("./routes/catDetailsById"); //API for Display details of the cat
let cwLogin = require("./routes/cwLogin"); //Login API for Charity Worker
let cwRegister = require("./routes/cwRegister"); //Sign Up API for Charity Worker
let pubLogin = require("./routes/pubLogin"); //Login API for Charity Worker
let createCatDetails = require('./routes/createCatDetails'); // API for Charity Worker create cat details
let updateCatDetails = require('./routes/updateCatDetails'); // API for Charity Worker update cat details

// Create the server
const app = express();

// Use CORS middleware
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(express.json());

const port = 7600; // Use the PORT environment variable, or 5000 if the variable isn't set

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Create routes
app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

// Calling RESTful API
app.use("/v1/cat", catInfo);
app.use("/v1/cat", catDetailsById);
app.use("/v1/cwLogin", cwLogin);
app.use("/v1/cwRegister", cwRegister);
app.use("/v1/pubLogin", pubLogin);
app.use("/v1/createCatDetails", createCatDetails);
app.use("/v1/updateCatDetails", updateCatDetails);
app.use('/catImage', express.static('catImage'));

// Export the server
module.exports = app;
