const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session")
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const reviewRoute = require("./routes/review");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const mailRoute = require("./routes/mailer");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const stripe = require("./routes/stripe");
const passport = require("passport")
const MongoStore = require('connect-mongo');
require("./routes/auth");

dotenv.config();

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

// MIDDLEWARES
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8000",
  "https://louis-a89w.onrender.com",
  "https://louis17.netlify.app",
  "http://localhost:3001",
];

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:8000",
      "https://louis-a89w.onrender.com",
      "https://louis17.netlify.app",
      "http://localhost:3001",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key', // Sử dụng biến môi trường cho bảo mật
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGO_DB,
    collectionName: 'sessions' // Tùy chọn: đặt tên cho collection
  }),
  cookie: { 
    secure: process.env.NODE_ENV === 'production', // Sử dụng secure cookies trong production
    maxAge: 1000 * 60 * 60 * 24 // Ví dụ: cookie hết hạn sau 1 ngày
  }
}));

app.use(passport.initialize())
app.use(passport.session())

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.sendStatus(401);  // Unauthorized
  }
}

//ROUTES
app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/mail", mailRoute);
app.use("/api/stripe", stripe);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
    session: true
  }),
  (req, res) => {
    // Chuyển hướng về với thông tin người dùng
    res.redirect(`https://louis17.netlify.app/login-success?user=${encodeURIComponent(JSON.stringify(req.user))}`);
  }
);

/*
app.get('/auth/protected', isLoggedIn,(req, res)=>{
  let name = req.user.displayName
  res.send(`hello ${name}!`)
})
*/

app.get('/auth/google/failure', (req, res)=>{
  res.send("something went wrong!")
})

//xu ly neu co loi xay ra
app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something went wrong!";
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT || 8000, () => {
  console.log("server is running");
});