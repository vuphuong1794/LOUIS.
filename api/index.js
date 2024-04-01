const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const authRoute = require("./routes/auth")
const cors = require("cors")

dotenv.config()

mongoose
    .connect(process.env.MONGO_DB)
    .then(()=>{console.log("connected to DB")})
    .catch((err)=>{console.log(err)})

app.use(cors());
app.use(express.json())
app.use("/api/auth", authRoute);

app.listen(process.env.PORT || 8000, ()=>{
    console.log("server is running")
})