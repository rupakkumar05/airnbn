const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const listing = require("../models/listing.js");
const { isLogedin, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//CREATE Rout
// index Rout
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLogedin,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

//New Rout
router.get("/new", isLogedin, listingController.renderNewform);

//show Rout
// update rout
//delete Rout
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLogedin,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.upsateListing)
  )
  .delete(isLogedin, isOwner, wrapAsync(listingController.deleteListing));

//Edit Rout
router.get(
  "/:id/edit",
  isLogedin,
  isOwner,
  wrapAsync(listingController.rendereditform)
);

module.exports = router;
