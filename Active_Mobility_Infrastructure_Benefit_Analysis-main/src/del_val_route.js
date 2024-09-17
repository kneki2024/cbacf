const express = require('express');
const router = express.Router();
const delVal = require('./del_val');

// POST route to fetch data
router.post('/del-val', (req, res) => {
    delVal(req.body.value_id, (err, data) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send({ status: 1, msg: 'Failed to fetch data' });
        } else {
            res.send({ status: 0, msg: data });
        }
    });
});

module.exports = router;