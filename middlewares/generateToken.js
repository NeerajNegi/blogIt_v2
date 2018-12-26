const jwt = require('jsonwebtoken')
const config = require('../config');

function generateToken(userEmail) {
    const payload = {
        userEmail
    };
    const token = jwt.sign(payload, config.secret, {
        expiresIn: '24h'
    });
    return token;
}

module.exports = generateToken