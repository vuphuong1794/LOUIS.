// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const createdError = require("../utils/error");

// let refreshTokens = [];

// const authController = {
//   // Register
//   registerUser: async (req, res, next) => {
//     try {
//       const salt = await bcrypt.genSalt(10);
//       const hashed = await bcrypt.hash(req.body.password, salt);
      
//       const newUser = new User({
//         username: req.body.username,
//         email: req.body.email,
//         password: hashed,
//       });
      
//       const savedUser = await newUser.save();
//       res.status(200).json(savedUser);
//     } catch (err) {
//       next(err);
//     }
//   },

//   // Generate access token
//   generateAccessToken: (user) => {
//     return jwt.sign(
//       {
//         id: user._id,
//         isAdmin: user.isAdmin,
//       },
//       process.env.JWT_ACCESS_KEY,
//       { expiresIn: "20s" }
//     );
//   },

//   // Generate refresh token
//   generateRefreshToken: (user) => {
//     return jwt.sign(
//       {
//         id: user._id,
//         isAdmin: user.isAdmin,
//       },
//       process.env.JWT_REFRESH_KEY,
//       { expiresIn: "365d" }
//     );
//   },

//   // Login
//   loginUser: async (req, res, next) => {
//     try {
//       const user = await User.findOne({ username: req.body.username });
//       if (!user) return next(createdError(404, "Wrong username!"));

//       const isPasswordCorrect = await bcrypt.compare(
//         req.body.password,
//         user.password
//       );
//       if (!isPasswordCorrect) return next(createdError(400, "Wrong password!"));

//       if (user && isPasswordCorrect) {
//         const accessToken = authController.generateAccessToken(user);
//         const refreshToken = authController.generateRefreshToken(user);
//         refreshTokens.push(refreshToken);

//         res.cookie("refreshToken", refreshToken, {
//           httpOnly: true,
//           secure: false,
//           path: "/",
//           sameSite: "none",
//         });

//         const { password, isAdmin, ...others } = user._doc;
//         res.status(200).json({ ...others, isAdmin, accessToken });
//       }
//     } catch (err) {
//       next(err);
//     }
//   },

//   // Request new access token
//   requestRefreshToken: async (req, res) => {
//     const refreshToken = req.cookies.refreshToken;
//     if (!refreshToken) return res.status(401).json("You are not authenticated!");
//     if (!refreshTokens.includes(refreshToken)) {
//       return res.status(403).json("Refresh token is not valid!");
//     }

//     jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
//       if (err) {
//         console.log(err);
//         return res.status(403).json("Refresh token is not valid!");
//       }

//       refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

//       const newAccessToken = authController.generateAccessToken(user);
//       const newRefreshToken = authController.generateRefreshToken(user);
//       refreshTokens.push(newRefreshToken);

//       res.cookie("refreshToken", newRefreshToken, {
//         httpOnly: true,
//         secure: false,
//         path: "/",
//         sameSite: "none",
//       });

//       res.status(200).json({ accessToken: newAccessToken });
//     });
//   },

//   // Logout
//   userLogOut: async (req, res) => {
//     res.clearCookie("refreshToken");
//     refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
//     res.status(200).json("Logged out successfully!");
//   }
// };

// module.exports = authController;