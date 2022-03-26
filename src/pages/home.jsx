<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
import '../App.css';

>>>>>>> Stashed changes
function Home() {



  return (
    <main>
      <img src={`https://image.tmdb.org/t/p/w500${getShow(1000).poster_path}`} alt="Detective Pikachu"></img>
    </main>
  );
=======
import React, {useStates, useEffect} from 'react'
import * as shows from '../services/show-api'
// import * as styles from './home.module.css'

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: shows.getShow(1000)};
  }

  
  

  render() {

    console.log("test",this.state.show)

    return (
      <main>
      <img src={`https://image.tmdb.org/t/p/w500${this.state.show.poster_path}`} alt="Detective Pikachu"></img>
    </main>
    );
  }
>>>>>>> Stashed changes
}

export default HomePage;

