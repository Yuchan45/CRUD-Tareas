const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const app = express();

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
    // aca van las rutas/endpoints. Se ponen los routes, y pueden ser varios. Por eso es un array. Aunque en este caso use el '*'.
    apis: [`${path.join(__dirname, "./src/routes/*")}`]
}

// Set up Swagger Middleware. Sets the route/endpoint where i want the documentation.
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

// Requires
const appRoutes = require('./src/routes/appRoutes');

// Configs
const publicPath = path.resolve(__dirname + '/public');
app.use(express.static(publicPath));
app.set('port', process.env.PORT || 3001);

app.use(express.urlencoded({extended: false}));  // Middleware que permite recibir datos de los formularios.
app.use(express.json());  // inbuilt METHOD in express to recognize the incoming Request Object as a JSON Object.

// Method Override
// override with the X-HTTP-Method-Override header in the request. We can now use the 'put' & 'delete' method in html forms.
app.use(methodOverride('_method'));

// Set template engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './src/views'));


// Addressing
app.use('/', appRoutes);

// 404
app.use((req, res, next) => {
    res.status(404).send("Not Found");
})

// Listen
app.listen(app.get('port'), () => {
    console.log(`Server successfully running on port ${app.get('port')}`);
});