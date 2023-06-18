const express = require("express");
const cors = require("cors");

let catInfo = require("./routes/catInfo"); // API for displaying all cats in simplied info.
let catDetailsById = require("./routes/catDetailsById"); //API for Display details of the cat
let createCatDetails = require("./routes/createCatDetails"); // API for Charity Worker create cat details
let updateCatDetails = require("./routes/updateCatDetails"); // API for Charity Worker update cat details
let delCatDetails = require("./routes/delCatDetails"); // API for Charity Worker remove cat details
let cwLogin = require("./routes/cwLogin"); //Login API for Charity Worker
let cwRegister = require("./routes/cwRegister"); //Sign Up API for Charity Worker
let pubLogin = require("./routes/pubLogin"); //Login API for Charity Worker
let pubRegister = require("./routes/pubRegister"); //Sign Up API for Public
let getUserInfo = require("./routes/getUserInfo"); //API for user
let updateUserInfo = require("./routes/updateUserInfo"); // API for user update info
let getFavouriteList = require("./routes/getFavouriteList"); // API for getting favourite list
let addFavourite = require("./routes/addFavourite"); // API for adding a favourite cat
let delFavourite = require("./routes/delFavourite"); // API for removing the favourite cat

// Create the server
const app = express();

// Use CORS
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(express.json());

if (require.main === module) {
  // This file was run directly, and not required as a module in another file.
  const port = 7600;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

// Create routes
app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

// Calling RESTful API
app.use("/cat", catInfo);
app.use("/cat", catDetailsById);
app.use("/cat", createCatDetails);
app.use("/cat", updateCatDetails);
app.use("/cat", delCatDetails);
app.use("/cwLogin", cwLogin);
app.use("/cwRegister", cwRegister);
app.use("/pubLogin", pubLogin);
app.use("/pubRegister", pubRegister);
app.use("/user", getUserInfo);
app.use("/user", updateUserInfo);
app.use("/favourite", getFavouriteList);
app.use("/addFavourite", addFavourite);
app.use("/favourite", delFavourite);
app.use("/catImage", express.static("catImage"));

// Export the server
module.exports = app;
