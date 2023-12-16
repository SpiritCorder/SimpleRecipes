const express = require("express");
const cors = require("cors");

// initialize .dotenv
require("dotenv").config();

const app = express();

// setup CORS middleware
app.use(cors(require("./config/corsOptions")));

// global route handler
app.use((req, res, next) => {
  res.json({ message: "success" });
});

// specify the PORT
const PORT = process.env.NODE_ENV === "development" ? 5000 : process.env.PORT;

app.listen(PORT, () =>
  console.log(`Server is running in ${process.env.NODE_ENV} on PORT ${PORT}`)
);
