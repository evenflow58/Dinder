let express = require('express'),
    swagger = require('swagger-spec-express'),
    router = express.Router();

swagger.swaggerize(router);

router.post('/', (req, res) => {
    res.status(200).json({ resp: 'test2' });
}).describe({
    summary: 'Some summary',
    responses: {
        200: {
            description: 'Gets the auth'
        }
    }
});

module.exports = router;