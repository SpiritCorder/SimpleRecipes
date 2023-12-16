const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const auth = (req, res, next) => {
  const tokenHeader = req.header("Authorization") || null;

  if (!tokenHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = tokenHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, decode) => {
    if (err) return res.status(403).json({ message: "Forbidden" });

    UserModel.findById(decode._id)
      .select("-password")
      .lean()
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

module.exports = auth;
