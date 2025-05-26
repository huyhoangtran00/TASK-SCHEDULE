const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const {Task} = require('../models/index.js');



router.get('/', async (req, res) => {
 try {
    const boards =  await Task.findAll();
    console.log('Task fetched:', boards);
    res.status(200).json(boards);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, description, icon, status } = req.body;
    const newTask = await Task.create({ name, description, icon,status });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: 'Bad request', details: err.message });
  }
})


// PUT /api/tasks/:id
router.put('/:id', async (req, res) => {
  try {
    const { name, description, icon, status } = req.body;

    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.update({ name, description, icon, status });

    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;
