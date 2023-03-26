
function ensureToken(req, res, next) {
    // Middleware que se encarga de verificar si el Token generado es correcto.
    const bearerHeader = req.headers['authorization'];
    
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403); // Forbidden.
    }
}

module.exports = ensureToken;