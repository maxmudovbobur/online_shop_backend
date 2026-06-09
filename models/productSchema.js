module.exports = (sequelize, DataType) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
    },
    price: {
      type: DataType.FLOAT,
      allowNull: false,
    },
    image: {
      type: DataType.STRING,
      allowNull: false,
    },
    category: {
      type: DataType.STRING,
      allowNull: false,
    },
    unit: {
      type: DataType.STRING,
      allowNull: false,
    }
  });

  return Product;
};