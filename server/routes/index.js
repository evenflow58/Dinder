let express = require('express'),
    router = express.Router(),
    swagger = require('swagger-spec-express');

swagger.swaggerize(router);

router.use('/auth', require('./authController'));

module.exports = router;