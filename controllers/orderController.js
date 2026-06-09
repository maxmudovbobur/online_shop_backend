const { Order } = require("../models");
const { validateOrder } = require("../validation/orderValidation");
const { Op } = require("sequelize");

exports.createOrder = async (req, res) => {
    const { error } = validateOrder(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try{
        const order = await Order.create(req.body);
        res.status(201).send(order);
    } catch (error) {
        res.status(500).send(error);
    }
};


exports.getOrder = async (req, res) => {
    try{
        const order = await Order.findAll();
        res.status(200).send(order);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.getOrderById = async (req, res) => {
    try{
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).send("Order not found");
        res.status(200).send(order);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.deleteOrder = async (req, res) => {
    try{
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(400).send("Order not found");

        const orderData = order.toJSON();
        await order.destroy();
        res.status(200).send(orderData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.updateOrder = async (req, res) => {
    const { error } = validateOrder(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    try{
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).send("Order not found");
        await order.update(req.body);
        res.status(200).send(order);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.searchOrder = async (req, res) => {
    try{
        console.log("Query received:", req.query.query);
        
        const { query } = req.query;
        if (!query) {
            return res.status(400).send("Search query is required");
        }
        const order = await Order.findAll({
            where: {
                [Op.or]:[
                    { customerName: { [Op.iLike]: `%${query}%`} },
                    { customerPhone: { [Op.iLike]: `%${query}%`} },
                ],
            },
        });
        res.status(200).send(order);
    } catch (error) {
        res.status(500).send(error.message);
    }
};