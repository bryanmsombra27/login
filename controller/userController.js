const Usuario = require("../models/usuario");

class User {
  async newUser(req, res) {
    try {
      const newUser = await Usuario.create(req.datos);

      return res.status(200).send({
        status: "success",
        // usuario: newUser,
        message: "Usuario creado con exito"
      });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).send({
          status: "error",
          message: "El correo ya ha sido registrado por favor intente con otro",
        });
      }
      if (err.errors.password) {
        return res.status(400).send({
          status: "error",
          message: "La contraseña debe de tener minimo 6 caracteres",
        });
      }
      console.log(err);
    }
  }

  async login(req, res) {
    try {
      const {
        email,
        password
      } = req.datos;

      //indicamos que tambien requerimos del campo de contraseña que ocultamos en el modelo al momento de seleccionar informacion hacia el usuario
      const user = await Usuario.findOne({
        email
      }).select("+password");

      if (!user) {
        return res.status(404).send({
          status: "error",
          message: "el correo no existe"
        });
      }

      //es un metodo de instancia la funcion proviene del modelo
      if (!await user.correctPassword(password, user.password)) {
        return res.status(401).send({
          status: "error",
          message: "La contraseña es incorrecta"
        });
      }
      //evitamos que se le retorne la contraseña al usuario
      user.password = undefined;

      res.status(200).send({
        status: "success",
        message: "logueado con exito",
        user
      });


    } catch (error) {
      console.log(error)
    }
  }


}

module.exports = User;