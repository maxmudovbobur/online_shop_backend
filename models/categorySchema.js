module.exports = (sequelize, DataType) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    },
    icon: {
      type: DataType.STRING,
    },
    count: {
      type: DataType.INTEGER, 
    },
    description: {
      type: DataType.STRING,
    }
  });

  return Category;
};