const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const usersController = require('../controllers/usersController');
const tasksController = require('../controllers/tasksController');

const ensureToken = require('../middlewares/ensureTokenMiddleware');

const { createUser, login } = usersController;
const { createTask, processCreateTask, getTasks, deleteTasks, completeTask } = tasksController;


// User Routes
router.post('/usuario', createUser);
router.post('/login', login);

// Protected Route for test
router.get('/protected', ensureToken, (req, res) => {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                text: 'protected',
                data
            })
        }
    });
});



// Tasks Routes
router.get('/task', createTask);
router.post('/task', processCreateTask);

router.get('/tasks', getTasks);

router.delete('/task/:id', deleteTasks);
router.put('/task/:id', completeTask);


module.exports = router;