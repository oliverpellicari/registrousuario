const express = require('express');
const { body, validationResult } = require('express-validator');
const mysql = require('mysql');
const router = express.Router();

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'usuarios'
});

// Conexión a la base de datos
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado a la base de datos');
});

// Ruta para la página principal, puede redirigir a /register o mostrar un mensaje.
router.get('/', (req, res) => {
    res.redirect('/register');  // Redirigir al formulario de registro
});


// Ruta GET para mostrar el formulario de registro
router.get('/register', (req, res) => {
    res.render('register');
});

// Ruta POST para manejar el registro
router.post('/register', [
    // Validaciones
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('apellidos').notEmpty().withMessage('Los apellidos son obligatorios'),
    body('email').isEmail().withMessage('Introduce un correo válido'),
    body('telefono').isMobilePhone().withMessage('Introduce un teléfono válido'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, apellidos, email, ciudad, telefono } = req.body;

    // Consulta SQL para insertar datos
    const query = `INSERT INTO usuarios (nombre, apellidos, email, ciudad, telefono) 
                   VALUES (?, ?, ?, ?, ?)`;
    
    db.query(query, [nombre, apellidos, email, ciudad, telefono], (err, result) => {
        if (err) {
            throw err;
        }
        res.render('success');
    });
});

module.exports = router;
