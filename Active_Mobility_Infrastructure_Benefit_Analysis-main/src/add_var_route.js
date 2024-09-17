const express = require('express');
const router = express.Router();
const addVal = require('./add_val');

// POST route to fetch data
router.post('/add-val', (req, res) => {
    let var_id = req.body.var_id;
    let var_value = req.body.var_value;
    let display_style = req.body.display_style;
    let comment = req.body.comment;
    addVal(var_id, var_value, display_style, comment, (err, data) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send({ status: 1, msg: 'Failed to fetch data' });
        } else {
            res.send({ status: 0, msg: data });
        }
    });
});

module.exports = router;