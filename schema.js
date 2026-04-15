const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        country : Joi.string().required(),
        location : Joi.string().required(),
        price : Joi.number().required().min(0),

        image : Joi.object({          // ✅ image is object
            filename : Joi.string().allow("").optional(),
            url : Joi.string().uri().allow("").optional()
        }).optional()

    }).required()
});


module.exports.reviewSchema = Joi.object({
    review:Joi.object({
        rating:Joi.number().required(),
        comment:Joi.string().required(),
    }).required()
})