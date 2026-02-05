// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCrS81QKavlq0MLew2msaQ4PlpHbxHJyIg",
  authDomain: "my-saas-platform-b4329.firebaseapp.com",
  projectId: "my-saas-platform-b4329",
};

// Init Firebase (SAFE)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

/* ---------------- EMAIL LOGIN ---------------- */
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.replace("dashboard.html");
    })
    .catch(err => alert(err.message));
}

/* ---------------- SIGN UP ---------------- */
function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(res => {
      return db.collection("users").doc(res.user.uid).set({
        email: res.user.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    })
    .then(() => {
      window.location.replace("dashboard.html");
    })
    .catch(err => alert(err.message));
}

// ✅ GOOGLE LOGIN (MOBILE SAFE)
function googleLogin() {
  alert("Google login will be available soon 🚀");
}

// ✅ HANDLE REDIRECT RESULT
auth.getRedirectResult()
  .then((result) => {
    if (result.user) {
      const user = result.user;

      return db.collection("users").doc(user.uid).set({
        email: user.email,
        name: user.displayName,
        provider: "google",
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true }).then(() => {
        window.location.href = "/dashboard.html";
      });
    }
  })
  .catch((error) => {
    console.error(error);
    alert(error.message);
  });





/* =====================
   ✅ LOGOUT
===================== */
function logout() {
  auth.signOut().then(() => {
    window.location.replace("index.html");
  });
}
