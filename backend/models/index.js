const { Sequelize } = require('sequelize');
const UserModel = require('./User');
const BoardModel = require('./Board');
const TaskModel = require('./Task');
require('dotenv').config({ path: '../.env' });

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

// Một user có nhiều board
User.hasMany(Board, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Board.belongsTo(User, { foreignKey: 'user_id' });

// Một board có nhiều task
Board.hasMany(Task, { foreignKey: 'board_id', onDelete: 'CASCADE' });
Task.belongsTo(Board, { foreignKey: 'board_id' });

sequelize.sync({ alter: true })  // Hoặc { force: true } nếu bạn muốn drop all tables và tạo lại từ đầu
  .then(() => {
    console.log(' Database synced successfully');
  })
  .catch((err) => {
    console.error('Failed to sync database:', err);
  });

module.exports = {
  sequelize,
  User,
  Board,
  Task,
};

