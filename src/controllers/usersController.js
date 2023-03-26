const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const date = moment();

const usersOp = require('../modules/usersOp');

const usersController = {
    createUser: (req, res) => {
        const { username, password } = req.body;

        const userFound = usersOp.findUserByUsername(username);
        if (userFound) return res.status(500).send("Username already taken.");

        const user = {
            id: uuidv4(),
            username,
            password: bcrypt.hashSync(password, 10),
            creationDate: date.format('MMMM Do YYYY, h:mm:ss a')
        }
        if (!usersOp.addUser(user)) return res.status(500).send("Error al crear el usuario.");

        jwt.sign({user}, 'my_secret_key', (err, token) => {
            return res.json({
                token
            });
        });

        // return res.status(201).send("Usuario creado exitosamente!");
    },

    login: (req, res) =>  {
        const { username, password } = req.body;
        const user = usersOp.findUserByUsername(username);
        if (!user) return res.status(404).send("User Not Found");

        const isPwdCorrect = bcrypt.compareSync(password, user.password);
        if (isPwdCorrect) {
            return res.status(200).send("Usuario Logueado Exitosamente!");
        } else {
            return res.status(200).send("Credenciales Incorrectas!");
        }
    }

};

module.exports = usersController;