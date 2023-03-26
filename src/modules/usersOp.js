const path = require('path');
const fs = require('fs');

const usersOp = {
    file: path.resolve(__dirname, '../data/users.json'),

    readUsers: function() {
        // Lee el archivo de usuarios y devuelve el array de objetos 'usuario' en este.
        if (!fs.existsSync(this.file)) this.writeUsers([]);

        let usersJSON = JSON.parse(fs.readFileSync(this.file));
        return usersJSON;
    },

    writeUsers: function(array) {
        // Recibe un array de usuarios. Escribe el array en el archivo.
        const dataJSON = JSON.stringify(array, null, "\t");
        fs.writeFileSync(this.file, dataJSON, 'utf-8', function(error) {
            if (error) throw error;
            return false;
        });
        return true;
    },

    addUser: function(user) {
        // Recibe un usuario y lo agrega al array de usuarios. Devuelve true en caso de exito y false en caso de error.
        if (!user) return false;
        
        const usersArray = this.readUsers(this.file);
        usersArray.push(user);
        if (!this.writeUsers(usersArray)) return false;

        return true;
    },

    findUserByUsername: function(username) {
        // Recibe un username. Busca en el archivo de usuarios si este existe. En caso de existir, devuelve el usuario.
        let usersJSON = this.readUsers();
        const user = usersJSON.find(user => user.username === username);
        if (!user) return false;

        return user;
    }
}

module.exports = usersOp;