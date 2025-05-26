const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Board', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  }, {
    timestamps: true,
    underscored: true,
  });
};
