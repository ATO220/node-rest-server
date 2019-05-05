require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('../routes/user');
const mongoose = require('mongoose');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

app.use(routes);

const port = process.env.PORT || 3007;

app.use(routes);

//Coneect DB with Mongoose
mongoose.connect(process.env.URL_DB, {useNewUrlParser: true, useCreateIndex: true}, (err, res) => {
    
    if ( err ) throw err;

    console.log('Base de Datos ONLINE');
});


app.listen(port, () => {
    console.log(`Escuchando el puerto ${ port }`);
})