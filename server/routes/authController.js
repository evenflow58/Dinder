let express = require('express'),
    swagger = require('swagger-spec-express'),
    asyncHandler = require('./utils/asyncHandler'),
    auth = require('./utils/auth'),
    router = express.Router();

swagger.swaggerize(router);

router.post('/login', asyncHandler(async (req, res) => {
    try {
        switch (req.body.grant_type) {
            case 'google':
                res.status(200).json({
                    token: auth.createJwtToken({
                        sessionData: { id: '1' }
                    }, false),
                    refreshToken: auth.createJwtToken({
                        sessionData: { id: '1' }
                    }, true),
                    expiresIn: 3600
                });
                break;
            case 'refresh_token':
                let decodedToken = await auth.verifyJwtToken(token.replace(/Bearer /i, ''));

                res.status(200).json({
                    token: auth.createJwtToken({
                        sessionData: decodedToken.data,
                        maxAge: 3600
                    })
                });
                break;
            default:
                res.status(401)
                    .json({
                        message: 'incorrect grant_type'
                    });
                break;
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
    summary: 'Gets a token.',
    parameters: [
        {
            name: 'grant_type',
            description: 'The grant type to use. Either \'refresh_token\', \'google\' or \'facebook\'',
            required: true,
            type: 'string',
            in: 'formData'
        },
        {
            name: 'token',
            description: `If the grant type is 'refresh_token' then this is the refresh token. ` +
                `If the grant type is 'google' or 'facebook' then this is the id returned from that auth provider.`,
            required: true,
            type: 'string',
            in: 'formData'
        }
    ],
    responses: {
        200: {
            description: 'The auth response',
            schema: {
                type: 'object',
                properties: {
                    token: {
                        type: 'string'
                    },
                    refreshToken: {
                        type: 'string'
                    },
                    expiresIn: {
                        type: 'integer'
                    }
                }
            }
        }
    }
});

module.exports = router;