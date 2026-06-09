const Joi = require('joi');

const validateProduct = (product) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        price: Joi.number().min(0).required(),
        image: Joi.string().uri().required(),
        category: Joi.string().min(2).required(),
        unit: Joi.string().min(1).required()
    });
    return schema.validate(product);
};

module.exports = { validateProduct };