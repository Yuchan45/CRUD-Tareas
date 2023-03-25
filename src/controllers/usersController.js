

const usersController = {
    createUser: (req, res) => {
        let user = req.body;
        const { usuario, contraseña } = user;
        res.send(usuario + contraseña);
    },
    login: (req, res) =>  {
        res.send("Login POST");
    }

};

module.exports = usersController;