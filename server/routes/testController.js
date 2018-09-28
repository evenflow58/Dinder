let express = require('express'),
    swagger = require('swagger-spec-express'),
    asyncHandler = require('./utils/asyncHandler'),

    router = express.Router();

swagger.swaggerize(router);

router.get('/', asyncHandler(async (req, res) => {
    res.status(200).json();
})).describe({
    responses: {
        200: {
            description: "Returns the swagger.json document"
        }
    },
    common: {
        responses: ['401']
    }
});


module.exports = router;