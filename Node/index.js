const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./userRouter");
const morgan = require("morgan")
const cors = require("cors")
require("dotenv/config")

//bodyparser
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
//use
app.use("/api",userRouter);


//sever start
app.listen(5000,()=>{
    console.log("Sever Started on port 5000");
})

//connect mongodb
mongoose.set("useUnifiedTopology",true);
mongoose.set("useNewUrlParser",true);
mongoose.connect(process.env.MY_CONNECTION,(err)=>{
    if(err){
        console.log("db not connected", err)
    }else{
        console.log("db connected successfully")
    }
})
