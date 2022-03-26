import axios from "axios"

let showList = undefined

let genre_ids = {
    28: "Action",
    10759: "Action & Adventure",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    36: "History",
    27: "Horror",
    10762: "Kids",
    10402: "Music",
    9648: "Mystery",
    10763: "News",
    10764: "Reality",
    10749: "Romance",
    10765: "Sci-Fi & Fantasy",
    878: "Science Fiction",
    10766: "Soap",
    10767: "Talk",
    53: "Thriller",
    10770: "TV Movie",
    10752: "War",
    10768: "War & Politics",
    37: "Western"
  }
  

export async function getList(updateList = false) {
    if(!showList || updateList) {
        //create with axios with actual pull data
        let resp = await axios.get()
        showList = []
    }
    return showList
}

export async function getShow(id) {
    //axios id
    let resp = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${showKeys.tmdb}`)

    //return resp.data
    return {"adult":false,"backdrop_path":"/nDP33LmQwNsnPv29GQazz59HjJI.jpg","genre_ids":[28,12,14],"id":447404,"original_language":"en","original_title":"Pokémon Detective Pikachu","overview":"In a world where people collect pocket-size monsters (Pokémon) to do battle, a boy comes across an intelligent monster who seeks to be a detective.","popularity":123.376,"poster_path":"/wgQ7APnFpf1TuviKHXeEe3KnsTV.jpg","release_date":"2019-05-03","title":"Pokémon Detective Pikachu","video":false,"vote_average":7,"vote_count":5505}  
}