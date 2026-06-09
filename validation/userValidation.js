const Joi = require('joi');

const userValidation = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        phone: Joi.string().pattern(/^\+998\d{9}$/).optional(),
        is_Admin: Joi.boolean()
    });
    return schema.validate(user);
};

module.exports = { userValidation };