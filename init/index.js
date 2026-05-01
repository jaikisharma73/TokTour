const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("Connected To Database");
}).catch((err) => {
    console.log(err)
})

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        image: {
            url: obj.image,
            filename: ""
        },
        owner: "69f0b9b480eacf6ed0d60306",
    }))
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
}
initDB();