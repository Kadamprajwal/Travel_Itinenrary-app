const Joi = require("joi");

module.exports.itinenrarySchema = Joi.object({
   itinenrary: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        activities: Joi.string().required(),
        accommodation: Joi.string().required(),
        transports: Joi.string().required(),
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        price: Joi.string().required().min(0),
        image: Joi.string().allow("", null),
    }).required(),
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required(),
});