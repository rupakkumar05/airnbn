const listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
  const allListing = await listing.find({});
  res.render("listings/index.ejs", { allListing });
};

module.exports.renderNewform = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const Listing = await listing
    .findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!Listing) {
    req.flash("error", " This listing does not exist !");
    res.redirect("/listing");
  }
  console.log(Listing);
  res.render("listings/show.ejs", { Listing });
};

module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newlisting = new listing(req.body.listing);
  newlisting.owner = req.user._id;
  newlisting.image = { url, filename };
  await newlisting.save();
  req.flash("sucess", "New Listings Created !");
  res.redirect("/listing");
};

module.exports.rendereditform = async (req, res) => {
  let { id } = req.params;
  const Listing = await listing.findById(id);
  if (!Listing) {
    req.flash("error", " This listing does not exist !");
    res.redirect("/listing");
  }
  let originalimageUrl = Listing.image.url;
  originalimageUrl= originalimageUrl.replace("/upload", "/upload/w_2560");
  res.render("listings/edit.ejs", { Listing,originalimageUrl });
};

module.exports.upsateListing = async (req, res) => {
  let { id } = req.params;
  let listings = await listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listings.image = { url, filename };
    await listings.save();
  }

  req.flash("sucess", "Listings Updated !");
  res.redirect(`/listing/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deletedlistings = await listing.findByIdAndDelete(id);
  req.flash("sucess", " Listings DELETED !");
  console.log(deletedlistings);
  res.redirect("/listing");
};
