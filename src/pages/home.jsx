import * as shows from '../services/show-api'
import './home.css'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { auth, } from "../services/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { genre_ids } from '../services/show-api'

function HomePage() {
  const [user, loading, error] = useAuthState(auth);
  const [showList, setShowList] = useState([])
  const [show, setShow] = useState({})
  const [genres, setGenres] = useState([])
  const [movieIndex, setMovieIndex] = useState(0)

  const imgRef = React.createRef()
  const navigate = useNavigate();

  const fetchShowList = async () => {
    let list = await shows.getList(true)
    console.log("List", list)
    await setShowList(list)
  }

  const getGenres = async () => {
    let genre_list = []

    console.log(show)

    for (var i = 0; i < Object.keys(show.genres).length; i++) {
      if (show.genres[i].id in genre_ids) {
        genre_list.push(show.genres[i].name)
      }
    }

    setGenres(genre_list)

  }



  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

  }, [user, loading]);

  useEffect(async () => {
    console.log("Test 1")

    await fetchShowList()
    if(!("tmdb_id" in showList.titles[movieIndex])) {
      setMovieIndex(movieIndex+1)
      return
    }
    await setShow(await shows.getShow(showList.titles[movieIndex].tmdb_id, showList.titles[movieIndex].tmdb_type))
    await getGenres()


    console.log("Test")
  }, [movieIndex])


  useEffect(async () => {
    imgRef.current.src = `https://image.tmdb.org/t/p/w500${show.poster_path}`
    imgRef.current.alt = show.title
  })

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
        <button onClick={() => { 
          setMovieIndex(movieIndex + 1)
          for(let id in genre_ids) {
            shows.decGenre(user, id)
          }
         }}><i className="fa-solid fa-x"></i></button>
        <button onClick={() => { 
          setMovieIndex(movieIndex + 1)
          for(let id in genre_ids) {
            shows.incGenre(user, id)
          }
          }}><i className="fa-solid fa-check"></i></button>
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
      </div>Î


    </main>)
}

export default HomePage;

