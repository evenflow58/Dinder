let jwt = require('jsonwebtoken'),
    _ = require('lodash'),
    JWT_SECRET = 'aSecret',
    JWT_REFRESH_SECRET = 'bSecret';

function verifyJwtToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            if (err || !decodedToken) {
                return reject(err);
            }

            resolve(decodedToken);
        });
    });
}

function createJwtToken(details, isRefresh = false) {
    if (typeof details !== 'object') {
        details = {};
    }

    details.maxAge = 3600;

    if (isRefresh) {
        details.maxAge = 86400;
    }

    details.sessionData = _.reduce(details.sessionData || {}, (memo, val, key) => {
        if (typeof val !== 'function' && key !== 'password') {
            memo[key] = val;
        }

        return memo;
    }, {});

    let token = jwt.sign({
        data: details.sessionData
    }, isRefresh ? JWT_REFRESH_SECRET : JWT_SECRET, {
            expiresIn: details.maxAge,
            algorithm: 'HS256'
        });

    return token;
}

module.exports = {
    verifyJwtToken,
    createJwtToken
};