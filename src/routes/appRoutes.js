const express = require('express');
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

/**
 * @swagger
 * components:
 *  schemas:
 *      UserMock:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: The username
 *              age: 
 *                  type: integer
 *                  description: Users age
 *              email:
 *                  type: string
 *                  description: Users email
 *          required:
 *              - name
 *              - email
 *          example:
 *              name: Tomas Yu
 *              age: 23
 *              email: yu.nakasone@gmail.com
 * 
 *      User:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *                  description: Username
 *              password: 
 *                  type: string
 *                  description: Password
 *          required:
 *              - username
 *              - password
 *          example:
 *              username: Tomas Yu Nakasone
 *              password: Hola123!
 * 
 *      Task:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: Task id
 *              title: 
 *                  type: string
 *                  description: Task title
 *              description: 
 *                  type: string
 *                  description: Task description
 *              completed:
 *                  type: boolean
 *                  description: Task status
 *              creationDate: 
 *                  type: string
 *                  description: Task creation date
 *              updatedDate: 
 *                  type: string
 *                  description: Task last updated date
 *          example:
 *              id: 01cdc3c1-ae78-4b0e-8907-7fcd2b41b46e
 *              title: Tarea 1!
 *              description: Soy la tarea n1
 *              completed: false
 *              creationDate: March 26th 2023, 7:59:01 pm
 *              updatedDate: March 26th 2023, 8:00:44 pm
 */


// User Routes
/**
 * @swagger
 * /usuario:
 *  get:
 *      summary: Returns a user register form.
 *      tags: [User]
 *      responses:
 *          200:
 *              description: Successfull get request!
 *              content: 
 *                  'text/html':
 *                  schema:
 */
router.get('/usuario', register);
/**
 * @swagger
 * /usuario:
 *  post:
 *      summary: Creates a new user.
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema: 
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: New user created!
 *          400:
 *              description: Incorrect credentials!
 *      
 * 
 */
router.post('/usuario', validateUser, processRegister);

router.get('/login', login);


router.post('/login', processLogin);

// Protected Route for test
router.get('/protected', validateToken, getTasks); // Muestra las tareas (solo en caso de tener acceso).

// Tasks Routes
router.get('/task', createTask); // Formulario de 'crear tarea'.
router.post('/task', validateTask, processCreateTask);

/**
 * @swagger
 * /tasks:
 *  get:
 *      summary: Returns all tasks.
 *      tags: [Tasks]
 *      responses:
 *          200:
 *              description: All tasks returned successfully!
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/Task'
 */
router.get('/tasks', getTasks);

router.delete('/task/:id', deleteTasks);

/**
 * @swagger
 * /task/{id}:
 *  put:
 *      summary: Sets task to 'completed'
 *      tags: [Tasks]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The user id
 *      responses:
 *          201:
 *              description: La tarea ha sido marcada como 'completada' de forma exitosa!
 *          404:
 *              description: Task Not Found
 */
router.put('/task/:id', completeTask);


module.exports = router;