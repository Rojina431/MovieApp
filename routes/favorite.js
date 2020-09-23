const express = require('express');
const favoriteRouter = express.Router();
const  Favorite  = require("../models/Favorite");
//=================================
//             Favorite
//=================================


favoriteRouter.route('/favoriteNumber')
.post((req, res) => {

    //Find Favorite information inside Favorite Collection by Movie ID 

    Favorite.find({ "movieId": req.body.movieId })
        .exec((err, favorite) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, favoriteNumber: favorite.length })
        })


});


favoriteRouter.route('/favorited')
.post((req, res) => {


    // Find Favorite Information inside Favorite Collection by Movie Id , userFrom 
    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
        .exec((err, favorite) => {
            if (err) return res.status(400).send(err)

            //How can we know if I already favorite this movie or not ? 
            var result=false;
            if (favorite.length !== 0) {
                result = true
            }

            res.status(200).json({ success: true, favorited: result });

        })

});


favoriteRouter.route('/addToFavorite')
.post( (req, res) => {

    // Save the information about the movie or user Id  inside favorite collection 
    const favorite = new Favorite(req.body)

    favorite.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true,doc })
    })

});


favoriteRouter.route('/removeFavorite')
.post(  (req, res) => {

    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, doc })
        })

});

favoriteRouter.route('/getFavoritedMovie')
.post(  (req, res) => {

    Favorite.find({ userFrom: req.body.userFrom })
    .exec((err, favorites) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true, favorites })
    })
})




module.exports = favoriteRouter;