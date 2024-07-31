const express = require("express");
const router = express.Router({ mergeparams: true });
const Review = require("../models/review.js");
const Itinenrary= require("../models/itinenrary.js");
const wrapAsync = require("../utils/wrapAsync.js"); 
const ExpressError = require("../utils/ExpressError.js");
const {  reviewSchema } = require("../schema.js");

const validateReview = (req,res,next) => {
    let { error } = reviewSchema.validate(req.body); 
    if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg );
    }else{
    next();
  }
};

// post route
router.post("/reviews", validateReview,  wrapAsync (async (req, res) => {
    let itinenrary = await Itinenrary.findById(req.params.id);
    let newReview = new Review(req.body.review);
    itinenrary.reviews.push(newReview);
    await newReview.save();
    await itinenrary.save();
    req.flash("success" , "New Review Created!"); 
    res.redirect(`/itinenrary/${itinenrary._id}`);
    
    }));
    
    // Delete Review Route
    router.delete("/:reviewId",
    wrapAsync(async (req,res) => {
      let { id, reviewId } = req.params;
      await Itinenrary.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
      await Review.findByIdAndDelete(reviewId);
      req.flash("success" , "Review Deleted"); 
      res.redirect(`/itinenrary/${id}`);
    }));

    module.exports = router;
    