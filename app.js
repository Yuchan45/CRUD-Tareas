const express = require('express');
const path = require('path');

const app = express();

// Configs
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));
app.set('port', process.env.PORT || 3001);
app.set('views', path.resolve(__dirname, './views'));
app.use(express.json());  // is a inbuilt METHOD in express to recognize the incoming Request Object as a JSON Object.

// Requires
const addressRoutes = require('./src/routes/addressRoutes');

// ADDRESSING
app.use('/', addressRoutes);


// 404
app.use((req, res, next) => {
    res.status(404).send("Not Found");
})

// Listen
app.listen(app.get('port'), () => {
    console.log(`Server successfully running on port ${app.get('port')}`);
});