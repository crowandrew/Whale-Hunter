var express = require("express");
var router = express.Router();
var db = require("../models/");

//================================================================================
//Ratings Routes
//================================================================================

//Get all ahabs from the DB for a specific beer
router.get('/ratings/:id', function (req, res) {
  db.Rating.count().then(rating => {

    res.json(rating)
      const dbRatingJson = rating.map(rating => rating.toJSON());
      var hbsObject = { rating: dbRatingJson };
      return res.json(hbsObject);
      // return res.render("index", hbsObject);
  })
})
    
//Add a new ahab to a beer
router.post('/ratings/:id', function (req, res) {
    db.Rating.findAll({
        where: {
            BeerId: req.params.id,
            UserId: req.session.user.id
        }
    }).then(ratings => {
        if (ratings.length === 0) {
            db.Rating.create({
                BeerId: req.params.id,
                UserId: req.session.user.id
            }).then(updateRating => {
                if (!updateRating) {
                    res.status(404).json(updateRating)
                } else {
                    res.json(updateRating)
                }
            }).catch(err => {
                console.log(err)
                res.status(500).json(err);
            })
        } else {
            res.json(ratings);
        }
    })
})


module.exports = router;
