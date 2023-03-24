const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const tasksController = require('../controllers/tasksController');

const { createUser, login } = usersController;
const { createTask, getTasks, deleteTaks, completeTask } = tasksController;


// User Routes
router.post('/usuario', createUser);
router.post('/login', login);

// Tasks Routes
router.post('/task', createTask);
router.get('/tasks', getTasks);
router.delete('/task/:id', deleteTaks);
router.put('/task/:id', completeTask);


module.exports = router;