const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// initialize .dotenv
require("dotenv").config();

// connect to MongoDB
require("./config/db")();

const app = express();

// setup CORS middleware
app.use(cors(require("./config/corsOptions")));

// specify the PORT
const PORT = process.env.NODE_ENV === "development" ? 5000 : process.env.PORT;

// check whether DB connection is successful
mongoose.connection.once("open", () => {
  console.log("Connected to DB successfully");
  app.listen(PORT, () =>
    console.log(`Server is running in ${process.env.NODE_ENV} on PORT ${PORT}`)
  );
});

// check whether DB connection is not successful
mongoose.connection.on("error", (err) => {
  console.log(err);
  console.log("Failed to connect MongoDB");
  process.exit(1);
});
