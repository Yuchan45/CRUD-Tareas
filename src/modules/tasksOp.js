const path = require('path');
const fs = require('fs');

const tasksOp = {
    file: path.resolve(__dirname, '../data/tasks.json'),

    readTasks: function() {
        // Lee el archivo de tareas y devuelve el array de objetos 'tarea' en este.
        if (!fs.existsSync(this.file)) this.writeTasks([]);

        let tasksJSON = JSON.parse(fs.readFileSync(this.file));
        return tasksJSON;
    },

    writeTasks: function(array) {
        // Recibe un array de tareas. Escribe el array en el archivo.
        const dataJSON = JSON.stringify(array, null, "\t");
        fs.writeFileSync(this.file, dataJSON, 'utf-8', function(error) {
            if (error) throw error;
            return false;
        });
        return true;
    },

    addTask: function(task) {
        // Recibe una tarea y lo agrega al array de tareas. Devuelve 0 en caso de exito y -1 en caso de error.
        if (!task) return false;
        
        const tasksArray = this.readTasks(this.file);
        tasksArray.push(task);
        if (!this.writeTasks(tasksArray)) return false;

        return true;
    },

    removeTask: function(id) {
        // Recibe id. Elimina la tarea del archivo cuyo id coincide con el pasado por parametro.
        if (!id) return false;
        let tasksJSON = JSON.parse(fs.readFileSync(this.file));
        const tasks = tasksJSON.filter(task => task.id !== id);

        if (!this.writeTasks(tasks)) return false;
        return true;
    },

    getTaskById: function(id) {
        // Recibe un id. Busca la tarea cuyo id coinicide.

        let tasksJSON = JSON.parse(fs.readFileSync(this.file));
        const task = tasksJSON.find(task => task.id === id);

        return task;
    },

    setTaskToCompleted: function(id) {
        // Recibe un id. Busca la tarea cuyo id coinicide y establece su atributo 'completed' a true.
        let tasksJSON = JSON.parse(fs.readFileSync(this.file));
        const task = tasksJSON.find(task => task.id === id);

    }


};

module.exports = tasksOp;