import React, { useEffect } from "react";
import { firebaseUI } from "./firebase";

export default function Login() {
  useEffect(() => {
    firebaseUI();
  }, []);
  return (
    <div className="login">
      <h1>Login</h1>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
    </div>
  );
}
