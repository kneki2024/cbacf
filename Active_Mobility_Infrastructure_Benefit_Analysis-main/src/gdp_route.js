const express = require('express');
const getGDPPerCapita = require('./get_gdp');
const router = express.Router();

// POST endpoint to get regions
router.post('/fetch-gdp', (req, res) => {
    const countryCode = req.body.countryCode; // Assuming the POST request will send countryCode in the body

    if (!countryCode) {
        res.status(400).send({ status: 1, msg: 'No country code provided' });
        return;
    }

    getGDPPerCapita(countryCode, (result) => {
        if (result.status === 0) {
            let gdp = result.msg.gdp;
            let svl = 70 * gdp;
            let accc = (70 * gdp + 17.5* gdp * 15) / 16
            let vt = Math.exp(-4.191) * Math.pow(gdp, 0.696)
            res.send({
                status: 0,
                msg: result.msg,
                cal_res: {
                    stat_value_life: svl,
                    ave_cost_crash: accc,
                    value_time: vt
                }
            });
        } else {
            res.status(500).send({
                status: result.status,
                msg: result.msg
            });
        }
    });
});

module.exports = router;
