// 1. IMPORTACIONES
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    deleteDoc, 
    doc, 
    updateDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 2. CONFIGURACIÓN DE FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyDlOf15m4xaBOezK5ZaPMqf2-HwOlTLYmo",
    authDomain: "crud-firebase-app-42f08.firebaseapp.com",
    projectId: "crud-firebase-app-42f08",
    storageBucket: "crud-firebase-app-42f08.firebasestorage.app",
    messagingSenderId: "866484632896",
    appId: "1:866484632896:web:654c7fe2ba4cd3ebd48ea5"
};

// 3. INICIALIZAR FIREBASE
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 4. RESTO DEL CÓDIGO (CRUD)
let datos = [];

window.agregar = async function () {
    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;

    if (nombre === "" || precio === "") {
        alert("Completa todos los campos");
        return;
    }

    await addDoc(collection(db, "productos"), {
        nombre,
        precio
    });

    alert("Producto agregado");
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    
    leer();
};

async function leer() {
    datos = [];
    const querySnapshot = await getDocs(collection(db, "productos"));

    querySnapshot.forEach((docu) => {
        datos.push({
            id: docu.id,
            ...docu.data()
        });
    });

    mostrar(datos);
}

function mostrar(lista) {
    const tabla = document.getElementById("tabla");
    tabla.innerHTML = "";

    lista.forEach(d => {
        tabla.innerHTML += `
            <tr>
                <td>${d.nombre}</td>
                <td>${d.precio}</td>
                <td>
                    <button onclick="eliminar('${d.id}')">Eliminar</button>
                    <button onclick="editar('${d.id}')">Editar</button>
                </td>
            </tr>
        `;
    });
}

window.eliminar = async function (id) {
    await deleteDoc(doc(db, "productos", id));
    leer();
};

window.editar = async function (id) {
    const nuevoNombre = prompt("Nuevo nombre:");
    const nuevoPrecio = prompt("Nuevo precio:");

    if (!nuevoNombre || !nuevoPrecio) return;

    await updateDoc(doc(db, "productos", id), {
        nombre: nuevoNombre,
        precio: nuevoPrecio
    });

    leer();
};

window.filtrar = function () {
    const texto = document.getElementById("buscar").value.toLowerCase();

    const filtrados = datos.filter(d => 
        d.nombre.toLowerCase().includes(texto)
    );

    mostrar(filtrados);
};

// Ejecutar lectura inicial
leer();