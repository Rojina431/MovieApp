const User=require('../models/User');
const express=require('express');
const userRouter=express.Router();
const bodyParser=require('body-parser');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');

userRouter.use(bodyParser.json())
userRouter.route('/')
.post((req,res)=>{
    const {name,email,password}=req.body;

    //check whether any of the field is not filled
    if(!name||!email||!password){
        res.statusCode=400;
        res.json({msg:"Enter all field"});
   }
   //for existing user
   User.findOne({email})
   .then(user=>{
       if (user){
           res.statusCode=400;
           res.json({msg:'User already exist'})
       }
   });


 //creating new user
 const newUser=new User({
     name,email,password
 });

 bcrypt.genSalt(10,(err,salt)=>{
     bcrypt.hash(newUser.password,salt,(err,hash)=>{
        if(err){
            console.log(err);
        }
        newUser.password=hash;
        newUser.save()
        .then(user=>{
            jwt.sign({id:user.id},
                config.get('jwtSecret'),
                {expiresIn:3600},
                (err,token)=>{
                    if(err){
                        console.log(err)
                    }else{
                        res.json({
                            token,
                            user:{
                                id:user.id,
                                name:user.name,
                                email:user.email
                            }
                        })
                    }
                })
        })
     })
     

 })
})

module.exports=userRouter;