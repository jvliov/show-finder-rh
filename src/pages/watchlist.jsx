import './watchlist.css';

function WatchlistPage() {
  const showOne = { "adult": false, "backdrop_path": "/nDP33LmQwNsnPv29GQazz59HjJI.jpg", "genre_ids": [28, 12, 14], "id": 447404, "original_language": "en", "original_title": "Pokémon Detective Pikachu", "overview": "In a world where people collect pocket-size monsters (Pokémon) to do battle, a boy comes across an intelligent monster who seeks to be a detective.", "popularity": 123.376, "poster_path": "/wgQ7APnFpf1TuviKHXeEe3KnsTV.jpg", "release_date": "2019-05-03", "title": "Pokémon Detective Pikachu", "video": false, "vote_average": 7, "vote_count": 5505 }
  const showTwo = { "original_title": "Better Call Saul", "release_date": "2015-05-04"}


  return (
    <div className="WatchlistPage">
      <div className="header">
          <a href='/watchlist'><i className="fa-solid fa-book"></i></a>
          <h1>ShowFinder</h1>
          <a href='/settings'><i className="fa-solid fa-gear"></i></a>
      </div>
      <h2>Shows for you:</h2>
      <div className="card">
        <h1>{showOne.original_title}</h1>
        <h2>{showOne.release_date.slice(0,4)}</h2>
      </div>
      <div className="card">
        <h1>{showTwo.original_title}</h1>
        <h2>{showTwo.release_date.slice(0,4)}</h2>
      </div>
      {/* {showOne.map((val) => {
        return(
          <div className="card">
            <h1>{showOne.original_title}</h1>
          </div>
        )
      })} */}
    </div>
  );
}

export default WatchlistPage;
