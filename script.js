import { auth, db, storage } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

window.signup = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  await createUserWithEmailAndPassword(auth, email, password);
}

window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  await signInWithEmailAndPassword(auth, email, password);
}

window.logout = async function () {
  await signOut(auth);
  location.reload();
}

onAuthStateChanged(auth, user => {
  if (user) {
    document.getElementById("login").style.display = "none";
    document.getElementById("chat").style.display = "block";
    loadMessages();
    setupProfileUpload();
  }
});

window.sendMessage = async function () {
  const message = document.getElementById("message").value;
  if (!message.trim()) return;
  await addDoc(collection(db, "messages"), {
    text: message,
    user: auth.currentUser.email,
    time: serverTimestamp()
  });
  document.getElementById("message").value = "";
}

function loadMessages() {
  const messagesRef = collection(db, "messages");
  onSnapshot(messagesRef, snapshot => {
    const messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      messagesDiv.innerHTML += `<p><b>${data.user}</b>: ${data.text}</p>`;
    });
  });
}

function setupProfileUpload() {
  const input = document.getElementById("upload-pic");
  const img = document.getElementById("profile-pic");

  input.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const storageRef = ref(storage, 'profiles/' + auth.currentUser.uid);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    img.src = url;
  });
}