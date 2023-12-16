// route not found middleware
const notFound = (req, res, next) => {
  res.statusCode = 404;
  const error = new Error("Resource not found");
  next(error);
};

// error handling middleware
const error = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  const errMessage = err.message ? err.message : "Internal server error";

  res.status(statusCode).json({ message: errMessage });
};

module.exports = {
  notFound,
  error,
};
