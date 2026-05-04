if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js")
const session = require("express-session");
const MongoStore = require("connect-mongo").default || require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


const dbURL = process.env.ATLASDB_URL;

main().then(() => {
    console.log("Connected To Database");
}).catch((err) => {
    console.log(err)
})

async function main() {
    await mongoose.connect(dbURL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")));

const store = MongoStore.create({
    mongoUrl: dbURL,
    crypto: { secret: process.env.SECRET },
    touchAfter: 24 * 60 * 60,
});

store.on("error", () => {
    console.log("Error in mongo session store", err);
})

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.get("/demouser", async (req, res) => {
    let fackUser = new User({
        email: "student@gmail.com",
        username: "delta-student",
    });
    let registeredUser = await User.register(fackUser, "helloworld");
    res.send(registeredUser);
})


app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.get("/about", (req, res) => {
    res.render("pages/about.ejs");
});

app.get("/careers", (req, res) => {
    res.render("pages/careers.ejs");
});

app.get("/blog", (req, res) => {
    res.render("pages/blog.ejs");
});

app.get("/contact", (req, res) => {
    res.render("pages/contact.ejs");
});

app.get("/faq", (req, res) => {
    res.render("pages/faq.ejs");
});

app.get("/help", (req, res) => {
    res.render("pages/help.ejs");
});

app.get("/privacy", (req, res) => {
    res.render("pages/privacy.ejs");
});

app.get("/terms", (req, res) => {
    res.render("pages/terms.ejs");
});

app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404, "Page Not Found !"));
});


app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something Went Wrong!" } = err;
    res.status(statusCode).render("error.ejs", { err });
    // res.status(statusCode).send(message)
});

if (process.env.NODE_ENV !== "production") {
    app.listen(8080, () => {
        console.log("Server is listening to port 8080");
    });
}

module.exports = app;