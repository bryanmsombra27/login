const express = require('express');
const router = express.Router();
const Usuario = require('../controller/userController');
const UsuarioMiddleware = require('../middlewares/user');

const user = new Usuario();
const userMiddleware = new UsuarioMiddleware();


router.post('/register', userMiddleware.validarCampos, user.newUser);
router.post("/login", userMiddleware.login, user.login);

module.exports = router;