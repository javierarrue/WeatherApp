//Esto es para tener variables de enviorement(Para mas seguridad)
require('dotenv').config();
 
const {response} = require('express');
const fetch = require('node-fetch');
const express = require('express');
const app = express();
const dataStore = require('nedb');
const database = new dataStore('database.db');
database.loadDatabase();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Escuchando en puerto ${PORT}...`)
});


// Mostrar de forma estática el index dentro de la carpeta public.
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

app.post('/api', (req, res) => {
    console.log('¡Nueva request!');
    const data = req.body;
    database.insert(data);
    console.log(data);
    res.json({
        status: 'Satisfactorio', 
        latitud: req.body.lat, 
        longitud: req.body.long, 
        timestamp: req.body.time,
        country:req.body.country,
        temp_c: req.body.temp_c,
        temp_f:req.body.temp_f});
});

app.get('/api', (req, res) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return
        }
        res.json(data);
    });
});

app.get('/weather/:latlong',async (req,res) =>{
    const coords = req.params.latlong.split(',');
    const API_KEY = process.env.API_KEY;
    console.log(coords);
    const lat = coords[0];
    const long = coords[1];
    const weather_api = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}=${lat},${long}`;
    const response = await fetch(weather_api);
    const weather = await response.json();
    res.json(weather);
});
