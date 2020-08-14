const form = document.getElementById("form");
const login = document.getElementById("login");
const menu = document.getElementById("menu");
const msjError = document.getElementById("mensaje-error");
const inputs = document.querySelectorAll("input");
const cardsContainer = document.getElementById("container");
const title = document.getElementById("title");


const renderData = (data) => {


};
const removeClass = (registerform, ...elementos) => {
    registerform.classList.add("oculto");
    elementos.forEach(el => {
        el.classList.remove("oculto");
    })

}




const sendData = async (e) => {
    e.preventDefault();

    const nombre = e.target.nombre.value.trim();
    const apellidoP = e.target.apellidoP.value.trim();
    const apellidoM = e.target.apellidoM.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const passwordConfirm = e.target.passwordConfirm.value.trim();



    if (nombre === "" || apellidoP === "" || apellidoM === "" || email === "" || password === "" || passwordConfirm === "") {
        msjError.classList.remove("oculto");
        return;
    }
    const datos = {
        nombre,
        apellidoP,
        apellidoM,
        email,
        password,
        passwordConfirm
    }

    const res = await fetch("/blogs/register", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    });

    const data = await res.json();


    console.log(data);
    if (data.status === "error") {
        msjError.classList.remove("oculto");
        msjError.textContent = data.message;
    }
    if (data.status === "success") {
        title.textContent = "Login";
        removeClass(form, login);
    }

};

const send = async e => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (email === "" || password === "") {
        msjError.classList.remove("oculto");
        return;
    }
    const datos = {
        email,
        password
    }

    const res = await fetch("/blogs/login", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    });

    const data = await res.json();

    console.log(data)
    if (data.status === "error") {
        msjError.classList.remove("oculto");
        msjError.textContent = data.message;
    }

    if (data.status === "success") {
        title.textContent = `Bienvenido ${data.user.nombre} ${data.user.apellidoP} ${data.user.apellidoM}`;
        removeClass(login, menu, cardsContainer);
    }

}


form.addEventListener("submit", sendData);
login.addEventListener('submit', send);

inputs.forEach(input => {
    input.addEventListener("input", () => {
        if (!msjError.classList.contains("oculto")) {
            msjError.classList.add("oculto");
        }
    })
})