import React, {useState, useEffect} from 'react'
import * as shows from '../services/show-api'
import * as styles from './home.module.css'
import { Link, useNavigate } from "react-router-dom"
import { auth, db, logout } from "../services/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { query, collection, getDocs, where } from "firebase/firestore";

//class HomePage extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {show: shows.getShow(1000)};
  // }
  //render() {
  function HomePage() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const fetchUserName = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
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

    //console.log("test",this.state.show)

    return (
      <main>
        <Link to="/login">Login</Link>
      {/* <img src={`https://image.tmdb.org/t/p/w500${this.state.show.poster_path}`} alt="Detective Pikachu"></img> */}
      <button className="dashboard_btn" onClick={logout}>Logout</button>
      <div>Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
      </div>
    </main>
    );
  }
//}

export default HomePage;

