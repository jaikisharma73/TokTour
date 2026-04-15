const Joi = require('joi');
const { reviewSchema } = require('./schema');

const { error } = reviewSchema.validate({});
console.log("Error from {}:", error ? error.message : "no error", error ? error.details : "no details");

const { error: err2 } = reviewSchema.validate({ review: { rating: 5 } });
console.log("Error from {rating:5}:", err2 ? err2.message : "no error");
