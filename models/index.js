const Sequelize = require("sequelize")
const sequelize = require("../config/database")

const User = require("./userSchema")(sequelize, Sequelize)
const Product = require("./productSchema")(sequelize, Sequelize)
const Order = require("./orderSchema")(sequelize, Sequelize)
const Contact = require("./contactSchema")(sequelize, Sequelize)
const Category = require("./categorySchema")(sequelize, Sequelize)
const Services = require("./servicesSchema")(sequelize, Sequelize)



module.exports = { User, Product, Order, Contact, Category, Services, sequelize }