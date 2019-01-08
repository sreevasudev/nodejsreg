const express=require("express")
 const router = express.Router();
 const bcrypt=require("bcryptjs")
 const jsonwt=require("jsonwebtoken")
 const passport=require("passport")
 const key=require("../../setup/dburl")
 const bodyparser=require("body-parser")


 //node indexrouter.get("/",(req,res)=>res.send("00ok"))
 const Person=require("../../models/Person")
 router.post("/register",(req,res)=>{
     Person.findOne({ email:req.body.email})
     .then(person=>{
         if(person){
             return res
             .status(400)
             .json({emailerror:"email arlareday exists"})
         }else{
             const newPerson = new Person({
                 name:req.body.name,
                 email:req.body.email,
                 username:req.body.username,
                 password:req.body.password
             })
             //encrypt pwd
             bcrypt.genSalt(10, (err, salt) =>{
                bcrypt.hash(newPerson.password, salt, (err, hash) =>{
                    // Store hash in your password DB.
                    if(err)
                    throw (err)
                    newPerson.password=hash;
                    newPerson.save()
                    .then(person=>res.json(person))
                    .catch(err=>console.log(err))
                })
            });
         }
     })
     .catch(err=>console.log(err))
 })

 module.exports=router