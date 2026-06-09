const Joi = require("joi");

const validateCategory = (category) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(30).required(),
        icon: Joi.string().optional(),
        count: Joi.number().required(),
        description: Joi.string().optional()
    });
    return schema.validate(category);
};

module.exports = { validateCategory };