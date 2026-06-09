const Joi = require('joi');

const validateOrder = (order) => {
    const schema = Joi.object({
        customerName: Joi.string().min(2).max(50).required(),
        customerPhone: Joi.string().pattern(/^\+998[0-9]{9}$/).required(),
        customerAddress: Joi.string().min(5).required(),
        items: Joi.string().required(),  
        total: Joi.number().min(0).required(),
        paymentMethod: Joi.string().required() 
    });
    return schema.validate(order);
};

module.exports = { validateOrder };