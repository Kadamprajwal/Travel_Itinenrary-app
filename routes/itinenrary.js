const express = require("express");
const router = express.Router();
const Itinenrary= require("../models/itinenrary.js");
const wrapAsync = require("../utils/wrapAsync.js"); 
const ExpressError = require("../utils/ExpressError.js");
const { itinenrarySchema } = require("../schema.js");
const {isLoggedIn} = require("../middleware.js");


const validateItinenrary = (req,res,next) => {
    let { error } = itinenrarySchema.validate(req.body); 
    if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg );
    }else{
    next();
  }
  };

//Index Route
router.get("/", wrapAsync(async (req, res,next) => {
    const allItinenrarys = await Itinenrary.find({});
    res.render("itinenrary/index.ejs", { allItinenrarys });
  }));
  
  //New Route
  router.get("/new", isLoggedIn, (req, res) => {
    res.render("itinenrary/new.ejs");
  });
  
  //Show Route
 router.get("/:id", async (req, res) => {
    let { id } = req.params;
    const itinenrary = await Itinenrary.findById(id).populate("reviews");
   if(!itinenrary) {
    req.flash("error", "Itinenrary you requested for does not exit!");
    res.redirect("/itinenrary");
   }
    res.render("itinenrary/show.ejs", { itinenrary });
  });
  
  //Create Route
 router.post("/", validateItinenrary,  isLoggedIn, wrapAsync(async (req, res, next) => {
    const newItinenrary = new Itinenrary(req.body.itinenrary);
    await newItinenrary.save();
    req.flash("success" , "New Itinenrary Created!"); 
    res.redirect("/itinenrary");
  }));
  
  //Edit Route
 router.get("/:id/edit",  isLoggedIn, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const itinenrary = await Itinenrary.findById(id);
    if(!itinenrary) {
      req.flash("error", "Itinenrary you requested for does not exit!");
      res.redirect("/itinenrary");
     }
    res.render("itinenrary/edit.ejs", { itinenrary });
  }));
  
  //Update Route
 router.put("/:id", validateItinenrary, isLoggedIn, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Itinenrary.findByIdAndUpdate(id, { ...req.body.itinenrary });
    req.flash("success" , "  Itinenrary Updated!"); 
    res.redirect(`/itinenrary/${id}`);
  }));
  
  //Delete Route
 router.delete("/:id",  isLoggedIn, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedItinenrary = await Itinenrary.findByIdAndDelete(id);
    console.log(deletedItinenrary);
    req.flash("success" , "Itinenrary Deleted!"); 
    res.redirect("/itinenrary");
  }));




  module.exports = router;