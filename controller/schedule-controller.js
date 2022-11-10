import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyCJgF3YLTIT6XKBbdEmqmWLyyh1oSdV7vw",
    authDomain: "trastornos-alimenticios-lal.firebaseapp.com",
    projectId: "trastornos-alimenticios-lal",
    storageBucket: "trastornos-alimenticios-lal.appspot.com",
    messagingSenderId: "800988837364",
    appId: "1:800988837364:web:111e46ddc25b763235b5a1"
};
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const contactUsSubmit = document.getElementById("schedule-date-submit");
const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

document.getElementById("name").addEventListener("keyup", allow);
document.getElementById("email").addEventListener("keyup", allow);
document.getElementById("phone-number").addEventListener("keyup", allow);
document.getElementById("message").addEventListener("keyup", allow);
document.getElementById("date-appointment").addEventListener("input", allow);
document.getElementById("captcha").value;


contactUsSubmit.addEventListener("click", async e =>{
  e.preventDefault();
  addb();
});

function allow(){
  if(document.getElementById("name").value != "" &&
    document.getElementById("email").value != "" &&
    document.getElementById("phone-number").value != "" &&
    document.getElementById("message").value != "" &&
    document.getElementById("date-appointment").value != ""){
      contactUsSubmit.removeAttribute("disabled");
    }
}

async function addb(){
  try {
    var d = Date.parse(document.getElementById("date-appointment").value);

    const docRef = await addDoc(collection(db, "appointment"), {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phoneNumber: document.getElementById("phone-number").value,
      description : document.getElementById("message").value,
      date: new Date(d),
      color: "#" + genRanHex(6)
    });
    console.log("Document written with ID: ", docRef.id);
    window.location.href = "/view/index.html"
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}