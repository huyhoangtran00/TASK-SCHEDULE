const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [3, 50], // độ dài username từ 3 đến 50 ký tự
      },
    },
    password_hash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    timestamps: true,
    underscored: true,
  });
};
