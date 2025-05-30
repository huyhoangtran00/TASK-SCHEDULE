const { Sequelize } = require('sequelize');
const UserModel = require('./User');
const BoardModel = require('./Board');
const TaskModel = require('./Task');
require('dotenv').config();

const sequelize = new Sequelize(
  'task_schedule',
  'postgres',
  '12344321',
  {
    host: 'localhost',     // ✅ CHỈ ĐÚNG khi chạy ngoài Docker
    port: 5432,           // ✅ Cổng ngoài Docker đã publish trong docker-compose
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

// // Đồng bộ database
// sequelize.sync({ alter: true })  // Hoặc { force: true } nếu bạn muốn drop all tables và tạo lại từ đầu
//   .then(() => {
//     console.log('Database synced successfully');
//     process.exit(0);  // Thoát process sau khi đồng bộ xong
//   })
//   .catch((err) => {
//     console.error('Failed to sync database:', err);
//     process.exit(1);  // Thoát với mã lỗi nếu thất bại
//   });

module.exports = {
  sequelize,
  User,
  Board,
  Task,
};

