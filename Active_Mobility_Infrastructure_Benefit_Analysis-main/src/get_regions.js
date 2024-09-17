const express = require('express');
const fs = require('fs');
const router = express.Router();

// POST endpoint to get regions
router.post('/getregions', (req, res) => {
    fs.readFile('./static_data/slim_region.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).send("Error reading file");
        }
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseError) {
            console.error("Error parsing JSON:", parseError);
            res.status(500).send("Error parsing JSON");
        }
    });
});

module.exports = router;
