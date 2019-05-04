const express = require('express');
const app = express();

app.get('/user', (req,res) => {
    let response = {
        nombre : 'Laureano',
        apellido : 'Serrano',
        status : true
    }
    res.json(response);
});
app.post('/user', (req,res) => {
    let response = {
        nombre : 'Laureano',
        apellido : 'Serrano',
        status : true
    }
    res.json(response);
});
app.put('/user', (req,res) => {
    let response = {
        nombre : 'Laureano',
        apellido : 'Serrano',
        status : true
    }
    res.json(response);
});
app.delete('/user', (req,res) => {
    let response = {
        nombre : 'Laureano',
        apellido : 'Serrano',
        status : true
    }
    res.json(response);
});

module.exports = app;