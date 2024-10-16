const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const userRoutes = require('./routes/user');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Rutas
app.use('/', userRoutes);

// Servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
