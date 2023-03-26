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
            const errors = e.mapped();
            return res.status(400).json({message: "Error al crear tarea!", errors});
        }

        const task = {
            id,
            title,
            description,
            completed: false,
            creationDate: date.format('MMMM Do YYYY, h:mm:ss a'),
            updatedDate:  date.format('MMMM Do YYYY, h:mm:ss a')
        };

        if (!tasksOp.addTask(task)) return res.status(500).json({message: "Error al crear la tarea."});

        return res.status(201).json({message: "Tarea creada exitosamente!", id: id});

    },
    getTasks: (req, res) =>  {
        const tasks = tasksOp.readTasks();
        if (!tasks) return res.status(500).json({message: "Error al cargar la tareas."});

        return res.status(200).send(tasks);
    },
    deleteTasks: (req, res) => {
        const id = req.params.id;
        if (!tasksOp.removeTask(id)) return res.status(500).json({message: "Error al eliminar tarea."});

        return res.status(200).json({message: "Tarea removida exitosamente."});
    },
    completeTask: (req, res) => {
        const id = req.params.id;

        if (!tasksOp.setTaskToCompleted(id)) return res.status(404).json({message: "Task Not Found."});

        return res.status(200).json({message: "La tarea ha sido marcada como 'completada' de forma exitosa!"});
    }
};

module.exports = tasksController;