const path = require('path');
const fs = require('fs');

const tasksOp = {
    file: path.resolve(__dirname, '../data/tasks.json'),

    readTasks: function() {
        // Lee el archivo de tareas y devuelve el array de objetos 'tarea' en este.
        if (!fs.existsSync(this.file)) this.writeTasks([], this.file);

        let tasksJSON = JSON.parse(fs.readFileSync(this.file));
        return tasksJSON;
    },

    writeTasks: function(array, file) {
        // Recibe un array de tareas y la ubicacion del archivo a escribir. Escribe el array en el archivo.
        const dataJSON = JSON.stringify(array, null, "\t");
        fs.writeFileSync(file, dataJSON, 'utf-8', function(error) {
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
        if (!this.writeTasks(tasksArray, this.file)) return false;

        return true;
    },

    getTaskById: function(id) {
        // Recibe un id. Busca la tarea cuyo id coinicide.

        let tasksJSON = JSON.parse(fs.readFileSync(this.file));
        const task = tasksJSON.find(task => task.id === id);
        
        return task;
    }


};

module.exports = tasksOp;