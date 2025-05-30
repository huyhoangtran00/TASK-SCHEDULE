const express = require('express');
const router = express.Router();
const { Board, Task } = require('../models/index.js');
const authenticateJWT = require('../middleware/auth'); // Import middleware xác thực JWT
const { json } = require('sequelize/lib/sequelize');
router.use(authenticateJWT);
/**
 * @swagger
 * tags:
 *   name: Boards
 *   description: Board management
 */

/**
 * @swagger
 * /api/boards:
 *   post:
 *     summary: Create a new board
 *     tags: [Boards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Board created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 user_id:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 */
router.post('/', async (req, res) => {
  try {
    const board = await Board.create({
      ...req.body,
      user_id: req.user.id, // Lấy user_id từ token
    });
    res.json(board);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/boards:
 *   get:
 *     summary: Get all boards
 *     tags: [Boards]
 *     responses:
 *       200:
 *         description: List of boards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Board'
 */
router.get('/', async (req, res) => {
  try {
    
    const boards = await Board.findAll({
      where: { user_id: req.user.id },
    });
    console.log(json(boards[0].name))
    res.json(boards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/boards/{id}:
 *   get:
 *     summary: Get a board by ID
 *     tags: [Boards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Board found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *       404:
 *         description: Board not found
 */
router.get('/:id', async (req, res) => {
  const board = await Board.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!board) return res.status(404).json({ error: 'Board not found or unauthorized' });
  res.json(board);
});


/**
 * @swagger
 * /api/boards/{id}:
 *   put:
 *     summary: Update a board
 *     tags: [Boards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BoardInput'
 *     responses:
 *       200:
 *         description: Updated board
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *       404:
 *         description: Board not found
 */
router.put('/:id', async (req, res) => {
  const board = await Board.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!board) return res.status(404).json({ error: 'Board not found or unauthorized' });
  await board.update(req.body);
  res.json(board);
});
/**
 * @swagger
 * /api/boards/{id}:
 *   delete:
 *     summary: Delete a board
 *     tags: [Boards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Board deleted
 *       404:
 *         description: Board not found
 */
router.delete('/:id', async (req, res) => {
  const board = await Board.findOne({
    where: {
      id: req.params.id,
      user_id: req.user.id,
    },
  });
  if (!board) return res.status(404).json({ error: 'Board not found or unauthorized' });
  await board.destroy();
  res.json({ message: 'Board deleted' });
});


/**
 * @swagger
 * /api/boards/{id}/tasks:
 *   get:
 *     summary: Get all tasks for a board
 *     tags: [Boards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of tasks for the board
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       404:
 *         description: Board not found
 */
router.get('/:id/tasks', async (req, res) => {
  const board = await Board.findOne({
    where: {
      id: req.params.id,
      user_id: req.user.id, // Lấy user_id từ token

    },
  });

  if (!board) return res.status(404).json({ error: 'Board not found or unauthorized' });
  console.log(req.user.id)
  const tasks = await Task.findAll({
    where: {
      board_id: req.params.id,

    },
  });

  res.json(tasks);
});

module.exports = router;
