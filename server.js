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

mongoose.connect(process.env.LOCAL_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => {
    console.log("conexion a base de datos local exitosa");
}).catch(err => console.log(err));