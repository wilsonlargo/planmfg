const GLOBAL = {
    state: {
        vigencia: null,
        vigencias: [],
        usuario: null,
        usuarios: [],
    },
    firestore: {},
};
//Sección para ingresar con usuario a la aplicación
function IniCredential(){
    //Lee la información del formulario de ingreso en index.html
    const email = document.getElementById("inEmail").value
    const password = document.getElementById("inPass").value
    GLOBAL.firestore.CredentialIn(email,password)
}
function SignOut(){
    GLOBAL.firestore.CredentialOut()
}
function open_page(){
    location.href = "../app-plan/app-plan.html"
}

//Funcion para mostrar un mensaje
function mensajes(text, color) {
    Toastify({
        text: text,
        duration: 3000,
        className: "border border-1 rounded text-white",
        destination: "",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: color,
            color: "white",
        },
        onClick: function () { } // Callback after click
    }).showToast();

}