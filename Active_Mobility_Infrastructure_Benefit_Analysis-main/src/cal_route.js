// dataRoutes.js
const express = require('express');
const router = express.Router();
const calculation_core = require('./cal_core')

// POST route to fetch data
router.post('/submit-data', (req, res) => {
    console.log(req.body);  // Output the received data to the console
    result = calculation_core(req.body);
    res.status(200).send(result);
});

module.exports = router;