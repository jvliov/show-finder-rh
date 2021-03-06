import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./login.css"

function LoginPage() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/home");
  }, [user, loading]);
  return (
    <div className="login">
      <div className="loginHeader">
        <h1>Welcome to ShowFinder</h1>
        <p>The place where you swipe to find new favorite shows.</p>
      </div>
      <div className="login__container">
        <p>Sign In:</p>
        <button className="login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
