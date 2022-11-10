import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyCJgF3YLTIT6XKBbdEmqmWLyyh1oSdV7vw",
    authDomain: "trastornos-alimenticios-lal.firebaseapp.com",
    projectId: "trastornos-alimenticios-lal",
    storageBucket: "trastornos-alimenticios-lal.appspot.com",
    messagingSenderId: "800988837364",
    appId: "1:800988837364:web:111e46ddc25b763235b5a1"
};
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location.href = "../view/user.html"
    })
    .catch((error) => {
      switch (error.code){
        case "auth/user-not-found":
          document.getElementById("login-email").style.borderWidth = "2px";
          document.getElementById("login-email").style.borderColor = "red";
          document.getElementById("login-alert").style.display = "";
          document.getElementById("login-alert").innerHTML = "Usuario no encontrado";
          break;

        case "auth/wrong-password":
          document.getElementById("login-password").style.borderWidth = "2px";
          document.getElementById("login-password").style.borderColor = "red";
          document.getElementById("login-alert").style.display = "";
          document.getElementById("login-alert").innerHTML = "Contraseña incorrecta";
          break;

        case "auth/too-many-requests":
          document.getElementById("login-password").style.borderWidth = "2px";
          document.getElementById("login-password").style.borderColor = "red";
          document.getElementById("login-email").style.borderWidth = "2px";
          document.getElementById("login-email").style.borderColor = "red";
          document.getElementById("login-alert").style.display = "";
          document.getElementById("login-alert").innerHTML = "Has hecho muchas peticiones a la base de datos, la página se refrescará automáticamente e intenta ingresar de nuevo";
          setTimeout(reload, 3500);
          break;  

        default:
          document.getElementById("login-alert").style.display = "";
          document.getElementById("login-alert").innerHTML = "Error desconocido, la página se refrescará automáticamente e intenta ingresar de nuevo";
          setTimeout(reload, 3500);
      }
    });
})

function reload(){
  location.reload();
}