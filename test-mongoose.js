const mongoose = require('mongoose');
const Listing = require('./models/listing');
mongoose.connect('mongodb://127.0.0.1:27017/wanderlust').then(async () => {
    const listing = await Listing.findById('6945973306d87bbf2a2886f1');
    console.log("Listings Reviews:", listing.reviews);
    mongoose.disconnect();
});
