const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const mongoose = require("mongoose");

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

//Index Route
router.get("/", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });

});

//New Route
router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
})

//Show Route

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("Listing not found");
    }

    const listing = await Listing.findById(id).populate("reviews");

    if (!listing) {
        return res.status(404).send("Listing not found");
    }

    res.render("listings/show.ejs", { listing });
});


//Create Route
router.post("/", validateListing,
    wrapAsync(async (req, res, next) => {
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        req.flash("success", "New Listing Added!");
        res.redirect("/listings");
    }));

//Edit Route

router.get("/:id/edit", async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("Invalid listing ID");
    }

    const listing = await Listing.findById(id);

    if (!listing) {
        return res.status(404).send("Listing not found");
    }
    res.render("listings/edit.ejs", { listing });
});


//update Route
router.put("/:id", validateListing,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        await Listing.findByIdAndUpdate(id, { ...req.body.listing });
        res.redirect(`/listings/${id}`);
    }));

//Delete route
router.delete("/:id", async (req, res) => {
    let { id } = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    res.redirect("/listings");
})

module.exports = router;