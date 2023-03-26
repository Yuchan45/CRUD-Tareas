// Express-validator
const { body } = require('express-validator');

// Validaciones
const validateTask = [
    body('title')
        .notEmpty().withMessage('El título de la tarea no puede estar vacío!').bail(),

    body('description')
        .notEmpty().withMessage('La descripción de la tarea no puede estar vacío!').bail(),

];

module.exports = validateTask;