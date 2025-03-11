const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validatereciew, isLogedin,isreviewAuthor } = require("../middleware.js");
const reviewcontroller = require("../controllers/reviews.js")

//Reviews Rout
//POST Review ROUT
router.post(
  "/",
  isLogedin,
  validatereciew,
  wrapAsync(reviewcontroller.createReview)
);


// DELETE Review Rout
router.delete(
  "/:reviewId",
  isLogedin,
  isreviewAuthor,
  wrapAsync(reviewcontroller.deleteRivew)
);

module.exports = router;
