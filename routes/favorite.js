const express = require('express');
const favoriteRouter = express.Router();
const  Favorite  = require("../models/Favorite");
const auth  = require("../middleware/auth");

//=================================
//             Favorite
//=================================

favoriteRouter.route('/favoriteNumber')
.post( auth, (req, res) => {
   
    //Find Favorite information inside Favorite Collection by Movie ID 

    Favorite.findById(req.body.movieId)
        .exec(( err, favorite ) => {
            if(err) return res.status(400).send(err)
           else if(favorite) return res.status(200).json({ success: true, favoriteNumber: favorite.length })
        })


});

favoriteRouter.route('/favorited')
.post( auth, (req, res) => {
   
    //Find Favorite information inside Favorite Collection by Movie ID 

    Favorite.find({movieId:req.body.movieId,userFrom:req.body.userFrom})
       .populate('userFrom')
        .exec(( err, favorite ) => {
            let result=false;
            if(err){ res.status(400).send(err);} 
            
           else if(favorite){
            result=true   
            res.status(200).json({ success: true, favorited: result })

           } 
        })


});

favoriteRouter.route('/addToFavorite')
.post(  (req, res) => {


  const favorite=new Favorite(req.body)
  favorite.save((err,doc)=>{
      if(err) return res.json({success:false,err})
      return res.status(200).json({success:true ,favorite:doc})
  })


});

favoriteRouter.route('/removeFavorite')
.post(  (req, res) => {
   

   Favorite.findOneAndDelete({movieId:req.body.movieId})
   .exec((err,doc)=>{
    if(err) return res.status(400).json({success:false,err})
    return res.status(200).json({success:true,doc})
   })


});

module.exports=favoriteRouter;