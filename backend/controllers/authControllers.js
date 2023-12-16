const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc - Register a new user
// @method - GET '/auth/register'
// @access - Public

const register = async (req, res, next) => {
  const { username, password } = req.body;

  // validate credentials
  if (username.trim() === "" || password.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Both username & password are required",
    });
  }

  if (username.trim().length <= 3 || password.trim().length <= 3) {
    return res.status(400).json({
      success: false,
      message: "Both username & password must contain at least 4 characters",
    });
  }

  // check whether a user already exists with given username
  try {
    const duplicateUser = await UserModel.findOne({ username }).lean();

    if (duplicateUser) {
      return res
        .status(400)
        .json({ success: false, message: "username is already taken" });
    }

    // encrypt the password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user document
    const newUser = await UserModel.create({
      username,
      password: hashedPassword,
    });

    // generate both access & refresh tokens
    const refreshToken = jwt.sign(
      { _id: newUser._id.toString() },
      process.env.JWT_REFRESH_TOKEN_SECRET,
      { expiresIn: "5m" }
    );

    // embed refreshToken in a cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const accessToken = jwt.sign(
      { _id: newUser._id.toString() },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );

    // send the access token along with user data to the client
    const data = {
      accessToken,
      user: { _id: newUser._id.toString(), username: newUser.username },
    };
    res
      .status(201)
      .json({ success: true, message: "Registration Success", data });
  } catch (err) {
    next(err);
  }
};

// @desc - Logged the user in by veryfying credentials
// @method - GET '/auth/login'
// @access - Public

const login = async (req, res, next) => {
  const { username, password } = req.body;

  // validate credentials
  if (username.trim() === "" || password.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Both username & password are required",
    });
  }

  if (username.trim().length <= 3 || password.trim().length <= 3) {
    return res.status(400).json({
      success: false,
      message: "Both username & password must contain at least 4 characters",
    });
  }

  // check whether a user exists within the given username
  try {
    const userExist = await UserModel.findOne({ username }).lean();

    if (!userExist) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or password" });
    }

    // check whether given password is match
    const isMatch = await bcrypt.compare(password, userExist.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or password" });
    }

    // generate both access & refresh tokens
    const refreshToken = jwt.sign(
      { _id: userExist._id.toString() },
      process.env.JWT_REFRESH_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    // embed refreshToken in a cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const accessToken = jwt.sign(
      { _id: userExist._id.toString() },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );

    // send the access token along with user data to the client
    const data = {
      accessToken,
      user: { _id: userExist._id.toString(), username: userExist.username },
    };
    res.status(200).json({ success: true, message: "Login Success", data });
  } catch (err) {
    next(err);
  }
};

// @desc - Renew the access token by verifying the refresh token
// @method - GET '/auth/refresh'
// @access - Public

const refresh = async (req, res, next) => {
  const cookie = req.cookies;

  if (!cookie?.jwt) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const refreshToken = cookie.jwt;

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_TOKEN_SECRET,
    (err, decode) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      UserModel.findById(decode._id)
        .select("-password")
        .then((user) => {
          if (!user) return res.status(401).json({ message: "Unauthorized" });

          const accessToken = jwt.sign(
            { _id: user._id, username: user.username },
            process.env.JWT_ACCESS_TOKEN_SECRET,
            { expiresIn: "5m" }
          );

          const data = {
            accessToken,
            user: { _id: user._id, username: user.username },
          };

          return res
            .status(200)
            .json({ success: true, message: "Access token renewed", data });
        })
        .catch((err) => {
          next(err);
        });
    }
  );
};

// @desc - Remove the 'jwt' cookie that contained the refresh token from response headers
// @method - GET '/auth/logout'
// @access - Public

const logout = (req, res, next) => {
  const cookie = req.cookies;

  if (!cookie?.jwt) return res.status(204).json({ message: "Logout Success" });

  // remove 'jwt' cookie from the response header
  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" });

  res.status(200).json({ message: "Logout Success" });
};

module.exports = {
  register,
  login,
  refresh,
  logout,
};
