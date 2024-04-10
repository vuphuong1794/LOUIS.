const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const productRoute = require("./routes/product")
const cors = require("cors")
const cookieParser = require("cookie-parser")

dotenv.config()

mongoose
    .connect(process.env.MONGO_DB)
    .then(()=>{console.log("connected to DB")})
    .catch((err)=>{console.log(err)})

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:8000",
    credentials: true,
}));
app.use(express.json())
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute)
app.use("/api/products", productRoute)

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