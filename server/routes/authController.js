let express = require('express'),
    swagger = require('swagger-spec-express'),
    asyncHandler = require('./utils/asyncHandler'),
    router = express.Router();

swagger.swaggerize(router);

router.get('/', asyncHandler(async (req, res) => {
    await res.status(200).json({ resp: 'get1' });
}));

router.post('/', asyncHandler(async (req, res) => {
    res.status(200).json({ resp: 'test2' });
})).describe({
    summary: 'Some summary',
    responses: {
        200: {
            description: 'Gets the auth'
        }
    }
});

module.exports = router;