const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");


const itinenrarySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
  },
  price: Number,
  startDate: Date,
  endDate: Date,
  activities: String,
  accommodation: String,
  transport: String,
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review"
  }]

});


// deleting middleware for review
itinenrarySchema.post("findOneAndDelete", async (listing) => {
  if(listing){
    let deletedReview = await Review.deleteMany({ _id: {$in: listing.reviews }});
    console.log(deletedReview);
  }
})

const Itinenrary = mongoose.model("Itinenrary", itinenrarySchema);
module.exports = Itinenrary;
