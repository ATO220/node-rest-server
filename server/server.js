require('./config/config');
const express = require('express');
const app = express();
const routes = require('./routes/user');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

const port = process.env.PORT || 3007;

app.use(routes);

app.listen(port, () => {
    console.log(`Escuchando el puerto ${ port }`);
})