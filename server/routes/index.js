let express = require('express'),
    router = express.Router(),
    swagger = require('swagger-spec-express'),
    jwtMiddleware = require('./utils/jwtMiddleware');

require('./responses/unauthorizedResponse');

swagger.swaggerize(router);

router.use('/auth', require('./authController'));

router.all('*', jwtMiddleware.verifyJwt_mw);

router.use('/test', require('./testController'));

module.exports = router;