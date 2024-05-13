const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const mailRoute = require("./routes/mailer")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const stripe = require("./routes/stripe")

dotenv.config()

mongoose
    .connect(process.env.MONGO_DB)
    .then(()=>{console.log("connected to DB")})
    .catch((err)=>{console.log(err)})

// MIDDLEWARES

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:8000',
  'https://louis-a89w.onrender.com',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.some(allowed => origin.startsWith(allowed))) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json())

//ROUTES
app.get('/', (req, res) => {
  res.send('hello');
});
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/carts", cartRoute)
app.use("/api/orders", orderRoute)
app.use("/api/mail", mailRoute)
app.use("/api/stripe", stripe)

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

app.listen(process.env.PORT || 8000, ()=>{
    console.log("server is running")
})