let auth = require('./auth');

async function verifyJwt_mw(req, res, next) {
    let token = req.headers.authorization;

    try {
        if (!token) {
            throw new Error('no token in request.');
        }

        let decodedToken = await auth.verifyJwtToken(token.replace(/Bearer /i, ''));
        req.user = decodedToken.data;
        next();
    } catch (error) {
        console.error(error);
        res.status(401)
            .json({ message: "Invalid auth token provided." })
    }
}

module.exports = {
    verifyJwt_mw
};