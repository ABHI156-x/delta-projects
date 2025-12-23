const express = require("express");
const router= express.Router();

const wrapasync = require("../utils/wrapasync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn, isOwner, validatelisting} =require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require('multer');
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

// index and create route
router.route("/")
    .get( wrapasync (listingController.index))
    .post(isLoggedIn,upload.single("listing[image]"),validatelisting, wrapasync( listingController.createListing)
   );
   

//new route
router.get("/new",isLoggedIn,  listingController.renderNewForm);

// show , edit , delete  update id route
router.route("/:id")
    .get( wrapasync(listingController.showListing))
    .put(isLoggedIn,isOwner, upload.single("listing[image]") ,  validatelisting, wrapasync (listingController.updateListing))
    .delete(isLoggedIn,isOwner, wrapasync (listingController.deleteListing));




// edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapasync( listingController.editListing));



module.exports =router;