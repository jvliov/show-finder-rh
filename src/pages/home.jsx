import React, { useStates, useEffect } from 'react'
import * as shows from '../services/show-api'
import './home.css'

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: shows.getShow(1000) };
  }



  render() {


    return (
      <main>
        <div className="header">
          <a href='/watchlist'><i className="fa-solid fa-book"></i></a>
          <h1>ShowFinder</h1>
          <a href='/settings'><i className="fa-solid fa-gear"></i></a>
        </div>

        <div className="imageBox">

          <img src={`https://image.tmdb.org/t/p/w500${this.state.show.poster_path}`} alt="Detective Pikachu"></img>
          <div className='names'>
            <h2>Name</h2>
            <h3>genre</h3>
          </div>

        </div>

        <div className="buttonBox">
          <button><i className="fa-solid fa-x"></i></button>
          <button><i className="fa-solid fa-check"></i></button>
        </div>
      </main>
    );
  }
}

export default HomePage;

