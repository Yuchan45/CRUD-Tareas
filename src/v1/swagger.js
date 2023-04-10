// Swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'CRUD Tareas API',
            version: '1.0.0'
        },
        servers: [
            {
                "url": "http://localhost:3001",
                "description": "Development server"
            }
        ]
    },
    // aca van las rutas/endpoints a documentar. Se ponen los routes, y pueden ser varios. Por eso es un array. Aunque en este caso use el '*'.
    apis: ["./src/routes/*"]
}

const swaggerDocs = (app, port) => {
    // Set up Swagger Middleware. Sets the route/endpoint where i want the documentation.
    app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));
    app.get("/api-doc", (req, res) => {
        res.setHeader("Content-type", "application/json");
        res.send(swaggerSpec);
    });
    console.log(
        `📖 Version 1 Docs are available at http://localhost:${port}/api-doc`
    );
}

module.exports = { swaggerDocs }
