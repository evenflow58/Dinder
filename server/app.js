let express = require('express'),
    swaggerSpec = require('swagger-spec-express'),
    swaggerUi = require('swagger-ui-express'),
    packageJson = require('./package.json');

let app = express();

let swaggerSpecOptions = {
    title: packageJson.title,
    version: packageJson.version
};

let swaggerUiOptions = {
    swaggerUrl: 'http://localhost:3000/swagger.json',
    explorer: true
};

swaggerSpec.initialise(app, swaggerSpecOptions);

app.get('/swagger.json', (err, res) => {
    res.status(200).json(swaggerSpec.json());
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, swaggerUiOptions));
app.use('/api/v1', express.Router());

app.use(require('./controllers/index'));

swaggerSpec.compile();

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});