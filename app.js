const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const app = express();


// Requires
const appRoutes = require('./src/routes/appRoutes');
const { swaggerDocs: V1SwaggerDocs } = require("./src/v1/swagger");

// Configs
const publicPath = path.resolve(__dirname + '/public');
app.use(express.static(publicPath));
app.set('port', process.env.PORT || 3001);
V1SwaggerDocs(app, app.get('port')); // Swagger


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
    console.log(`🚀 Server successfully running on port ${app.get('port')}`);
});