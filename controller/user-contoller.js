import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut   } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js';
import { getFirestore, collection, getDocs} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";

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
const db = getFirestore(app);
const logout = document.querySelector("#logout");
const logoutCollapse = document.querySelector("#logout-collapse");

onAuthStateChanged(auth, async (user) => {

  const querySnapshot = await getDocs(collection(db, "appointment"));
  var json = "[";

  querySnapshot.forEach((doc) => {

    var date = new Date();
    var dateStr;

    date.setTime(doc.data().date.seconds*1000);

    if(date.getDate() <= 9){
      dateStr = (date.getMonth() + 1 ).toString() + "-0" + date.getDate().toString() + "-" + date.getFullYear().toString();
    }else{
      dateStr = (date.getMonth() + 1 ).toString() + "-" + date.getDate().toString() + "-" + date.getFullYear().toString();
    }

    json = json + (JSON.stringify({
              id: doc.id,
              name: doc.data().name,
              date: dateStr,
              type: "event",
              description: '<p style="font-size: 1.2rem"><a href="mailto:' + doc.data().email + '"><b>' + doc.data().email + '</b></a></p><pstyle="font-size: 1.1rem"><a href="tel:+57' + doc.data().phoneNumber + '"><b>' + doc.data().phoneNumber + '</b></a></p><br>' + doc.data().description,
              color: doc.data().color
    }).toString()) + ",";

  });

  json = json.substring(0, json.length - 1);
  json = json + "]"

  if (user) {

    var dates = JSON.parse(json);

    $("#calendar").evoCalendar({
      'todayHighlight': true,
      'language': 'es',
      'firstDayOfWeek': 1,
      calendarEvents: dates
    });

  } else {
      console.log("matate");
      window.location.href = "view/error404.html"
  }
});


logout.addEventListener("click", e =>{
    e.preventDefault();
    signOut(auth).then(() => {
        window.location.href = "/view/index.html"
      }).catch(() => {
        console.log("An error happened.");
      });
});

logoutCollapse.addEventListener("click", e =>{
  e.preventDefault();
  signOut(auth).then(() => {
      window.location.href = "/view/index.html"
    }).catch(() => {
      console.log("An error happened.");
    });
});
