function Home() {



  return (
    <main>
      <img src={`https://image.tmdb.org/t/p/w500${getShow(1000).poster_path}`} alt="Detective Pikachu"></img>
    </main>
  );
}

export default Home;
