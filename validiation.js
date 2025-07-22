const Joi = require("joi");

const userSchema = Joi.object({
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    gender: Joi.string().valid("Male", "Female", "Other").required(),
    jobTitle: Joi.string().required()
});


module.exports = userSchema;