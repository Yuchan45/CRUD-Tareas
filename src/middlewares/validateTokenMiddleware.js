const jwt = require('jsonwebtoken');

function validateToken(req, res, next) {
    // Middleware que se encarga de verificar si el Token generado es correcto.
    const accessToken = req.headers['authorization'];
    if (!accessToken) return res.status(403).send('Access Denied');

    jwt.verify(accessToken, 'my_secret_key', (err) => {
        if (err) {
            return res.status(403).send('Acceso denegado, token expiró o es incorrecto');
        } else {
            next();
        }
    });
}

module.exports = validateToken;