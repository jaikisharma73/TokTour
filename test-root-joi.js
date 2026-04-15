const Joi = require('joi');
const reviewSchema = Joi.object({
    review:Joi.object({
        rating:Joi.number().required(),
        comment:Joi.string().required(),
    }).required()
});

console.log("Validating undefined:", reviewSchema.validate(undefined));
