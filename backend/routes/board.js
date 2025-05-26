const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const {Board} = require('../models/index.js');



router.get('/', async (req, res) => {
 try {
    const boards =  await Board.findAll();
    console.log('Boards fetched:', boards);
    res.status(200).json(boards);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.post('/', (req, res) => {
 try {
    const {name , description} =  req.body;

    if (!name || !description) {
      return res.status(400).json({ error: 'Missing board name' });
    }
    Board.create({ name: name, description: description });
    console.log('Board created:', name);
    res.status(200).json(name);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
})



router.put('/:board-id', (req, res) => {
  res.json({ message: 'Test' });
})


router.delete('/:board-id', (req, res) => {
  res.json({ message: 'Test' });
})







module.exports = router;
