const { Sequelize } = require("sequelize");

require("dotenv").config();

// Neon.tech onlayn bazasiga xavfsiz (SSL) ulanish sozlamasi
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Neon bazasi rad etmasligi uchun mana shu buyruq shart!
        }
    }
});

module.exports = sequelize;