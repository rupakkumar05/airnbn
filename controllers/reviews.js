const listing = require("../models/listing.js");
const Review = require("../models/review.js");




module.exports .createReview   = async (req, res) => {
    let { id } = req.params;
    let Listing = await listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    Listing.reviews.push(newReview);
    await newReview.save();
    await Listing.save();
    req.flash("sucess", " New Review Created !");
    res.redirect(`/listing/${id}`);
  }



  module.exports.deleteRivew   =async (req, res) => {
    let { id, reviewId } = req.params;
    await listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("sucess", "  Review DELETED !");
    res.redirect(`/listing/${id}`);
  }