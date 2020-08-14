const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    lowercase: true,
    trim: true,
  },
  apellidoM: {
    type: String,
    lowercase: true,
    trim: true,
  },
  apellidoP: {
    type: String,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "el correo  es requerido"],
  },
  password: {
    type: String,
    required: [true, "la contraseña es requerida"],
    minlength: [6, "la contraseña debe tener minimo 6 caracteress"],
    select: false
  },
  role: {
    type: String,
    default: "user",
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
});
//hasear la contraseña antes de guardar la en la BD (solo funciona con los metodos save o create para update ya  no haseara la contraseña pero puede usarse save o create para actualizar un usuario)
usuarioSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

//METODOS DE INSTANCIA
//un metodo que estara disponible en todos los documentos  de una definida collecion  con ste metodo podemos verificar la contraseña que viene de afuera con la que tenemos registrada en la bd
usuarioSchema.methods.correctPassword = async function (outsidePassword, userPassword) {
  return await bcrypt.compare(outsidePassword, userPassword);
}


const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;