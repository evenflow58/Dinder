let express = require('express'),
    swagger = require('swagger-spec-express'),
    asyncHandler = require('./utils/asyncHandler'),
    auth = require('./utils/auth'),
    router = express.Router();

swagger.swaggerize(router);

router.post('/login', asyncHandler(async (req, res) => {
    try {
        switch (req.body.grant_type) {
            case 'password':
                res.status(200).json({
                    token: auth.createJwtToken({
                        sessionData: { id: '1' }
                    }, false),
                    refreshToken: auth.createJwtToken({
                        sessionData: { id: '1' }
                    }, true)
                });
            case 'refresh_token':
                let decodedToken = await auth.verifyJwtToken(token.replace(/Bearer /i, ''));

                res.status(200).json({
                    token: auth.createJwtToken({
                        sessionData: decodedToken.data,
                        maxAge: 3600
                    })
                });
            default:
                res.status(401)
                    .json({
                        message: 'incorrect grant_type'
                    });
        }
    }
    catch (err) {
        console.error(err);
        res.status(401)
            .json({
                message: 'login failed'
            });
    }
})).describe({
    summary: 'Some summary',
    responses: {
        200: {
            description: 'Gets the auth'
        }
    }
});

module.exports = router;