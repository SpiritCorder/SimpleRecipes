const allowedOrigins = ["http://localhost:3000"];

const corsOptions = {
  origin: (origin, cb) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // this is a listed origin
      cb(null, true);
    } else {
      // not a listed origin
      cb(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
