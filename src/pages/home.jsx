// import React, { useStates, useEffect } from 'react'
import * as shows from '../services/show-api'
import './home.css'
import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom"
import { auth, db, logout } from "../services/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { query, collection, getDocs, where } from "firebase/firestore";
import { showKeys } from '../services/config'
import { genre_ids } from '../services/show-api'

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
<<<<<<< HEAD
=======
import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom"
import { auth, getGenreMap, updateGenreMap, logout} from "../services/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { query, collection, getDocs, where } from "firebase/firestore";
>>>>>>> 6dee2169347acf64c0ac10270d5b9b93712d9d2a

//class HomePage extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {show: shows.getShow(1000)};
  // }
  //render() {
  function HomePage() {
    const [user, loading, error] = useAuthState(auth);
    const [show, setShow] = useState({})
    const [genres, setGenres] = useState([])
    const imgRef = React.createRef()
    const navigate = useNavigate();

    const fetchShow = async () => {
      setShow(await shows.getShow(447404))

    }

<<<<<<< HEAD
    const getGenres = async () => {
      setGenres(["Action", "Adventure"])
      // for(var i = 0; i < show.genre_ids.length; i++){
      //   if(show.genre_ids[i] in genre_ids){
      //     genres.push(genre_ids[show.genre_ids[i]])
      //   }
      // }
    }

    useEffect(() => {
=======
    useEffect(async () => {
>>>>>>> 6dee2169347acf64c0ac10270d5b9b93712d9d2a
      if (loading) return;
      if (!user) return navigate("/");

      // console.log("Loaded")
      // let resp = await getGenreMap(user)
      // resp["10"] = 1;
      // console.log(resp)
      // await updateGenreMap(user, {"10": 1})
      
    }, [user, loading]);

    useEffect(() => {
      fetchShow()
      getGenres()
      imgRef.current.src = `https://image.tmdb.org/t/p/w500${show.poster_path}`
      imgRef.current.alt = show.title

    }, [show])


        return (
      <main>
        <div className="header">
        <button className="dashboard_btn" onClick={logout}>Logout</button>
          <a href='/watchlist'><i className="fa-solid fa-book"></i></a>
          <h1>ShowFinder</h1>
          <a href='/settings'><i className="fa-solid fa-gear"></i></a>
        </div>

        <div className="imageBox">

          <img ref={imgRef}></img>
          
            {/* {show.map((val)=> {
              return (
                <div className='names'>
                  <h2>{val.original_title}</h2>
                  <h3>genre</h3>
                </div>
              )
            })
            } */}
          <div className='names'>
            <h2>{show.original_title}</h2>
            {genres.map(genre => <li>{genre}</li>)}
            {/* <h3>{genre_ids[28]}</h3> */}
          </div>

        </div>

        <div className="buttonBox">
          <button><i className="fa-solid fa-x"></i></button>
          <button><i className="fa-solid fa-check"></i></button>
        </div>

        <div className='desc'>
          <p>Description: {show.overview}</p>
        </div>

        
      </main> )
  }
//}

export default HomePage;

