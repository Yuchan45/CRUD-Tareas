const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const app = express();


// Requires
const appRoutes = require('./src/routes/appRoutes');

// Configs
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));
app.set('port', process.env.PORT || 3001);

// Needed for POST and PUT requests because data is sent to the server and you want it to save/store/accept the data.
app.use(express.urlencoded({extended: false}));  // Middleware que permite recibir datos de los formularios. (req.body)
app.use(express.json());  // is a inbuilt METHOD in express to recognize the incoming Request Object as a JSON Object.

// Method Override
app.use(methodOverride('_method'));  // override with the X-HTTP-Method-Override header in the request. We can now use the 'put' & 'delete' method in html forms.

// Set template engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './src/views'));



// ADDRESSING
app.use('/', appRoutes);



// 404
app.use((req, res, next) => {
    res.status(404).send("Not Found");
})

// Listen
app.listen(app.get('port'), () => {
    console.log(`Server successfully running on port ${app.get('port')}`);
});