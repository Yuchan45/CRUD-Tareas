const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const date = moment();

const tasksOp = require('../modules/tasksOp');

const tasksController = {
    createTask: (req, res) => {
        return res.render('./tasks/createTaskForm.ejs');
    },
    processCreateTask: (req, res) => {
        const { title, description } = req.body;
        const id = uuidv4();

        const task = {
            id,
            title,
            description,
            completed: false,
            creationDate: date.format('MMMM Do YYYY, h:mm:ss a')
        };

        if (!tasksOp.addTask(task)) res.status(500).send("Error al crear la tarea.");

        res.status(201).send("ID: " + id);

    },
    getTasks: (req, res) =>  {
        const tasks = tasksOp.readTasks();
        if (!tasks) return res.status(500).send("Error al cargar la tareas");

        res.status(200).send(tasks);
    },
    deleteTasks: (req, res) => {
        res.send("Delete task DELETE");
    },
    completeTask: (req, res) => {
        const id = req.params.id;
        
        const task = tasksOp.getTaskById(id);
        if (!task) res.status(404).send("No se ha hallado la tarea coincidente con dicho id.");
        task.completed = true;

        res.status(200).send(task);
    }
};

module.exports = tasksController;