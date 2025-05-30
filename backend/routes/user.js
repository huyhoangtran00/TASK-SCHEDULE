const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, Board } = require('../models/index'); // Đảm bảo import đúng model
const dotenv = require('dotenv');

dotenv.config({path: "../.env"}); // Load environment variables from .env file


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User authentication
 */


/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    console.log('Creating user:', username);
    console.log('Password length:', password.length);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password_hash: hashedPassword
    });

    const token = jwt.sign({ id: newUser.id, username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
        // Tạo board mặc định
    const board = await Board.create({
      name: `My New Board for ${newUser.username}`,
      description: 'This is a default board created upon user signup.',
      user_id: newUser.id,
      // các field khác tùy vào schema của bạn
    });

    console.log('User created:', newUser.username);
    res.status(201).json({ token, message: 'User created successfully', boardId: board.id });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ message: 'Wrong password' });

    const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    console.log('User logged in:', user.username);
    res.status(200).json({ token, message: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
