const Joi = require("joi");

const validateServices = (services) => {
    const schema = Joi.object({
        icon: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().optional(),
        features: Joi.string().optional()
    });
    
    return schema.validate(services);
};

module.exports = { validateServices };