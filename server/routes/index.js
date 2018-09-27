let express = require('express'),
    router = express.Router(),
    swagger = require('swagger-spec-express'),
    jwtMiddleware = require('./utils/jwtMiddleware');

swagger.swaggerize(router);

router.use('/auth', require('./authController'));

router.all('*', jwtMiddleware.verifyJwt_mw);

module.exports = router;