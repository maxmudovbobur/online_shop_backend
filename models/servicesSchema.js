module.exports = (sequelize, DataType) => {
  const Services = sequelize.define('Services', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    icon: {
      type: DataType.STRING,
      allowNull: false,
    },
    title: {
      type: DataType.STRING,
      allowNull: false,
    },
    description: {
      type: DataType.STRING,
      allowNull: true,
    },
    features: {
      type: DataType.STRING,
      allowNull: true,
    }
  });

  return Services;
};