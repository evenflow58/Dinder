let swaggerSpec = require('swagger-spec-express');

swaggerSpec.common.addResponse({
    name: '401',
    description: 'Unauthorized',
    schema: {
        type: 'object',
        properties: {
            message: {
                type: 'string'
            }
        }
    }
});