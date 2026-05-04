const Listing = require("../models/listing.js");
const mongoose = require("mongoose");

module.exports.index = async (req, res) => {
    let { filter, search } = req.query;
    let query = {};
    
    if (filter) {
        query.filters = filter;
    }
    
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { country: { $regex: search, $options: "i" } }
        ];
    }
    
    const allListings = await Listing.find(query);
    res.render("listings/index.ejs", { allListings, currentFilter: filter || "" });
}
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("Listing not found");
    }
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" }, }).populate("owner");
    if (!listing) {
        req.flash("error", "No Listing Exists!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    
    // Ensure filters is an array even if empty or undefined
    let listingData = req.body.listing;
    if (!listingData.filters) {
        listingData.filters = [];
    }

    const newListing = new Listing(listingData);
    newListing.image = { url, filename };
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Added!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("Invalid listing ID");
    }

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "No Listing Exists!");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload/", "/upload/w_250/");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {

    let { id } = req.params;
    
    let listingData = req.body.listing;
    if (!listingData.filters) {
        listingData.filters = []; // If no checkboxes selected, clear filters
    }

    let listing = await Listing.findByIdAndUpdate(id, { ...listingData });

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;

        listing.image = { url, filename };
        await listing.save();
    }


    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}

