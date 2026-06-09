module.exports = (sequelize, DataType) => {
  const Contact = sequelize.define('Contact', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataType.STRING,
    },
    message: {
      type: DataType.TEXT,
      allowNull: false,
    }
  });

  return Contact;
};