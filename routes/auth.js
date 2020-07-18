const express=require('express');
const authRouter=express.Router();
const bodyParser=require('body-parser');
const User=require('../models/User');
const bcrypt=require('bcryptjs');
const config=require('config');
const jwtSecret=require('jsonwebtoken');
const auth=require('../middleware/auth');

authRouter.use(bodyParser.json())
//making router
authRouter.route('/')
.post((req,res,next)=>{
     const {email,password}=req.body;

     //check whether any of the field is not filled
     if(!email||!password){
          res.statusCode=400;
          res.json({msg:"Enter all field"});
     }
     //for if user exist or not
     User.findOne({email})
     .then(user=>{
         if (!user){
             res.statusCode=400;
             res.json({msg:'User does not exist exist'})
         }
     
     
      //match user entered is present or not

      bcrypt.compare(password,user.password)
      .then(isMatch=>{
          if(!isMatch){
              res.statusCode=400;
              res.json({msg:"Credential not matched"})
          }
      jwtSecret.sign({
        id:user.id},
        config.get('jwtSecret'),
        {expiresIn:3600},
        (err,token)=>{
            if(err) throw err;
            res.json({
               token,
               user:{
                   id:user.id,
                   name:user.name,
                   email:user.email
               }
           })
        })
        })
    })
    })

    authRouter.route('/user')
    .get(auth,(req,res)=>{
        User.findById(req.user.id)
        .select('-password')
        .then(user=>res.json(user))
        .catch(err=>console.log(err))
    })


    module.exports=authRouter;