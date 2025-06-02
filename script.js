import { auth, db } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  serverTimestamp,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

let currentUserEmail = "";
let selectedUserEmail = "";

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

onAuthStateChanged(auth, async user => {
  if (user) {
    currentUserEmail = user.email;
    document.getElementById("login").style.display = "none";
    document.getElementById("userList").style.display = "block";
    loadUsers();
  }
});

async function loadUsers() {
  const q = query(collection(db, "users"));
  const snapshot = await getDocs(q);
  const usersUl = document.getElementById("users");
  usersUl.innerHTML = "";
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    if (data.email !== currentUserEmail) {
      const li = document.createElement("li");
      li.textContent = data.email;
      li.onclick = () => selectUser(data.email);
      usersUl.appendChild(li);
    }
  });
}

async function selectUser(email) {
  selectedUserEmail = email;
  document.getElementById("userList").style.display = "none";
  document.getElementById("chat").style.display = "block";
  loadMessages();
}

function getChatId(email1, email2) {
  return [email1, email2].sort().join("_");
}

window.sendMessage = async function () {
  const message = document.getElementById("message").value;
  const chatId = getChatId(currentUserEmail, selectedUserEmail);
  await addDoc(collection(db, `chats/${chatId}/messages`), {
    text: message,
    sender: currentUserEmail,
    receiver: selectedUserEmail,
    time: serverTimestamp()
  });
  document.getElementById("message").value = "";
}

function loadMessages() {
  const chatId = getChatId(currentUserEmail, selectedUserEmail);
  const messagesRef = collection(db, `chats/${chatId}/messages`);
  onSnapshot(messagesRef, snapshot => {
    const messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      messagesDiv.innerHTML += `<p><b>${data.sender}</b>: ${data.text}</p>`;
    });
  });
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Register user in "users" collection
    await setDoc(doc(db, "users", user.uid), {
      email: user.email
    });
  }
});
