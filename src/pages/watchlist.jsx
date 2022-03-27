import './watchlist.css';
import React, { useState, useEffect } from 'react'

import { auth, } from "../services/firebase"
import { useAuthState } from "react-firebase-hooks/auth"

import { genRecommends } from "../services/firebase"

function Card(props) {



  return (<div className="card">
    <h1>{props.title}</h1>
    <h2>{props.date}</h2>
  </div>)
}

function WatchlistPage() {
  const [user] = useAuthState(auth);

  const [rec, setRec] = useState([])

  useEffect(() => {

    async function fetchData() {
      //console.log(user)

      setRec((await genRecommends(user)).titles)
    }

    if(user)
    fetchData()

  }, [user])


  return (
    <div className="WatchlistPage">
      <div className="header">
        <a href='/watchlist'><i className="fa-solid fa-book"></i></a>
        <a href='/home'><h1>ShowFinder</h1></a>
        <a href='/settings'><i className="fa-solid fa-gear"></i></a>
      </div>
      <h2>Shows for you:</h2>


      {rec.map(val => <Card key={val.title} title={val.title} date={val.year}></Card>)}
    </div>
  );
}

export default WatchlistPage;
