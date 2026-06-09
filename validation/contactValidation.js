const Joi = require('joi');
const validateContact = (contact) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().pattern(/^\+998\d{9}$/).optional(),
        message: Joi.string().min(10).max(1000).required()
    });
    return schema.validate(contact);
};

module.exports = { validateContact };