const tasksOp = require('../modules/tasksOp');

const tasksController = {
    createTask: (req, res) => {
        return res.render('./tasks/createTaskForm.ejs');
    },
    processCreateTask: (req, res) => {
        const { title, description } = req.body;
        
        const task = {
            title,
            description
        };

        tasksOp.addTask(task);

        res.send();
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