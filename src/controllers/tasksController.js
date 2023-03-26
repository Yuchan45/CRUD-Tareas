const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const date = moment();

const { validationResult } = require('express-validator');
const tasksOp = require('../modules/tasksOp');

const tasksController = {
    createTask: (req, res) => {
        return res.render('./tasks/createTaskForm.ejs');
    },
    processCreateTask: (req, res) => {
        const { title, description } = req.body;
        const id = uuidv4();

        const e = validationResult(req);
        if (!e.isEmpty()) {
            let errorMessages = '';
            const errors = e.mapped();
            const keys = Object.keys(errors);
            for(let i=0; i< keys.length; i++){
                let key = keys[i];
                errorMessages = errorMessages + '<br/>' + errors[key].msg;
            }

            return res.status(400).send(errorMessages);
        }

        const task = {
            id,
            title,
            description,
            completed: false,
            creationDate: date.format('MMMM Do YYYY, h:mm:ss a'),
            updatedDate:  date.format('MMMM Do YYYY, h:mm:ss a')
        };

        if (!tasksOp.addTask(task)) return res.status(500).send("Error al crear la tarea.");

        return res.status(201).send("ID: " + id);

    },
    getTasks: (req, res) =>  {
        const tasks = tasksOp.readTasks();
        if (!tasks) return res.status(500).send("Error al cargar la tareas.");

        return res.status(200).send(tasks);
    },
    deleteTasks: (req, res) => {
        const id = req.params.id;
        if (!tasksOp.removeTask(id)) return res.status(500).send("Error al eliminar tarea.");

        return res.status(200).send("tarea removida exitosamente.");
    },
    completeTask: (req, res) => {
        const id = req.params.id;

        if (!tasksOp.setTaskToCompleted(id)) return res.status(404).send("Task Not Found.");

        return res.status(200).send("Task set to completed successfully.");
    }
};

module.exports = tasksController;