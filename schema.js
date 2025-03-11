const Joi = require("joi");
const review = require("./models/review");
module.exports.listhingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(1299),
    country: Joi.string().required(),
    location: Joi.string().required(),
    image: Joi.string().allow(" ", null),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(0).max(5),
    comment: Joi.string().required(),
  }).required(),
});
