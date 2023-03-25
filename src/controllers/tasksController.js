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
            creationDate: date.format('MMMM Do YYYY, h:mm:ss a')
        };

        if (!tasksOp.addTask(task)) res.status(500);

        res.status(201).send(id);

    },
    getTasks: (req, res) =>  {
        res.send("Get tasks GET");
    },
    deleteTaks: (req, res) => {
        res.send("Delete task DELETE");
    },
    completeTask: (req, res) => {
        res.send("Compelete task PUT");
    }
};

module.exports = tasksController;