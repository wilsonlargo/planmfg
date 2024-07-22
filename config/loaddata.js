//======================================================================================================
//Este módulo adminstra las acciones globales relacionadas con la base de datos, operaciones de
//crear, abrir, eliminar proyectos, así como permitir el ingreso a los datos

//Importa las instanacias de firebase y administración de base de datos
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";

import {
    getFirestore,
    collection,
    onSnapshot,
    doc,
    addDoc,
    setDoc,
    getDocs,
    getDoc,
    deleteDoc,
    updateDoc,
    deleteField,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

//Importa las instanacias de firebase para autenticación
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";



// Utiliza las claves y credenciales de mi base de datos de Tomakare
const firebaseConfig = {
    apiKey: "AIzaSyDmWH5Lh3TIo1h1poWfP4X4TtEJkTc_Af8",
    authDomain: "plancmfg.firebaseapp.com",
    projectId: "plancmfg",
    storageBucket: "plancmfg.appspot.com",
    messagingSenderId: "178411261161",
    appId: "1:178411261161:web:ca80ba863ded9697d1f478"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

// Referencia a las colecciones de proyectos y objetivos
const coleccionVigencias = collection(db, "vigencias");
// Referencia a las colecciones de usuarios
const coleccionUsuarios = collection(db, "usuarios");

const coleccionConfiguracion = collection(db, "configuracion");

//=============================================================
//Seccion para ingresar con usuario y contraseña
async function CredentialIn(email, password) {
    try {
        const crearcredencial = await signInWithEmailAndPassword(auth, email, password)
        
        mensajes("A ingresado exitosamente", "green")

        open_page()//está en archivo config.js
    } catch (error) {
        if (error.code === "auth/invalid-email") {
            mensajes("Correo inválido", "red")
        }
        else if (error.code === "auth/invalid-credential") {
            mensajes("Los datos proporcionados no son válidos", "red")
        }
    }

}
//función para cerrar la sesión de la aplicación
async function CredentialOut() {
    await signOut(auth)
    location.href = "../index-app.html"
}
//Función que escucha el cambio en inicio o cerrar sesión
onAuthStateChanged(auth, async (user) => {
    try {
        console.log(GLOBAL.firestore.getVigencias())
        mensajes("Usuario registrado: " + user.email, "orange") //Muestra que usuarios está conectado
        activeEmail=user.email;
    } catch (error) {
        mensajes("Fuera de conexión", "red")
        
    }

})
//=============================================================


//============================================================
//===============Acceso a las vigencias, agregar y borrar
async function getVigencias() {
    const data = [];
    const querySnapshot = await getDocs(coleccionVigencias)
    querySnapshot.forEach((doc) => {
        data.push({
            ...doc.data(),
            id: doc.id,
        });
    });
    GLOBAL.state.vigencias=data
}

async function getVigencia(id) {
    const docRef = doc(db, "vigencias", id);
    const docSnap = await getDoc(docRef);

    return docSnap.exists() ? ({
        ...docSnap.data(),
        id: docSnap.id,
    }) : null;
}
// Función para agregar un objeto de vigencia a la base de datos
async function addVigencia(objVigencia) {
    const docRef = await addDoc(coleccionVigencias, objVigencia);
    return docRef.id; 
}

async function updateVigencia(vigencia) {
    const docRef = doc(db, "vigencias", vigencia.id);
    await setDoc(docRef, vigencia);
}


// Funcion para eliminar un vigencia por id
async function borrarVigencia(id) {
    await deleteDoc(doc(db, "vigencias", id));
    mensajes("Se eliminó esta vigencia", "orange")
}
//============================================================

// Exponer las funciones globalmente
GLOBAL.firestore = {
    getVigencias, //Carga todos las vigencias
    getVigencia,
    addVigencia,
    borrarVigencia,
    updateVigencia,
    CredentialIn, //para iniciar la aplicación, evoca la función en este módulo (CredentialIn(email,pass))
    CredentialOut, //para cerrar la aplicación
    //getUsuarios, //función para verificar usuarios programadores

}