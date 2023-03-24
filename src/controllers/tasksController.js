const path = require('path');

const tasksController = {
    createTask: (req, res) => {
        res.send("Create Task POST");
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