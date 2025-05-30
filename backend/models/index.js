const { Sequelize } = require('sequelize');
const UserModel = require('./User');
const BoardModel = require('./Board');
const TaskModel = require('./Task');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'task_schedule',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || '12344321',
  {
    host: process.env.DB_HOST || 'db',  // Sử dụng tên service 'db' trong docker-compose
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    retry: {
      max: 5,
      timeout: 3000
    }
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

// Kiểm tra kết nối database
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    // Đồng bộ database
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {
  sequelize,
  User,
  Board,
  Task,
};

