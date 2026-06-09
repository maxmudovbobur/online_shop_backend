const { Product } = require("../models");
const { validateProduct } = require("../validation/productValidation");
const { Op } = require("sequelize");

exports.createProduct = async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try{
        const product = await Product.create(req.body);
        res.status(201).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
};


exports.getProduct = async (req, res) => {
    try{
        const product = await Product.findAll();
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.getProductById = async (req, res) => {
    try{
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).send("Product not found");
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.deleteProduct = async (req, res) => {
    try{
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(400).send("Product not found");

        const productData = product.toJSON();
        await product.destroy();
        res.status(200).send(productData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.updateProduct = async (req, res) => {
    const { error } = validateProduct(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    try{
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).send("Product not found");
        await product.update(req.body);
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.searchProduct = async (req, res) => {
    try{
        console.log("Query received:", req.query.query);
        
        const { query } = req.query;
        if (!query) {
            return res.status(400).send("Search query is required");
        }
        const product = await Product.findAll({
            where: {
                [Op.or]:[
                    { name: { [Op.iLike]: `%${query}%`} },
                    { category: { [Op.iLike]: `%${query}%`} },
                ],
            },
        });
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
};