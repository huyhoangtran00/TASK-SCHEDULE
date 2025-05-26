const { Sequelize } = require('sequelize');
const UserModel = require('./User');
const BoardModel = require('./Board');
const TaskModel = require('./Task');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  }
);

const User = UserModel(sequelize);
const Board = BoardModel(sequelize);
const Task = TaskModel(sequelize);

// Associations
User.hasMany(Board, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Board.belongsTo(User, { foreignKey: 'user_id' });

Board.hasMany(Task, { foreignKey: 'board_id', onDelete: 'CASCADE' });
Task.belongsTo(Board, { foreignKey: 'board_id' });

module.exports = {
  sequelize,
  User,
  Board,
  Task,
};

