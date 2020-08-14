class UserMiddleware {
    validarCampos(req, res, next) {
        const {
            nombre,
            apellidoM,
            apellidoP,
            email,
            password,
            passwordConfirm
        } = req.body;


        if (!nombre || !password || !email || !apellidoM || !apellidoP || !passwordConfirm) {
            return res.status(401).send({
                status: "error",
                message: "uno o varios campos estan vacios"
            });
        }
        if (password !== passwordConfirm) {
            return res.status(401).send({
                status: "error",
                message: "Las contraseñas no coinciden"
            })
        }
        const datos = {
            nombre,
            apellidoM,
            apellidoP,
            email,
            password,
        }
        req.datos = datos;
        next();
    }
    login(req, res, next) {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(401).send({
                status: "error",
                message: "no puede haber campos vacios"
            });
        }
        const datos = {
            email,
            password
        }

        req.datos = datos;
        next();

    }
}

module.exports = UserMiddleware;