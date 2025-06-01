import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDydDjeoVg70lO1xDjnyUlUrcjczt_X4mY",
  authDomain: "chatnest-6ea26.firebaseapp.com",
  projectId: "chatnest-6ea26",
  storageBucket: "chatnest-6ea26.appspot.com",
  messagingSenderId: "892974400381",
  appId: "1:892974400381:web:fdd2ebf60453b8393a4214",
  measurementId: "G-7RGH7WEDVF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);