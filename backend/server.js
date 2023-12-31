const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// initialize .dotenv
require("dotenv").config();

// connect to MongoDB
require("./config/db")();

const app = express();

// setup CORS middleware
app.use(cors(require("./config/corsOptions")));

// JSON body parser middleware
app.use(express.json());

// Cookie-Parser middleware
app.use(cookieParser());

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/recipes", require("./routes/recipesRoutes"));

// 404 error handling middlewares
app.use(require("./middlewares/errorMiddleware").notFound);

// global error handling middleware
app.use(require("./middlewares/errorMiddleware").error);

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
