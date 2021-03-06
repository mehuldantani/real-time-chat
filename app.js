const express = require('express');
const mongoose = require('mongoose');
const userrouter = require('./api/routes/user')
const app = express();

//to connect to the database using mongoose
var url = "mongodb://localhost:27017/gupshup";
mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true});
mongoose.connection
    .once("open",() => {
        console.log("and successfully connected to the Database.")
    })
    .on("error",(error)=>{
        console.log(error);
    })

app.use("/user",userrouter);

module.exports = app;