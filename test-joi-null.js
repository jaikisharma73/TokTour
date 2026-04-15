const Joi = require('joi');
const { reviewSchema } = require('./schema');

console.log(reviewSchema.validate(null));
console.log(reviewSchema.validate({ review: null }));
console.log(reviewSchema.validate({ review: { rating: 5, comment: null } }));
