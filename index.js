const express=require("express")

const mongoose=require("mongoose")
//var mongoose = require('mongodb').MongoClient;
const app=express()
const auth=require("./routes/api/auth")
const db=require("./setup/dburl").url
const bodyparser=require("body-parser")
const jsonwt=require("jsonwebtoken")



mongoose.connect(db)
.then(()=>console.log("db connected"))
.catch(()=>console.log("error"))
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())


app.use("/api/auth",auth)


const port= process.env.PORT||3000;
app.listen(port,()=>console.log("port runnning 3000"))