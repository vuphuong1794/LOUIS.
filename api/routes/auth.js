const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createdError = require("../utils/error")

//register
router.post("/register", async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res.status(200).json("User has been created!");
  } catch (err) {
      next(err);
  }
});

//login
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    if(!user) 
      return next(createdError(404, "Wrong username!"));
    
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) 
      return next(createdError(400, "Wrong password!"));

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "1d" }
    );

    const { password, isAdmin,...others } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "none",
      })
      .status(200)
      .json({...others , isAdmin, token});
  } catch (err) {
      next(err);
  }
});

module.exports = router;