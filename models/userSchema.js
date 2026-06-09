const bcrypt = require('bcrypt');

module.exports = (sequelize, DataType) => {
  const User = sequelize.define('User', {
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
      unique: true,
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
    },
    phone: {
      type: DataType.STRING,
    },
    is_Admin: {
      type: DataType.BOOLEAN
    }
  });

  User.beforeSave(async user => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  return User;
};