let express = require('express'),
    swaggerSpec = require('swagger-spec-express'),
    swaggerUi = require('swagger-ui-express'),
    packageJson = require('./package.json'),
    bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let swaggerSpecOptions = {
    title: packageJson.title,
    version: packageJson.version,
    securityDefinitions: {
        jwt: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization'
        }
    }
};

let swaggerUiOptions = {
    swaggerUrl: 'http://localhost:3000/swagger.json',
    authAction: {
        JWT: {
            name: "JWT",
            schema: {
                type: "apiKey",
                in: "header",
                name: "Authorization",
                description: ""
            },
            value: "Bearer <JWT>"
        }
    }
};

swaggerSpec.initialise(app, swaggerSpecOptions);

app.get('/swagger.json', (err, res) => {
    res.status(200).json(swaggerSpec.json());
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, swaggerUiOptions));
app.use('/api/v1', express.Router());

app.use(require('./routes/index'));

swaggerSpec.compile();

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});