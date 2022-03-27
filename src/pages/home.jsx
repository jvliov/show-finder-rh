// import React, { useStates, useEffect } from 'react'
import * as shows from '../services/show-api'
import './home.css'

// class HomePage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { show: shows.getShow(1000) };
//   }



//   render() {


//     return (
//       <main>
//         <div className="header">
//           <a href='/watchlist'><i className="fa-solid fa-book"></i></a>
//           <h1>ShowFinder</h1>
//           <a href='/settings'><i className="fa-solid fa-gear"></i></a>
//         </div>

//         <div className="imageBox">

//           <img src={`https://image.tmdb.org/t/p/w500${this.state.show.poster_path}`} alt="Detective Pikachu"></img>
//           <div className='names'>
//             <h2>Name</h2>
//             <h3>genre</h3>
//           </div>

//         </div>

//         <div className="buttonBox">
//           <button><i className="fa-solid fa-x"></i></button>
//           <button><i className="fa-solid fa-check"></i></button>
//         </div>
//       </main>
import React, {useState, useEffect} from 'react'
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
    const [show, setShow] = useState({})
    const imgRef = React.createRef()
    const navigate = useNavigate();

    const fetchShow = async () => {
      setShow(await shows.getShow(447404))

    }

    useEffect(() => {
      if (loading) return;
      if (!user) return navigate("/");
      
    }, [user, loading]);

    useEffect(() => {
      fetchShow()
      imgRef.current.src = `https://image.tmdb.org/t/p/w500${show.poster_path}`
      imgRef.current.alt = show.title
    }, [show])


        return (
      <main>
        <div className="header">
          <a href='/watchlist'><i className="fa-solid fa-book"></i></a>
          <h1>ShowFinder</h1>
          <a href='/settings'><i className="fa-solid fa-gear"></i></a>
        </div>

        <div className="imageBox">

          <img ref={imgRef}></img>
          <div className='names'>
            <h2>Name</h2>
            <h3>genre</h3>
          </div>

        </div>

        <div className="buttonBox">
          <button><i className="fa-solid fa-x"></i></button>
          <button><i className="fa-solid fa-check"></i></button>
        </div>

        
      </main> )
  }
//}

export default HomePage;

