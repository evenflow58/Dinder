let auth = require('./auth');

async function verifyJwt_mw(req, res, next) {
    let token = req.headers.authorization;

    try {
        let decodedToken = await auth.verifyJwtToken(token.replace(/Bearer /i, ''));
        req.user = decodedToken.data;
        next();
    } catch (error) {
        console.error(error);
        res.status(400)
            .json({ message: "Invalid auth token provided." })
    }
}

module.exports = {
    verifyJwt_mw
};