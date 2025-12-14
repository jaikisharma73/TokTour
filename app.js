const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("Connected To Database");
}).catch((err)=>{
    console.log(err)
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/",(req,res)=>{
    res.send("Hi i am here");
} )

//Index Rout
app.get("/listings",async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
    
})

// app.get("/testListing", async(req,res)=>{
//     let sampleListing =  new Listing({
//         title : "My new Villa",
//         description : "By the beach",
//         price : 1200,
//         location : ",Ruksar, Goa",
//         country : "India",
//     });
//     await sampleListing.save();
//     console.log("Sample wa saved");
//     res.send("Successfull testing");
// });

app.listen(8080, ()=>{
    console.log("Server is listening to port 8080");
});