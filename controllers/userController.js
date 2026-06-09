const { User } = require("../models");
const { userValidation } = require("../validation/userValidation");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
    const { error } = userValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        // Nechta user borligini tekshiramiz
        const usersCount = await User.count();

        // Birinchi user admin bo‘ladi
        if (usersCount === 0) {
            req.body.is_Admin = true;
        } else {
            req.body.is_Admin = false;
        }

        const user = await User.create(req.body);
        res.status(201).send(user);

    } catch (error) {
        res.status(500).send(error);
    }
};



exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Userni topamiz
        const user = await User.findOne({ where: { email } });

        if (!user)
            return res.status(400).send("Email yoki parol noto‘g‘ri!");

        // Parolni solishtiramiz
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword)
            return res.status(400).send("Email yoki parol noto‘g‘ri!");

        // Token yaratamiz
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                is_Admin: user.is_Admin
            },
            process.env.JWT_SECRET || "super_secret_key",
            { expiresIn: "7d" }
        );

        res.send({
            message: "Muvaffaqiyatli login!",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                is_Admin: user.is_Admin
            }
        });

    } catch (error) {
        res.status(500).send(error);
    }
};



exports.getUser = async (req, res) => {
    try {
        const user = await User.findAll();
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        if (!user) return res.status(400).send("User not found");
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(400).send("User not found");
        const userData = user.toJSON();
        await user.destroy();
        res.status(200).send(userData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateUser = async (req, res) => {
    const { error } = userValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).send("User not found");
        await user.update(req.body);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchUser = async (req, res) => {
    try {
        console.log("Query received:", req.query.query);

        const { query } = req.query;
        if (!query) {
            return res.status(400).send("Search query is required");
        }
        const users = await User.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                    { email: { [Op.iLike]: `%${query}%` } },
                ],
            },
        });
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};