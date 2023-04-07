const swaggerJSDoc = require('shwagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Metadata info about our API
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'CRUD Tareas',
            version: '1.0.0'
        }
    },
    apis: ['src/routes/appRoutes.js']
}

// Docs en JSON Format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
const swaggerDocs = (app, port) => {
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup)
}