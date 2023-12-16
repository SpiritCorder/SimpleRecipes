const express = require("express");
const cors = require("cors");

// initialize .dotenv
require("dotenv").config();

const app = express();

// global route handler
app.use((req, res, next) => {
  res.send("<h1>Welcome to Node</h1>");
});

// specify the PORT
const PORT = process.env.NODE_ENV === "development" ? 5000 : process.env.PORT;

app.listen(PORT, () =>
  console.log(`Server is running in ${process.env.NODE_ENV} on PORT ${PORT}`)
);
