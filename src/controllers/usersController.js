const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const date = moment();

const { validationResult } = require('express-validator');
const usersOp = require('../modules/usersOp');

const usersController = {
    register: (req, res) => {
        res.status(200).render('./users/registerForm.ejs');
    },
    processRegister: (req, res) => {
        const { username, password } = req.body;

        const e = validationResult(req);
        if (!e.isEmpty()) {
            const errors = e.mapped();
            return res.status(400).json({message: "Error al crear usuario!", errors});
        }

        const userFound = usersOp.findUserByUsername(username);
        if (userFound) return res.status(500).json({message: "Username already taken."});

        const user = {
            id: uuidv4(),
            username,
            password: bcrypt.hashSync(password, 10),
            creationDate: date.format('MMMM Do YYYY, h:mm:ss a')
        }
        if (!usersOp.addUser(user)) return res.status(500).json({message: "Error al crear el usuario."});

        return res.status(201).json({message: "Usuario creado exitosamente!"});

    },
    login: (req, res) => {
        res.status(200).render('./users/loginForm.ejs');
    },
    processLogin: (req, res) =>  {
        const { username, password } = req.body;
        const user = usersOp.findUserByUsername(username);
        if (!user) return res.status(400).json({message: "Credenciales Incorrectas!"});

        const isPwdCorrect = bcrypt.compareSync(password, user.password);

        if (isPwdCorrect) {
            const userToLogin = user;
            delete userToLogin.password; // Borramos el atributo password por temas de seguridad.
            const accessToken = jwt.sign({userToLogin}, 'my_secret_key', {expiresIn: '5m'});

            return res.status(200).header('authorization', accessToken).json({
                message: 'Usuario autenticado!',
                token: accessToken
            });

        } else {
            return res.status(400).json({message: "Credenciales Incorrectas!"});
        }
    }

};

module.exports = usersController;