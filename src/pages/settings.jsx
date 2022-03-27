import './settings.css';
import { auth, db, logout } from "../services/firebase"
import React, {useEffect, useState} from 'react';
import { useAuthState } from "react-firebase-hooks/auth"
import { Link, useNavigate } from "react-router-dom"
import { query, collection, getDocs, where } from "firebase/firestore";

function SettingsPage() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [names, setNames] = useState([]);
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
      setNames(data.name.split(" "))
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");   
    fetchUserName();
  }, [user, loading]);

  return (
    <div className="SettingsPage">
      <div className="header">
          <a href='/watchlist'><i className="fa-solid fa-book"></i></a>
          <h1>ShowFinder</h1>
          <a href='/settings'><i className="fa-solid fa-gear"></i></a>
      </div>
      <h2>Greetings, {names[0]}</h2>
      <h4>Account email: {user?.email}</h4>
      <div className="buttons">
          <button>Reset Account</button>
          <button onClick={logout}>Log Out</button>
        </div>
    </div>
  );
}

export default SettingsPage;
