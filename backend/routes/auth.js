const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/auth/', (req, res) => {
  res.json({ message: 'Test' });
})



router.get('/validate/', (req, res) => {
        const token = req.header(tokenHeaderKey);

        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            return res.send("Successfully Verified");
        } else {
            // Access Denied
            return res.status(401).send(error);
        }}
)


module.exports = router;
