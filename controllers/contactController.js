const { Contact } = require("../models");
const { validateContact } = require("../validation/contactValidation");
const { Op } = require("sequelize");

exports.createContact = async (req, res) => {
    const { error } = validateContact(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try{
        const contact = await Contact.create(req.body);
        res.status(201).send(contact);
    } catch (error) {
        res.status(500).send(error);
    }
};


exports.getContact = async (req, res) => {
    try{
        const contact = await Contact.findAll();
        res.status(200).send(contact);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.getContactById = async (req, res) => {
    try{
        const contact = await Contact.findByPk(req.params.id);
        if (!contact) return res.status(404).send("Contact not found");
        res.status(200).send(contact);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.deleteContact = async (req, res) => {
    try{
        const contact = await Contact.findByPk(req.params.id);
        if (!contact) return res.status(400).send("Contact not found");

        const contactData = contact.toJSON();
        await contact.destroy();
        res.status(200).send(contactData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.updateContact = async (req, res) => {
    const { error } = validateContact(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    try{
        const contact = await Contact.findByPk(req.params.id);
        if (!contact) return res.status(404).send("Contact not found");
        await contact.update(req.body);
        res.status(200).send(contact);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.searchContact = async (req, res) => {
    try{
        console.log("Query received:", req.query.query);
        
        const { query } = req.query;
        if (!query) {
            return res.status(400).send("Search query is required");
        }
        const contact = await Contact.findAll({
            where: {
                [Op.or]:[
                    { name: { [Op.iLike]: `%${query}%`} },
                    { email: { [Op.iLike]: `%${query}%`} },
                ],
            },
        });
        res.status(200).send(contact);
    } catch (error) {
        res.status(500).send(error.message);
    }
};