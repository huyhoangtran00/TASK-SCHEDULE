const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Task', {
    name: {
      type: DataTypes.STRING,
      defaultValue: 'New Task',
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    icon: {
      type: DataTypes.STRING,
      defaultValue: '📝',
    },
    status: {
      type: DataTypes.ENUM('In Progress', 'Completed', "Won't Do"),
      defaultValue: 'In Progress',
    },
  }, {
    timestamps: true,
    underscored: true,
  });
};
