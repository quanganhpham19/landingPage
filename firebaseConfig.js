
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCxvew_ZwTTN_5mUUin0V4boDc7crs9GYY",
  authDomain: "mansoury-web.firebaseapp.com",
  projectId: "mansoury-web",
  storageBucket: "mansoury-web.firebasestorage.app",
  messagingSenderId: "314960328283",
  appId: "1:314960328283:web:0e359c59b3accea475717e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);




