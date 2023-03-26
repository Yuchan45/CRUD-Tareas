const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Controllers
const usersController = require('../controllers/usersController');
const tasksController = require('../controllers/tasksController');
const { register, processRegister, login, processLogin } = usersController;
const { createTask, processCreateTask, getTasks, deleteTasks, completeTask } = tasksController;

// Middlewares
const validateToken = require('../middlewares/validateTokenMiddleware');
const validateTask = require('../middlewares/validateTaskMiddleware');
const validateUser = require('../middlewares/validateUserMiddleware');


// User Routes
router.get('/usuario', register);
router.post('/usuario', validateUser, processRegister);

router.get('/login', login);
router.post('/login', processLogin);

// Protected Route for test
router.get('/protected', validateToken, getTasks); // Muestra las tareas (solo en caso de tener acceso).

// Tasks Routes
router.get('/task', createTask);
router.post('/task', validateTask, processCreateTask);

router.get('/tasks', getTasks);

router.delete('/task/:id', deleteTasks);
router.put('/task/:id', completeTask);


module.exports = router;