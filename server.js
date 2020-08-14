const dotenv = require("dotenv");

const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const app = require("./app");

dotenv.config({
    path: "./config.env"
});
app.listen(port, () => {
    console.log(`escuchando peticiones por el puerto: ${port}`);
});
if (process.env.NODE_ENV == "production") {

}

mongoose.connect(process.env.CLOUD_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => {
    console.log("conexion a base de datos en la nube exitosa");
}).catch(err => console.log(err));