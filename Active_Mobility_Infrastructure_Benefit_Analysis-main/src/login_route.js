const express = require('express');
const router = express.Router();
const login = require('./login');
const crypto = require('crypto');

// Function to generate SHA-256 hash
function generateSHA256(input) {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
}

router.post('/login', (req, res) => {
    login(req.body.username, (err, data) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send({ status: 1, msg: 'Failed to fetch data' });
        } else {
            pass_sha = generateSHA256(req.body.password);
            // console.log(pass_sha);
            // console.log(data);
            if (data.length){
                if (pass_sha == data[0].PASSWORD){
                    res.send({ status: 0, msg: 'Login success' });
                }else{
                    res.send({ status: 2, msg: 'Password error' });
                }
            }else{
                res.send({ status: 3, msg: 'Invalid user' });
            }
            
            
        }
    });
});

module.exports = router;