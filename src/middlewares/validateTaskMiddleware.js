// Express-validator
const { body } = require('express-validator');

// Validaciones
const validateTasks = [
    body('title')
        .notEmpty().withMessage('El titulo de la tarea no puede estar vacio!'),

    body('description')
        .notEmpty().withMessage('La descripcion de la tarea no puede estar vacio!'),

];

module.exports = validateTasks;