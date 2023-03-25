const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const tasksController = require('../controllers/tasksController');

const { createUser, login } = usersController;
const { createTask, processCreateTask, getTasks, deleteTaks, completeTask } = tasksController;


// User Routes
router.post('/usuario', createUser);
router.post('/login', login);

// Tasks Routes
router.get('/task', createTask);
router.post('/task', processCreateTask);

router.get('/tasks', getTasks);
router.delete('/task/:id', deleteTaks);
router.put('/task/:id', completeTask);


module.exports = router;