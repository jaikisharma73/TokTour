const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    filename: {
      type: String,
      required: true,
      default: "listingimage",
    },
    url: {
      type: String,
      required: true,
      default:
        "https://images.unsplash.com/photo-1765371512336-99c2b1c6975f?q=80&w=2033&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
});

// module.exports = mongoose.model("Listing", listingSchema);
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
