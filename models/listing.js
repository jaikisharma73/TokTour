const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const listingSchema = new Schema({
  title: {
    type: String,

  },
  description: {
    type: String,

  },
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
    default: 0,
  },

  location: {
    type: String,
  },
  country: {
    type: String,
  },
  filters: [
    {
      type: String,
      enum: ["Trending", "Rooms", "City", "Mountains", "SwimmingPool", "Castles", "Camping", "Farms", "Arctic", "Domes", "Boats", "Parks", "Skiing", "Tropical", "Tiny Homes", "Top Views", "Lakefront", "Historical", "B&Bs", "Glamping", "Desert"]
    }
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  ]
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
})

// module.exports = mongoose.model("Listing", listingSchema);
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
