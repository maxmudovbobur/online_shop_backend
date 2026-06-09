const { Services } = require("../models");
const { validateServices } = require("../validation/servicesValidation");
const { Op } = require("sequelize");

exports.createServices = async (req, res) => {
    const { error } = validateServices(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try{
        const services = await Services.create(req.body);
        res.status(201).send(services);
    } catch (error) {
        res.status(500).send(error);
    }
};


exports.getServices = async (req, res) => {
    try{
        const services = await Services.findAll();
        res.status(200).send(services);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.getServicesById = async (req, res) => {
    try{
        const services = await Services.findByPk(req.params.id);
        if (!services) return res.status(404).send("Services not found");
        res.status(200).send(services);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.deleteServices = async (req, res) => {
    try{
        const services = await Services.findByPk(req.params.id);
        if (!services) return res.status(400).send("Services not found");

        const servicesData = services.toJSON();
        await services.destroy();
        res.status(200).send(servicesData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.updateServices = async (req, res) => {
    const { error } = validateServices(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    try{
        const services = await Services.findByPk(req.params.id);
        if (!services) return res.status(404).send("Services not found");
        await services.update(req.body);
        res.status(200).send(services);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.searchServices = async (req, res) => {
    try{
        console.log("Query received:", req.query.query);
        
        const { query } = req.query;
        if (!query) {
            return res.status(400).send("Search query is required");
        }
        const services = await Services.findAll({
            where: {
                [Op.or]:[
                    { title: { [Op.iLike]: `%${query}%`} },
                    { description: { [Op.iLike]: `%${query}%`} },
                ],
            },
        });
        res.status(200).send(services);
    } catch (error) {
        res.status(500).send(error.message);
    }
};