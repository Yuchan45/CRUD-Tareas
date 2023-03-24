const path = require('path');


const usersController = {
    createUser: (req, res) => {
        res.send("Create User POST");
    },
    login: (req, res) =>  {
        res.send("Login POST");
    }

};

module.exports = usersController;