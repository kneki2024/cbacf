const express = require('express');
const router = express.Router();
const { getDescription } = require('./fetch_description');

// POST route to fetch data
router.post('/fetch-description', (req, res) => {
    getDescription((err, data) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send({ status: 1, msg: 'Failed to fetch data' });
        } else {
            res.send({ status: 0, msg: data });
        }
    });
});

module.exports = router;