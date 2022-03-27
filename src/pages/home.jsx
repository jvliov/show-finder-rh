// import React, { useStates, useEffect } from 'react'
import * as shows from '../services/show-api'
import './home.css'
import React, { useState, useEffect } from 'react'
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

//class HomePage extends React.Component {
function HomePage() {
  const [user, loading, error] = useAuthState(auth);
  const [show, setShow] = useState({})
  const [genres, setGenres] = useState([])
  const imgRef = React.createRef()
  const navigate = useNavigate();

  const fetchShow = async () => {
    setShow(await shows.getShow(447404))
  }

  const getGenres = async () => {
    let genres = []
    for (var i = 0; i < Object.keys(show.genre_ids).length; i++) {
      if (show.genre_ids[i] in genre_ids) {
        genres.push(genre_ids[show.genre_ids[i]])
      }
    }
    setGenres(genres)

  }



    useEffect(() => {
      if (loading) return;
      if (!user) return navigate("/");
      
    }, [user, loading]);

    useEffect(() => {
      fetchShow()
      getGenres()
      imgRef.current.src = `https://image.tmdb.org/t/p/w500${show.poster_path}`
      imgRef.current.alt = show.title

    }, [show])


  //       return (
  //     <main>
  //       <div className="header">
  //       <button className="dashboard_btn" onClick={logout}>Logout</button>
  //         <a href='/watchlist'><i className="fa-solid fa-book"></i></a>
  //         <h1>ShowFinder</h1>
  //         <a href='/settings'><i className="fa-solid fa-gear"></i></a>
  //       </div>

  // useEffect(() => {
  //   fetchShow()
  //   getGenres()

  //   imgRef.current.src = `https://image.tmdb.org/t/p/w500${show.poster_path}`
  //   imgRef.current.alt = show.title

  // }, [show])


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
          <h2>{show.title}</h2>
        </div>

      </div>

      <div className="buttonBox">
        <button><i className="fa-solid fa-x"></i></button>
        <button><i className="fa-solid fa-check"></i></button>
      </div>

      <div className='infoParent'>
      <div className='info'>

        <h2>Description</h2>
        <p>{show.overview}</p>

        <h2>Genres</h2>
        {genres.map(genre => <li key={genre}>{genre}</li>)}

        <h2>Where to Watch</h2>
        {genres.map(genre => <li key={genre}>{genre}</li>)}


      </div>
      </div>


    </main>)
}
//}

export default HomePage;

