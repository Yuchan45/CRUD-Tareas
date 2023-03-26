// Express-validator
const { body } = require('express-validator');

// Validaciones
const validateUser = [
    body('username')
        .notEmpty().withMessage('El nombre de usuario no puede estar vacío!').bail(),

    body('password')
        .notEmpty().withMessage('El campo de contraseña no puede estar vacío!').bail(),

];

module.exports = validateUser;