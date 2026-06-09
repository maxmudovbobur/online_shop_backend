module.exports = (sequelize, DataType) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customerName: {
      type: DataType.STRING,
      allowNull: false,
    },
    customerPhone: {
      type: DataType.STRING,
      allowNull: false,
    },
    customerAddress: {
      type: DataType.STRING,
      allowNull: false,
    },
    items: {
      type: DataType.STRING,
      allowNull: false,
    },
    total: {
      type: DataType.STRING,
      allowNull: false,
    },
    paymentMethod: {
      type: DataType.STRING,
      allowNull: false,
    }
  });

  return Order;
};