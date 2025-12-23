const express = require("express");
const router= express.Router({mergeParams:true});


const wrapasync = require("../utils/wrapasync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor}= require("../middleware.js");

const reviewController=require("../controllers/reviews.js");





///revies
//post route 

 router.post("/",isLoggedIn,validateReview, wrapasync( reviewController.createReview));


//delete route of review

 router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapasync(reviewController.deletereview)
 );


module.exports =router;