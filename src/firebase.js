import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
var firebaseui = require("firebaseui");

var firebaseConfig = {
  apiKey: "AIzaSyCyvYrWvQwATAlV9jaSFqEteMhPIPujKWc",
  authDomain: "amaan-mohib.firebaseapp.com",
  databaseURL: "https://amaan-mohib.firebaseio.com",
  projectId: "amaan-mohib",
  storageBucket: "amaan-mohib.appspot.com",
  messagingSenderId: "743544184921",
  appId: "1:743544184921:web:3e18eb8ff052caa3061148",
  measurementId: "G-2XZJC3NV4G",
};

// Initialize Firebase
export default function firebaseInit() {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  //offline
  firebase
    .firestore()
    .enablePersistence()
    .then(() => console.log("persistence enabled"))
    .catch((err) => console.error(err));
  console.log(firebase);
}

export function firebaseUI() {
  let uiConfig = {
    callbacks: {
      // signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      //   // User successfully signed in.
      //   // Return type determines whether we continue the redirect automatically
      //   // or whether we leave that to developer to handle.
      //   return true;
      // },
      uiShown: function () {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById("loader").style.display = "none";
      },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: "popup",
    signInSuccessUrl: "/projects",
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: "<your-tos-url>",
    // Privacy policy url.
    privacyPolicyUrl: "<your-privacy-policy-url>",
  };

  let ui =
    firebaseui.auth.AuthUI.getInstance() ||
    new firebaseui.auth.AuthUI(firebase.auth());
  ui.start("#firebaseui-auth-container", uiConfig);
}

export function userSignedIn() {
  const auth = firebase.auth();
  const whenSignedIn = document.getElementById("signed-in");
  const whenSignedOut = document.getElementById("signed-out");
  auth.onAuthStateChanged((user) => {
    if (user && user.uid !== "o8QjLkHfRpThLB3uqXa6drSW7MA2") {
      let p = document.createElement("p");
      p.innerHTML = "Access denied  (Logging out in 3 seconds)";
      whenSignedOut.appendChild(p);
      setTimeout(() => {
        whenSignedOut.removeChild(p);
        signOut();
      }, 3000);
    }
    if (user && user.uid === "o8QjLkHfRpThLB3uqXa6drSW7MA2") {
      whenSignedIn.style.display = "flex";
      whenSignedOut.style.display = "none";
    }
  });
}

export function signOut(links) {
  firebase
    .auth()
    .signOut()
    .then(function () {
      window.location = links ? "/links" : "/projects";
    })
    .catch(function (error) {
      console.log(error);
    });
}
