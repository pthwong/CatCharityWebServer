const express = require("express");
const cors = require("cors");

let catInfo = require("./routes/catInfo");
let catDetailsById = require("./routes/catDetailsById");

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

// Restful API
app.use("/v1/cat", catInfo);
app.use("/v1/cat", catDetailsById);

// Export the server
module.exports = app;
